<?php

declare(strict_types=1);

namespace App\Jobs\Ai;

use App\Actions\Post\CreatePost;
use App\Enums\Media\Source;
use App\Enums\Post\CreatedVia;
use App\Enums\Post\Status as PostStatus;
use App\Events\Ai\PosterBatchProgress;
use App\Models\PosterBatchItem;
use App\Services\Ai\UserAiCreditService;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Laravel\Ai\Image;
use Throwable;

class GeneratePosterBatchItem implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 2;

    public function __construct(
        public string $posterBatchItemId,
    ) {
        $this->onQueue('ai');
    }

    public function failed(?Throwable $exception): void
    {
        Log::error('GeneratePosterBatchItem job failed', [
            'item_id' => $this->posterBatchItemId,
            'error' => $exception?->getMessage(),
        ]);

        $item = PosterBatchItem::query()->with('batch')->find($this->posterBatchItemId);

        if (! $item) {
            return;
        }

        $item->update([
            'status' => 'failed',
            'error' => $exception?->getMessage() ?? 'Poster generation failed.',
        ]);

        $batch = $item->batch;
        if ($batch) {
            $batch->increment('failed_items');
            $batch->refresh();

            if ($batch->completed_items + $batch->failed_items >= $batch->total_items) {
                $batch->update(['status' => $batch->completed_items > 0 ? 'completed' : 'failed']);
            }

            PosterBatchProgress::dispatch(
                userId: $batch->user_id,
                batchId: $batch->id,
                itemId: $item->id,
                status: 'failed',
                completedItems: $batch->completed_items,
                totalItems: $batch->total_items,
                failedItems: $batch->failed_items,
                itemData: [
                    'id' => $item->id,
                    'status' => 'failed',
                    'error' => $item->error,
                    'plan_data' => $item->plan_data,
                ],
                error: $item->error,
            );
        }
    }

    public function handle(): void
    {
        /** @var PosterBatchItem $item */
        $item = PosterBatchItem::query()->with(['batch.workspace', 'batch.user'])->findOrFail($this->posterBatchItemId);
        $batch = $item->batch;
        $workspace = $batch->workspace;
        $user = $batch->user;

        $item->update(['status' => 'processing']);

        PosterBatchProgress::dispatch(
            userId: $batch->user_id,
            batchId: $batch->id,
            itemId: $item->id,
            status: 'processing',
            completedItems: $batch->completed_items,
            totalItems: $batch->total_items,
            failedItems: $batch->failed_items,
            itemData: [
                'id' => $item->id,
                'status' => 'processing',
                'plan_data' => $item->plan_data,
            ],
        );

        $planData = $item->plan_data ?? [];
        $description = (string) data_get($planData, 'post_description', '');
        $hashtags = (string) data_get($planData, 'post_hashtags', '');
        $visualPrompt = (string) data_get($planData, 'post_visual_prompt', '');
        $scheduledDate = (string) data_get($planData, 'scheduled_date', '');
        $scheduledTime = (string) data_get($planData, 'scheduled_time', '10:00');

        $fullContent = trim($description."\n\n".$hashtags);

        // Get reference images from batch
        $referenceImages = $batch->reference_images ?? [];

        Log::info('GeneratePosterBatchItem: processing item', [
            'item_id' => $item->id,
            'batch_id' => $batch->id,
            'has_reference_images' => count($referenceImages) > 0,
            'reference_images_count' => count($referenceImages),
        ]);

        // Generate image via AI
        $imagePath = $this->generatePosterImage($workspace, $visualPrompt, $referenceImages);

        UserAiCreditService::consumeImage($user);

        Log::info('GeneratePosterBatchItem: image generation result', [
            'item_id' => $item->id,
            'image_path' => $imagePath,
            'image_exists' => $imagePath ? Storage::disk('public')->exists($imagePath) : false,
        ]);

        // Attach image to media collection
        $mediaItem = null;
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            try {
                $mimeType = Storage::disk('public')->mimeType($imagePath) ?: 'image/png';

                $mediaRecord = $workspace->addMediaFromStoredPath(
                    storagePath: $imagePath,
                    originalFilename: basename($imagePath),
                    mimeType: $mimeType,
                    size: Storage::disk('public')->size($imagePath),
                    collection: 'ai-generated',
                    meta: ['source' => Source::Ai->value],
                );

                Log::info('GeneratePosterBatchItem: Media created', [
                    'media_id' => $mediaRecord->id,
                    'media_path' => $mediaRecord->path,
                    'image_path' => $imagePath,
                    'mime_type' => $mimeType,
                ]);
            } catch (Throwable $e) {
                Log::error('GeneratePosterBatchItem: Media creation failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ]);
                throw $e;
            }

            $mediaItem = [
                'id' => $mediaRecord->id,
                'path' => $mediaRecord->path,
                'url' => Storage::disk('public')->url($mediaRecord->path),
                'type' => 'image',
                'mime_type' => $mimeType,
                'source' => Source::Ai->value,
            ];

            Log::info('GeneratePosterBatchItem: media item prepared', [
                'media_item' => $mediaItem,
            ]);
        }

        // Schedule Post
        $timeParts = explode(':', $scheduledTime);
        $hour = (int) ($timeParts[0] ?? 10);
        $minute = (int) ($timeParts[1] ?? 0);

        $postData = [
            'content' => $fullContent,
            'media' => $mediaItem ? [$mediaItem] : [],
            'date' => $scheduledDate,
            'scheduled_at' => Carbon::parse($scheduledDate, 'UTC')->setTime($hour, $minute)->utc()->toDateTimeString(),
            'created_via' => CreatedVia::Ai,
        ];

        if ($batch->social_account_id) {
            $postData['platforms'] = [
                [
                    'social_account_id' => $batch->social_account_id,
                ],
            ];
        }

        Log::info('GeneratePosterBatchItem: Creating post', [
            'item_id' => $item->id,
            'has_media' => isset($postData['media']) && count($postData['media']) > 0,
            'media_count' => isset($postData['media']) ? count($postData['media']) : 0,
            'post_data_keys' => array_keys($postData),
        ]);

        $post = CreatePost::execute($workspace, $user, $postData);

        Log::info('GeneratePosterBatchItem: Post created', [
            'post_id' => $post->id,
            'post_media' => $post->media,
            'post_has_media' => ! empty($post->media),
        ]);

        $post->update(['status' => PostStatus::Scheduled]);

        Log::info('GeneratePosterBatchItem: Post status updated to scheduled', [
            'post_id' => $post->id,
        ]);

        $item->update([
            'status' => 'completed',
            'post_id' => $post->id,
            'image_path' => $imagePath,
        ]);

        Log::info('GeneratePosterBatchItem: Item updated', [
            'item_id' => $item->id,
            'status' => 'completed',
        ]);

        $batch->increment('completed_items');
        $batch->refresh();

        if ($batch->completed_items + $batch->failed_items >= $batch->total_items) {
            $batch->update(['status' => 'completed']);
        }

        PosterBatchProgress::dispatch(
            userId: $batch->user_id,
            batchId: $batch->id,
            itemId: $item->id,
            status: 'completed',
            completedItems: $batch->completed_items,
            totalItems: $batch->total_items,
            failedItems: $batch->failed_items,
            itemData: [
                'id' => $item->id,
                'status' => 'completed',
                'post_id' => $post->id,
                'image_path' => $imagePath,
                'image_url' => $imagePath ? Storage::disk('public')->url($imagePath) : null,
                'plan_data' => $item->plan_data,
            ],
        );
    }

    private function generatePosterImage($workspace, string $visualPrompt, array $referenceImages = []): ?string
    {
        if (trim($visualPrompt) === '') {
            Log::info('GeneratePosterBatchItem: empty visual prompt, skipping image generation');

            return null;
        }

        try {
            Log::info('GeneratePosterBatchItem: generating image', [
                'prompt_length' => strlen($visualPrompt),
                'has_references' => count($referenceImages) > 0,
                'model' => config('ai.default_image_model'),
            ]);

            $effectivePrompt = $visualPrompt;

            if (count($referenceImages) > 0) {
                $effectivePrompt = 'IMPORTANT: The reference image(s) attached are exact assets (logos, brand marks, product images, or media) that must appear in the poster exactly as provided — do not stylize, recolor, distort, or reinterpret them in any way. Composite them faithfully into the design as locked elements. '.$visualPrompt;
            }

            $imageBuilder = Image::of($effectivePrompt)
                ->square()
                ->quality('low')
                ->timeout(120);

            if (count($referenceImages) > 0) {
                $attachments = array_map(
                    fn (string $base64) => \Laravel\Ai\Files\Image::fromBase64($base64),
                    $referenceImages,
                );
                $imageBuilder->attachments($attachments);
            }

            $response = $imageBuilder->generate(model: config('ai.default_image_model'));

            $image = $response->firstImage();

            if ($image->content() === '') {
                Log::warning('GeneratePosterBatchItem: empty response from image generation');

                return null;
            }

            $filename = $response->store('posters', 'public');

            if ($filename === false) {
                Log::warning('GeneratePosterBatchItem: failed to store image');

                return null;
            }

            Log::info('GeneratePosterBatchItem: image saved', [
                'filename' => $filename,
                'mime' => $image->mime,
                'size' => strlen($image->content()),
            ]);

            return $filename;
        } catch (Throwable $e) {
            Log::error('GeneratePosterBatchItem: image generation failed', [
                'prompt' => substr($visualPrompt, 0, 200),
                'has_references' => count($referenceImages) > 0,
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }
}
