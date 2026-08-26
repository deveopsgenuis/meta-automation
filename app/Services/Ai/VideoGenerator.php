<?php

declare(strict_types=1);

namespace App\Services\Ai;

use App\Models\Media;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

class VideoGenerator
{
    private string $model;

    private string $apiKey;

    private ?string $baseUrl;

    public function __construct()
    {
        $this->model = (string) config('ai.video.model', 'bytedance/seedance-1-5-pro');
        $this->apiKey = (string) config('ai.video.api_key', '');
        $this->baseUrl = config('ai.video.base_url');
    }

    /**
     * Generate a short video via OpenRouter (submit + poll).
     *
     * @param  array<int, array{path: string, frame_type: string}>  $frameImages
     * @return array{video_path: string|null, error: string|null}
     */
    public function generate(string $prompt, string $size = '9:16', string $quality = '720p', array $frameImages = []): array
    {
        if ($this->apiKey === '') {
            return ['video_path' => null, 'error' => 'Video generator API key is not configured.'];
        }

        try {
            return $this->generateViaOpenRouter($prompt, $size, $quality, $frameImages);
        } catch (Throwable $e) {
            Log::error('VideoGenerator: generation failed', [
                'model' => $this->model,
                'error' => $e->getMessage(),
            ]);

            return ['video_path' => null, 'error' => $e->getMessage()];
        }
    }

    /**
     * @param  array<int, array{path: string, frame_type: string}>  $frameImages
     * @return array{video_path: string|null, error: string|null}
     */
    private function generateViaOpenRouter(string $prompt, string $size, string $quality, array $frameImages = []): array
    {
        $baseUrl = $this->baseUrl ?: 'https://openrouter.ai/api/v1';

        $payload = [
            'model' => $this->model,
            'prompt' => $prompt,
            'size' => $this->mapSize($size),
            'duration' => 6,
        ];

        $formattedFrames = $this->formatFrameImages($frameImages);

        if ($formattedFrames !== []) {
            $payload['frame_images'] = $formattedFrames;
        }

        Log::info('VideoGenerator: submitting request', [
            'model' => $this->model,
            'prompt_length' => strlen($prompt),
            'size' => $size,
            'frame_images_count' => count($formattedFrames),
            'frame_types' => array_map(fn ($f) => $f['frame_type'] ?? 'unknown', $formattedFrames),
        ]);

        // Step 1: Submit video generation request
        $submitResponse = Http::withHeaders([
            'Authorization' => "Bearer {$this->apiKey}",
            'Content-Type' => 'application/json',
        ])->timeout(60)->post("{$baseUrl}/videos", $payload);

        if ($submitResponse->failed()) {
            $error = $submitResponse->json('error.message') ?? $submitResponse->json('error') ?? "HTTP {$submitResponse->status()}";

            Log::error('VideoGenerator: submit failed', [
                'status' => $submitResponse->status(),
                'error' => $error,
            ]);

            return ['video_path' => null, 'error' => "OpenRouter submit error: {$error}"];
        }

        $jobId = $submitResponse->json('id');
        $pollingUrl = $submitResponse->json('polling_url');

        if (! $jobId || ! $pollingUrl) {
            return ['video_path' => null, 'error' => 'No job ID or polling URL returned from OpenRouter.'];
        }

        Log::info('VideoGenerator: job submitted', [
            'job_id' => $jobId,
            'polling_url' => $pollingUrl,
        ]);

        // Step 2: Poll for completion
        $maxAttempts = 120; // 10 minutes max (5s intervals)
        $attempt = 0;

        while ($attempt < $maxAttempts) {
            sleep(5);
            $attempt++;

            $pollResponse = Http::withHeaders([
                'Authorization' => "Bearer {$this->apiKey}",
            ])->timeout(30)->get($pollingUrl);

            if ($pollResponse->failed()) {
                Log::warning('VideoGenerator: poll request failed', [
                    'attempt' => $attempt,
                    'status' => $pollResponse->status(),
                ]);

                continue;
            }

            $statusData = $pollResponse->json();
            $status = $statusData['status'] ?? 'unknown';

            Log::info('VideoGenerator: poll status', [
                'job_id' => $jobId,
                'status' => $status,
                'attempt' => $attempt,
            ]);

            if ($status === 'completed') {
                $unsignedUrls = $statusData['unsigned_urls'] ?? [];
                $videoUrl = $unsignedUrls[0] ?? $statusData['url'] ?? null;

                if (! $videoUrl) {
                    return ['video_path' => null, 'error' => 'No video URL in completed response.'];
                }

                return $this->downloadVideo($videoUrl);
            }

            if ($status === 'failed') {
                $errorMsg = $statusData['error'] ?? 'Unknown error';

                return ['video_path' => null, 'error' => "Video generation failed: {$errorMsg}"];
            }
        }

        return ['video_path' => null, 'error' => 'Video generation timed out after 10 minutes.'];
    }

    /**
     * @param  array<int, array{path: string, frame_type: string}>  $frameImages
     * @return array<int, array{type: string, image_url: array{url: string}, frame_type: string}>
     */
    private function formatFrameImages(array $frameImages): array
    {
        $formatted = [];

        foreach ($frameImages as $frame) {
            $path = $frame['path'] ?? '';
            $frameType = $frame['frame_type'] ?? 'first_frame';

            if ($path === '') {
                continue;
            }

            $dataUri = $this->pathToDataUri($path);

            if ($dataUri === null) {
                Log::warning('VideoGenerator: could not convert frame image to data URI', [
                    'path' => substr($path, 0, 80),
                ]);

                continue;
            }

            $formatted[] = [
                'type' => 'image_url',
                'image_url' => [
                    'url' => $dataUri,
                ],
                'frame_type' => $frameType,
            ];
        }

        return $formatted;
    }

    private function pathToDataUri(string $path): ?string
    {
        // Already a data URI
        if (str_starts_with($path, 'data:')) {
            return $path;
        }

        // Stored file path
        if (Storage::disk('public')->exists($path)) {
            $bytes = Storage::disk('public')->get($path);
            $mimeType = Storage::disk('public')->mimeType($path) ?: 'image/jpeg';

            return 'data:'.$mimeType.';base64,'.base64_encode($bytes);
        }

        // Media UUID
        if (Str::isUuid($path)) {
            $media = Media::query()->find($path);
            if ($media && Storage::disk('public')->exists($media->path)) {
                $bytes = Storage::disk('public')->get($media->path);
                $mimeType = $media->mime_type ?: Storage::disk('public')->mimeType($media->path) ?: 'image/jpeg';

                return 'data:'.$mimeType.';base64,'.base64_encode($bytes);
            }
        }

        return null;
    }

    private function mapSize(string $size): string
    {
        return match ($size) {
            '9:16' => '720x1280',
            '16:9' => '1280x720',
            '1:1' => '720x720',
            default => '720x1280',
        };
    }

    /**
     * @return array{video_path: string|null, error: string|null}
     */
    private function downloadVideo(string $videoUrl): array
    {
        $videoResponse = Http::withHeaders([
            'Authorization' => "Bearer {$this->apiKey}",
        ])->timeout(120)->get($videoUrl);

        if ($videoResponse->failed()) {
            return ['video_path' => null, 'error' => 'Failed to download generated video.'];
        }

        $filename = 'videos/'.Str::uuid().'.mp4';
        Storage::disk('public')->put($filename, $videoResponse->body());

        return ['video_path' => $filename, 'error' => null];
    }
}
