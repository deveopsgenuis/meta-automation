<?php

declare(strict_types=1);

namespace App\Http\Controllers\App\Ai;

use App\Ai\Agents\ShortVideoPlanGenerator;
use App\Http\Controllers\App\Controller;
use App\Http\Requests\App\Ai\ExecuteShortVideoPlanRequest;
use App\Http\Requests\App\Ai\GenerateShortVideoPlanRequest;
use App\Jobs\Ai\GenerateShortVideoBatchItem;
use App\Models\Post;
use App\Models\SocialAccount;
use App\Models\VideoBatch;
use App\Models\VideoBatchItem;
use App\Services\Ai\UserAiCreditService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class ShortVideoPlanController extends Controller
{
    public function generate(GenerateShortVideoPlanRequest $request): JsonResponse
    {
        $workspace = $request->user()->currentWorkspace;

        $this->authorize('createPost', $workspace);

        $gate = Gate::inspect('useAi', $workspace->account);
        if ($gate->denied()) {
            return response()->json(['message' => $gate->message()], Response::HTTP_PAYMENT_REQUIRED);
        }

        $totalVideos = (int) $request->input('total_videos', 3);
        $startDate = (string) $request->input('start_date', now()->format('Y-m-d'));
        $socialAccountId = $request->input('social_account_id');
        $instruction = (string) $request->input('instruction', '');
        $size = (string) $request->input('size', '9:16');
        $quality = (string) $request->input('quality', '720p');

        $channelPlatform = null;
        if ($socialAccountId) {
            $account = SocialAccount::query()->find($socialAccountId);
            $channelPlatform = $account?->platform?->value ?? $account?->platform;
        }

        $endDate = Carbon::parse($startDate)->addDays($totalVideos - 1)->endOfDay();

        $existingScheduledPosts = Post::query()
            ->where('workspace_id', $workspace->id)
            ->where('status', 'scheduled')
            ->whereNotNull('scheduled_at')
            ->whereBetween('scheduled_at', [$startDate, $endDate])
            ->orderBy('scheduled_at')
            ->get()
            ->map(fn (Post $post) => [
                'date' => $post->scheduled_at->format('Y-m-d'),
                'time' => $post->scheduled_at->format('H:i'),
                'content' => Str::limit(strip_tags($post->content), 80),
            ])
            ->values()
            ->all();

        $agent = new ShortVideoPlanGenerator(
            workspace: $workspace,
            totalVideos: $totalVideos,
            startDate: $startDate,
            channelPlatform: is_string($channelPlatform) ? $channelPlatform : null,
            instruction: $instruction,
            size: $size,
            quality: $quality,
            existingScheduledPosts: $existingScheduledPosts,
            provider: $request->input('provider'),
        );

        $response = $agent->prompt("Generate a {$totalVideos}-day short video plan.");

        $plan = data_get($response, 'videos', []);

        if (! is_array($plan)) {
            $plan = [];
        }

        return response()->json([
            'videos' => $plan,
        ], Response::HTTP_OK);
    }

    public function execute(ExecuteShortVideoPlanRequest $request): JsonResponse
    {
        $workspace = $request->user()->currentWorkspace;

        $this->authorize('createPost', $workspace);

        $gate = Gate::inspect('useAi', $workspace->account);
        if ($gate->denied()) {
            return response()->json(['message' => $gate->message()], Response::HTTP_PAYMENT_REQUIRED);
        }

        $plan = (array) $request->input('plan', []);
        $socialAccountId = $request->input('social_account_id');
        $size = (string) $request->input('size', '9:16');
        $quality = (string) $request->input('quality', '720p');

        $user = $request->user();
        $requiredCredits = count($plan);
        $remaining = UserAiCreditService::remainingVideo($user);

        if ($remaining < $requiredCredits) {
            return response()->json([
                'message' => "Not enough video credits. Required: {$requiredCredits}, remaining: {$remaining}.",
                'remaining' => $remaining,
            ], Response::HTTP_PAYMENT_REQUIRED);
        }

        $batch = VideoBatch::query()->create([
            'workspace_id' => $workspace->id,
            'user_id' => $request->user()->id,
            'social_account_id' => $socialAccountId,
            'plan' => $plan,
            'status' => 'generating',
            'size' => $size,
            'quality' => $quality,
            'total_items' => count($plan),
            'completed_items' => 0,
            'failed_items' => 0,
        ]);

        $items = [];
        foreach ($plan as $planData) {
            $item = VideoBatchItem::query()->create([
                'video_batch_id' => $batch->id,
                'plan_data' => $planData,
                'status' => 'pending',
            ]);

            $items[] = $item;

            UserAiCreditService::consumeVideo($user);
            GenerateShortVideoBatchItem::dispatch($item->id);
        }

        return response()->json([
            'batch' => [
                'id' => $batch->id,
                'status' => $batch->status,
                'total_items' => $batch->total_items,
                'completed_items' => $batch->completed_items,
                'failed_items' => $batch->failed_items,
                'items' => collect($items)->map(fn ($i) => [
                    'id' => $i->id,
                    'status' => $i->status,
                    'plan_data' => $i->plan_data,
                    'video_url' => null,
                ]),
            ],
        ], Response::HTTP_CREATED);
    }

    public function show(Request $request, VideoBatch $videoBatch): JsonResponse
    {
        $workspace = $request->user()->currentWorkspace;

        if ($videoBatch->workspace_id !== $workspace->id) {
            abort(403);
        }

        $videoBatch->load('items');

        return response()->json([
            'batch' => [
                'id' => $videoBatch->id,
                'status' => $videoBatch->status,
                'total_items' => $videoBatch->total_items,
                'completed_items' => $videoBatch->completed_items,
                'failed_items' => $videoBatch->failed_items,
                'items' => $videoBatch->items->map(fn (VideoBatchItem $item) => [
                    'id' => $item->id,
                    'status' => $item->status,
                    'post_id' => $item->post_id,
                    'video_url' => $item->video_path ? Storage::disk('public')->url($item->video_path) : null,
                    'error' => $item->error,
                    'plan_data' => $item->plan_data,
                ]),
            ],
        ], Response::HTTP_OK);
    }

    public function retryItem(Request $request, VideoBatchItem $videoBatchItem): JsonResponse
    {
        $workspace = $request->user()->currentWorkspace;

        $batch = $videoBatchItem->batch;
        if (! $batch || $batch->workspace_id !== $workspace->id) {
            abort(403);
        }

        $videoBatchItem->update([
            'status' => 'pending',
            'error' => null,
        ]);

        if ($batch->failed_items > 0) {
            $batch->decrement('failed_items');
        }
        $batch->update(['status' => 'generating']);

        GenerateShortVideoBatchItem::dispatch($videoBatchItem->id);

        return response()->json(['message' => 'Retry queued successfully.'], Response::HTTP_OK);
    }
}
