<?php

declare(strict_types=1);

namespace App\Jobs\Ai;

use App\Actions\Post\CreatePost;
use App\Enums\Media\Source;
use App\Enums\Post\CreatedVia;
use App\Enums\Post\Status as PostStatus;
use App\Events\Ai\PosterBatchProgress;
use App\Models\Media;
use App\Models\Post;
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
use Illuminate\Support\Str;
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

        $fullContent = trim($description."\n\n".$hashtags);

        // Generate image via AI
        $imagePath = $this->generatePosterImage($workspace, $visualPrompt);

        UserAiCreditService::consumeImage($user);

        // Attach image to media collection
        $mediaItem = null;
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            try {
                $mediaRecord = $workspace->addMediaFromStoredPath(
                    storagePath: $imagePath,
                    originalFilename: basename($imagePath),
                    mimeType: 'image/png',
                    size: Storage::disk('public')->size($imagePath),
                    collection: 'ai-generated',
                    meta: ['source' => Source::Ai->value],
                );

                Log::info('GeneratePosterBatchItem: Media created', [
                    'media_id' => $mediaRecord->id,
                    'image_path' => $imagePath,
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
                'path' => $imageRecordPath = $mediaRecord->path,
                'url' => Storage::disk('public')->url($imageRecordPath),
                'type' => 'image',
                'mime_type' => 'image/png',
                'source' => Source::Ai->value,
            ];
        }

        // Schedule Post
        $postData = [
            'content' => $fullContent,
            'media' => $mediaItem ? [$mediaItem] : [],
            'date' => $scheduledDate,
            'scheduled_at' => Carbon::parse($scheduledDate, 'UTC')->setTime(10, 0)->utc()->toDateTimeString(),
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
            'post_data' => $postData,
        ]);

        $post = CreatePost::execute($workspace, $user, $postData);

        Log::info('GeneratePosterBatchItem: Post created', [
            'post_id' => $post->id,
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

    private function generatePosterImage($workspace, string $visualPrompt): ?string
    {
        if (trim($visualPrompt) === '') {
            return null;
        }

        try {
            $response = Image::of($visualPrompt)
                ->square()
                ->quality('low')
                ->timeout(120)
                ->generate(model: config('ai.default_image_model'));

            $bytes = (string) $response;

            if ($bytes === '') {
                return null;
            }

            $filename = 'posters/'.Str::uuid().'.png';
            Storage::disk('public')->put($filename, $bytes);

            return $filename;
        } catch (Throwable $e) {
            Log::warning('GeneratePosterBatchItem: image generation failed', [
                'prompt' => $visualPrompt,
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }
}
