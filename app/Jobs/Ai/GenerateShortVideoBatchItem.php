<?php

declare(strict_types=1);

namespace App\Jobs\Ai;

use App\Actions\Post\CreatePost;
use App\Enums\Media\Source;
use App\Enums\Post\CreatedVia;
use App\Enums\Post\Status as PostStatus;
use App\Events\Ai\VideoBatchProgress;
use App\Models\VideoBatchItem;
use App\Services\Ai\VideoGenerator;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Throwable;

class GenerateShortVideoBatchItem implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 2;

    public function __construct(
        public string $videoBatchItemId,
    ) {
        $this->onQueue('ai');
    }

    public function failed(?Throwable $exception): void
    {
        Log::error('GenerateShortVideoBatchItem job failed', [
            'item_id' => $this->videoBatchItemId,
            'error' => $exception?->getMessage(),
        ]);

        $item = VideoBatchItem::query()->with('batch')->find($this->videoBatchItemId);

        if (! $item) {
            return;
        }

        $item->update([
            'status' => 'failed',
            'error' => $exception?->getMessage() ?? 'Video generation failed.',
        ]);

        $batch = $item->batch;
        if ($batch) {
            $batch->increment('failed_items');
            $batch->refresh();

            if ($batch->completed_items + $batch->failed_items >= $batch->total_items) {
                $batch->update(['status' => $batch->completed_items > 0 ? 'completed' : 'failed']);
            }

            VideoBatchProgress::dispatch(
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
        /** @var VideoBatchItem $item */
        $item = VideoBatchItem::query()->with(['batch.workspace', 'batch.user'])->findOrFail($this->videoBatchItemId);
        $batch = $item->batch;
        $workspace = $batch->workspace;
        $user = $batch->user;

        $item->update(['status' => 'processing']);

        VideoBatchProgress::dispatch(
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
        $description = (string) data_get($planData, 'video_description', '');
        $hashtags = (string) data_get($planData, 'post_hashtags', '');
        $videoPrompt = (string) data_get($planData, 'video_prompt', '');
        $scheduledDate = (string) data_get($planData, 'scheduled_date', '');
        $scheduledTime = (string) data_get($planData, 'scheduled_time', '10:00');

        $fullContent = trim($description."\n\n".$hashtags);

        $generator = new VideoGenerator;
        $result = $generator->generate(
            prompt: $videoPrompt,
            size: $batch->size ?? '9:16',
            quality: $batch->quality ?? '720p',
        );

        if ($result['error']) {
            throw new \RuntimeException($result['error']);
        }

        $videoPath = $result['video_path'];

        $mediaItem = null;
        if ($videoPath && Storage::disk('public')->exists($videoPath)) {
            try {
                $mediaRecord = $workspace->addMediaFromStoredPath(
                    storagePath: $videoPath,
                    originalFilename: basename($videoPath),
                    mimeType: 'video/mp4',
                    size: Storage::disk('public')->size($videoPath),
                    collection: 'ai-generated',
                    meta: ['source' => Source::Ai->value],
                );

                Log::info('GenerateShortVideoBatchItem: Media created', [
                    'media_id' => $mediaRecord->id,
                    'video_path' => $videoPath,
                ]);
            } catch (Throwable $e) {
                Log::error('GenerateShortVideoBatchItem: Media creation failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ]);
                throw $e;
            }

            $mediaItem = [
                'id' => $mediaRecord->id,
                'path' => $mediaRecord->path,
                'url' => Storage::disk('public')->url($mediaRecord->path),
                'type' => 'video',
                'mime_type' => 'video/mp4',
                'source' => Source::Ai->value,
            ];
        }

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

        Log::info('GenerateShortVideoBatchItem: Creating post', [
            'item_id' => $item->id,
            'post_data' => $postData,
        ]);

        $post = CreatePost::execute($workspace, $user, $postData);

        Log::info('GenerateShortVideoBatchItem: Post created', [
            'post_id' => $post->id,
        ]);

        $post->update(['status' => PostStatus::Scheduled]);

        $item->update([
            'status' => 'completed',
            'post_id' => $post->id,
            'video_path' => $videoPath,
        ]);

        $batch->increment('completed_items');
        $batch->refresh();

        if ($batch->completed_items + $batch->failed_items >= $batch->total_items) {
            $batch->update(['status' => 'completed']);
        }

        VideoBatchProgress::dispatch(
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
                'video_path' => $videoPath,
                'video_url' => $videoPath ? Storage::disk('public')->url($videoPath) : null,
                'plan_data' => $item->plan_data,
            ],
        );
    }
}
