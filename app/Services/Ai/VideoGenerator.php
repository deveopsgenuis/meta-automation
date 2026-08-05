<?php

declare(strict_types=1);

namespace App\Services\Ai;

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
        $this->model = (string) config('ai.video.model', 'google/veo-3.1-lite');
        $this->apiKey = (string) config('ai.video.api_key', '');
        $this->baseUrl = config('ai.video.base_url');
    }

    /**
     * Generate a short video via OpenRouter (submit + poll).
     *
     * @return array{video_path: string|null, error: string|null}
     */
    public function generate(string $prompt, string $size = '9:16', string $quality = '720p'): array
    {
        if ($this->apiKey === '') {
            return ['video_path' => null, 'error' => 'Video generator API key is not configured.'];
        }

        try {
            return $this->generateViaOpenRouter($prompt, $size, $quality);
        } catch (Throwable $e) {
            Log::error('VideoGenerator: generation failed', [
                'model' => $this->model,
                'error' => $e->getMessage(),
            ]);

            return ['video_path' => null, 'error' => $e->getMessage()];
        }
    }

    /**
     * @return array{video_path: string|null, error: string|null}
     */
    private function generateViaOpenRouter(string $prompt, string $size, string $quality): array
    {
        $baseUrl = $this->baseUrl ?: 'https://openrouter.ai/api/v1';

        // Step 1: Submit video generation request
        $submitResponse = Http::withHeaders([
            'Authorization' => "Bearer {$this->apiKey}",
            'Content-Type' => 'application/json',
        ])->timeout(60)->post("{$baseUrl}/videos", [
            'model' => $this->model,
            'prompt' => $prompt,
        ]);

        if ($submitResponse->failed()) {
            $error = $submitResponse->json('error.message') ?? $submitResponse->json('error') ?? "HTTP {$submitResponse->status()}";

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
     * @return array{video_path: string|null, error: string|null}
     */
    private function downloadVideo(string $videoUrl): array
    {
        $videoResponse = Http::timeout(120)->get($videoUrl);

        if ($videoResponse->failed()) {
            return ['video_path' => null, 'error' => 'Failed to download generated video.'];
        }

        $filename = 'videos/'.Str::uuid().'.mp4';
        Storage::disk('public')->put($filename, $videoResponse->body());

        return ['video_path' => $filename, 'error' => null];
    }
}
