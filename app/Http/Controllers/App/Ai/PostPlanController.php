<?php

declare(strict_types=1);

namespace App\Http\Controllers\App\Ai;

use App\Ai\Agents\PostPlanGenerator;
use App\Http\Controllers\App\Controller;
use App\Http\Requests\App\Ai\ExecutePostPlanRequest;
use App\Http\Requests\App\Ai\GeneratePostPlanRequest;
use App\Jobs\Ai\GeneratePosterBatchItem;
use App\Models\Post;
use App\Models\PosterBatch;
use App\Models\PosterBatchItem;
use App\Models\SocialAccount;
use App\Services\Ai\UserAiCreditService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class PostPlanController extends Controller
{
    public function generate(GeneratePostPlanRequest $request): JsonResponse
    {
        $workspace = $request->user()->currentWorkspace;

        $this->authorize('createPost', $workspace);

        $gate = Gate::inspect('useAi', $workspace->account);
        if ($gate->denied()) {
            return response()->json(['message' => $gate->message()], Response::HTTP_PAYMENT_REQUIRED);
        }

        $user = $request->user();
        $remaining = UserAiCreditService::remainingUse($user);
        if ($remaining < 1) {
            return response()->json([
                'message' => 'No AI use credits remaining.',
                'remaining' => 0,
            ], Response::HTTP_PAYMENT_REQUIRED);
        }

        $totalPosts = (int) $request->input('total_posts', 7);
        $startDate = (string) $request->input('start_date', now()->format('Y-m-d'));
        $socialAccountId = $request->input('social_account_id');
        $instruction = (string) $request->input('instruction', '');

        $channelPlatform = null;
        if ($socialAccountId) {
            $account = SocialAccount::query()->find($socialAccountId);
            $channelPlatform = $account?->platform?->value ?? $account?->platform;
        }

        $endDate = Carbon::parse($startDate)->addDays($totalPosts - 1)->endOfDay();

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

        $agent = new PostPlanGenerator(
            workspace: $workspace,
            totalPosts: $totalPosts,
            startDate: $startDate,
            channelPlatform: is_string($channelPlatform) ? $channelPlatform : null,
            instruction: $instruction,
            existingScheduledPosts: $existingScheduledPosts,
            provider: $request->input('provider'),
        );

        $response = $agent->prompt("Generate a {$totalPosts}-day post and poster plan.");

        UserAiCreditService::consumeUse($user);

        $plan = data_get($response, 'posts', []);

        if (! is_array($plan)) {
            $plan = [];
        }

        return response()->json([
            'posts' => $plan,
        ], Response::HTTP_OK);
    }

    public function execute(ExecutePostPlanRequest $request): JsonResponse
    {
        $workspace = $request->user()->currentWorkspace;

        $this->authorize('createPost', $workspace);

        $gate = Gate::inspect('useAi', $workspace->account);
        if ($gate->denied()) {
            return response()->json(['message' => $gate->message()], Response::HTTP_PAYMENT_REQUIRED);
        }

        $plan = (array) $request->input('plan', []);
        $socialAccountId = $request->input('social_account_id');
        $referenceImages = $request->input('reference_images', []);

        $batch = PosterBatch::query()->create([
            'workspace_id' => $workspace->id,
            'user_id' => $request->user()->id,
            'social_account_id' => $socialAccountId,
            'plan' => $plan,
            'reference_images' => $referenceImages,
            'status' => 'generating',
            'total_items' => count($plan),
            'completed_items' => 0,
            'failed_items' => 0,
        ]);

        $items = [];
        foreach ($plan as $planData) {
            $item = PosterBatchItem::query()->create([
                'poster_batch_id' => $batch->id,
                'plan_data' => $planData,
                'status' => 'pending',
            ]);

            $items[] = $item;

            GeneratePosterBatchItem::dispatch($item->id);
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
                    'image_url' => null,
                ]),
            ],
        ], Response::HTTP_CREATED);
    }

    public function show(Request $request, PosterBatch $posterBatch): JsonResponse
    {
        $workspace = $request->user()->currentWorkspace;

        if ($posterBatch->workspace_id !== $workspace->id) {
            abort(403);
        }

        $posterBatch->load('items');

        return response()->json([
            'batch' => [
                'id' => $posterBatch->id,
                'status' => $posterBatch->status,
                'total_items' => $posterBatch->total_items,
                'completed_items' => $posterBatch->completed_items,
                'failed_items' => $posterBatch->failed_items,
                'items' => $posterBatch->items->map(fn (PosterBatchItem $item) => [
                    'id' => $item->id,
                    'status' => $item->status,
                    'post_id' => $item->post_id,
                    'image_url' => $item->image_path ? Storage::disk('public')->url($item->image_path) : null,
                    'error' => $item->error,
                    'plan_data' => $item->plan_data,
                ]),
            ],
        ], Response::HTTP_OK);
    }

    public function retryItem(Request $request, PosterBatchItem $posterBatchItem): JsonResponse
    {
        $workspace = $request->user()->currentWorkspace;

        $batch = $posterBatchItem->batch;
        if (! $batch || $batch->workspace_id !== $workspace->id) {
            abort(403);
        }

        $posterBatchItem->update([
            'status' => 'pending',
            'error' => null,
        ]);

        if ($batch->failed_items > 0) {
            $batch->decrement('failed_items');
        }
        $batch->update(['status' => 'generating']);

        GeneratePosterBatchItem::dispatch($posterBatchItem->id);

        return response()->json(['message' => 'Retry queued successfully.'], Response::HTTP_OK);
    }
}
