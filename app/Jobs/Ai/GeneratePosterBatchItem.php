<?php

declare(strict_types=1);

namespace App\Jobs\Ai;

use App\Actions\Post\CreatePost;
use App\Enums\Media\Source;
use App\Enums\Post\CreatedVia;
use App\Enums\Post\Status as PostStatus;
use App\Events\Ai\PosterBatchProgress;
use App\Models\Media;
use App\Models\PosterBatchItem;
use App\Services\Ai\UserAiCreditService;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

class GeneratePosterBatchItem implements ShouldQueue
{
    /** @var array<int, string> */
    private array $temporaryReferenceImagePaths = [];

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
            $model = (string) config('ai.default_image_model');

            Log::info('GeneratePosterBatchItem: generating image', [
                'prompt_length' => strlen($visualPrompt),
                'has_references' => count($referenceImages) > 0,
                'model' => $model,
            ]);

            $effectivePrompt = $visualPrompt;

            if (count($referenceImages) > 0) {
                $effectivePrompt = 'IMPORTANT: The reference image(s) attached are exact assets (logos, brand marks, product images, or media) that must appear in the poster exactly as provided - do not stylize, recolor, distort, or reinterpret them in any way. Composite them faithfully into the design as locked elements. '.$visualPrompt;
            }

            $payload = array_filter([
                'model' => $model,
                'prompt' => $effectivePrompt,
                'resolution' => '1K',
                'aspect_ratio' => '1:1',
                'quality' => 'low',
                'n' => 1,
                'input_references' => $this->formatReferenceImages($referenceImages),
            ], fn (mixed $value) => $value !== null && $value !== []);

            Log::info('GeneratePosterBatchItem: sending request to OpenRouter', [
                'payload_keys' => array_keys($payload),
                'has_references' => isset($payload['input_references']),
                'reference_count' => isset($payload['input_references']) ? count($payload['input_references']) : 0,
            ]);

            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.config('services.openai.api_key'),
                'Content-Type' => 'application/json',
                'HTTP-Referer' => config('app.url'),
                'X-Title' => config('app.name'),
            ])
                ->acceptJson()
                ->asJson()
                ->connectTimeout(30)
                ->timeout(180)
                ->retry(2, 1000)
                ->post('https://openrouter.ai/api/v1/images', $payload);

            if (! $response->successful()) {
                Log::error('GeneratePosterBatchItem: OpenRouter API error', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return null;
            }

            $result = $response->json();
            $base64Image = (string) data_get($result, 'data.0.b64_json', '');

            if ($base64Image === '') {
                Log::warning('GeneratePosterBatchItem: no b64_json in OpenRouter response', [
                    'response_keys' => is_array($result) ? array_keys($result) : [],
                ]);

                return null;
            }

            if (str_starts_with($base64Image, 'data:')) {
                $base64Image = (string) Str::of($base64Image)->after(',');
            }

            $imageBytes = base64_decode($base64Image, true);

            if ($imageBytes === false) {
                Log::warning('GeneratePosterBatchItem: failed to decode OpenRouter image');

                return null;
            }

            $mediaType = (string) data_get($result, 'data.0.media_type', 'image/png');
            $extension = match ($mediaType) {
                'image/jpeg', 'image/jpg' => 'jpg',
                'image/gif' => 'gif',
                'image/webp' => 'webp',
                default => 'png',
            };
            $path = 'posters/poster-'.Str::uuid().'.'.$extension;

            Storage::disk('public')->put($path, $imageBytes);

            Log::info('GeneratePosterBatchItem: image saved', [
                'path' => $path,
                'media_type' => $mediaType,
                'size' => strlen($imageBytes),
            ]);

            return $path;
        } catch (Throwable $e) {
            Log::error('GeneratePosterBatchItem: image generation failed', [
                'prompt' => substr($visualPrompt, 0, 200),
                'has_references' => count($referenceImages) > 0,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return null;
        }
    }

    /**
     * @param  array<int, mixed>  $referenceImages
     * @return array<int, array{type: string, image_url: array{url: string}}>
     */
    private function formatReferenceImages(array $referenceImages): array
    {
        return array_values(array_filter(array_map(
            fn (mixed $referenceImage) => $this->formatReferenceImage($referenceImage),
            $referenceImages,
        )));
    }

    /**
     * @return array{type: string, image_url: array{url: string}}|null
     */
    private function formatReferenceImage(mixed $reference): ?array
    {
        if (is_array($reference)) {
            $url = data_get($reference, 'image_url.url', data_get($reference, 'url'));

            if (is_string($url) && str_starts_with($url, 'data:')) {
                return $this->openRouterImageReference($url);
            }

            $reference = $url;
        }

        if (! is_string($reference) || trim($reference) === '') {
            return null;
        }

        $reference = trim($reference);

        if (str_starts_with($reference, 'data:')) {
            return $this->openRouterImageReference($reference);
        }

        if (Storage::exists($reference)) {
            return $this->storedImageReference($reference, config('filesystems.default'));
        }

        if (Storage::disk('public')->exists($reference)) {
            return $this->storedImageReference($reference, 'public');
        }

        if (Str::isUuid($reference)) {
            $media = Media::query()->find($reference);

            if ($media && Storage::exists($media->path)) {
                return $this->storedImageReference($media->path, config('filesystems.default'), $media->mime_type);
            }

            if ($media && Storage::disk('public')->exists($media->path)) {
                return $this->storedImageReference($media->path, 'public', $media->mime_type);
            }
        }

        if (base64_decode($reference, true) !== false) {
            return $this->openRouterImageReference('data:image/jpeg;base64,'.$reference);
        }

        Log::warning('GeneratePosterBatchItem: unable to format reference image', [
            'reference_prefix' => substr($reference, 0, 50),
        ]);

        return null;
    }

    /**
     * @return array{type: string, image_url: array{url: string}}
     */
    private function storedImageReference(string $path, string $disk, ?string $mimeType = null): array
    {
        $diskInstance = Storage::disk($disk);
        $mimeType ??= $diskInstance->mimeType($path) ?: 'image/jpeg';

        return $this->openRouterImageReference('data:'.$mimeType.';base64,'.base64_encode($diskInstance->get($path)));
    }

    /**
     * @return array{type: string, image_url: array{url: string}}
     */
    private function openRouterImageReference(string $dataUri): array
    {
        return [
            'type' => 'image_url',
            'image_url' => [
                'url' => $dataUri,
            ],
        ];
    }
}
