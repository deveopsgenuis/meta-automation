<?php

declare(strict_types=1);

namespace App\Http\Controllers\App\Ai;

use App\Ai\Agents\PostPlanGenerator;
use App\Http\Controllers\App\Controller;
use App\Http\Requests\App\Ai\ExecutePostPlanRequest;
use App\Http\Requests\App\Ai\GeneratePostPlanRequest;
use App\Jobs\Ai\GeneratePosterBatchItem;
use App\Models\Media;
use App\Models\Post;
use App\Models\PosterBatch;
use App\Models\PosterBatchItem;
use App\Models\SocialAccount;
use App\Services\Ai\UserAiCreditService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravel\Ai\Files\Base64Image;
use Laravel\Ai\Files\Image as AiImage;
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
        $referenceImages = $request->input('reference_images', []);

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

        $attachments = $this->parseReferenceImages($referenceImages);

        Log::info('PostPlanController: generating plan', [
            'workspace_id' => $workspace->id,
            'total_posts' => $totalPosts,
            'reference_images_count' => count($referenceImages),
            'attachments_count' => count($attachments),
            'reference_images_raw' => array_map(fn ($img) => is_string($img) ? substr($img, 0, 80) : $img, $referenceImages),
        ]);

        $agent = new PostPlanGenerator(
            workspace: $workspace,
            totalPosts: $totalPosts,
            startDate: $startDate,
            channelPlatform: is_string($channelPlatform) ? $channelPlatform : null,
            instruction: $instruction,
            existingScheduledPosts: $existingScheduledPosts,
            provider: $request->input('provider'),
            referenceImages: $referenceImages,
        );

        $response = $agent->prompt(
            "Generate a {$totalPosts}-day post and poster plan.",
            $attachments,
        );

        UserAiCreditService::consumeUse($user);

        $plan = data_get($response, 'posts', []);

        if (! is_array($plan)) {
            $plan = [];
        }

        Log::info('PostPlanController: plan generated', [
            'posts_count' => count($plan),
            'has_reference_images' => count($referenceImages) > 0,
            'sample_visual_prompt' => count($plan) > 0 ? substr((string) data_get($plan[0], 'post_visual_prompt', ''), 0, 200) : null,
        ]);

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

    /**
     * Parse an array of reference image strings into Base64Image attachments for the AI agent.
     *
     * @param  array<int, string>  $referenceImages
     * @return array<int, Base64Image>
     */
    private function parseReferenceImages(array $referenceImages): array
    {
        $attachments = [];

        foreach ($referenceImages as $input) {
            if (! is_string($input) || trim($input) === '') {
                continue;
            }

            $input = trim($input);

            // 1. Check if $input is a stored file path (e.g. "medias/xxxx.jpg")
            if (Storage::exists($input) || Storage::disk('public')->exists($input)) {
                $disk = Storage::exists($input) ? Storage::disk() : Storage::disk('public');
                $bytes = $disk->get($input);
                $mimeType = $disk->mimeType($input) ?: 'image/jpeg';
                $base64 = base64_encode($bytes);

                $attachments[] = AiImage::fromBase64($base64, $mimeType);

                Log::info('PostPlanController: parsed reference image from storage', [
                    'input' => substr($input, 0, 80),
                    'mime_type' => $mimeType,
                    'size' => strlen($bytes),
                ]);

                continue;
            }

            // 2. Check if $input is a Media record ID
            if (Str::isUuid($input)) {
                $media = Media::query()->find($input);
                if ($media) {
                    $disk = Storage::exists($media->path) ? Storage::disk() : (Storage::disk('public')->exists($media->path) ? Storage::disk('public') : null);
                    if ($disk) {
                        $bytes = $disk->get($media->path);
                        $mimeType = $media->mime_type ?: ($disk->mimeType($media->path) ?: 'image/jpeg');
                        $base64 = base64_encode($bytes);

                        $attachments[] = AiImage::fromBase64($base64, $mimeType);

                        Log::info('PostPlanController: parsed reference image from Media UUID', [
                            'media_id' => $media->id,
                            'mime_type' => $mimeType,
                            'size' => strlen($bytes),
                        ]);

                        continue;
                    }
                }
            }

            // 3. Fallback: Data URI (data:image/png;base64,...)
            if (str_starts_with($input, 'data:')) {
                if (preg_match('/^data:([a-zA-Z0-9\/+\-]+);base64,(.+)$/s', $input, $matches)) {
                    $attachments[] = AiImage::fromBase64($matches[2], $matches[1]);

                    Log::info('PostPlanController: parsed reference image from data URI', [
                        'mime_type' => $matches[1],
                        'size' => strlen($matches[2]),
                    ]);
                }

                continue;
            }

            // 4. Fallback: Raw base64 string
            $attachments[] = AiImage::fromBase64($input);

            Log::info('PostPlanController: parsed reference image from raw base64', [
                'size' => strlen($input),
            ]);
        }

        Log::info('PostPlanController: parseReferenceImages complete', [
            'input_count' => count($referenceImages),
            'output_count' => count($attachments),
        ]);

        return $attachments;
    }
}
