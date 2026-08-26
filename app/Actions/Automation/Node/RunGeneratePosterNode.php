<?php

declare(strict_types=1);

namespace App\Actions\Automation\Node;

use App\Actions\Post\CreatePost;
use App\Ai\Agents\PosterGenerationPlan;
use App\DataTransferObjects\Automation\NodeRunResult;
use App\Enums\Post\CreatedVia;
use App\Enums\PostPlatform\ContentType;
use App\Models\AutomationRun;
use App\Models\Media;
use App\Models\SocialAccount;
use App\Models\User;
use App\Models\Workspace;
use App\Services\Ai\RecordAiUsage;
use App\Services\Automation\ExpressionResolver;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravel\Ai\Files\Base64Image;
use Laravel\Ai\Image;
use Throwable;

class RunGeneratePosterNode
{
    public function __construct(
        private ExpressionResolver $resolver,
    ) {}

    public function __invoke(AutomationRun $run, array $config): NodeRunResult
    {
        Log::info('RunGeneratePosterNode: starting', [
            'run_id' => $run->id,
            'config' => $config,
        ]);

        $context = $run->resolverContext();
        $prompt = $this->resolver->resolve((string) data_get($config, 'prompt_template', ''), $context);

        Log::info('RunGeneratePosterNode: resolved prompt', [
            'run_id' => $run->id,
            'prompt_length' => strlen($prompt),
            'prompt_preview' => substr($prompt, 0, 200),
        ]);

        $workspace = $run->automation->workspace;

        $accountsConfig = $this->resolveAccountsConfig($config);
        $posterSize = (string) data_get($config, 'poster_size', '1080*1080');
        $posterCount = (int) data_get($config, 'poster_count', 1);
        $template = (string) data_get($config, 'template', 'single');
        $applyBrandVoice = (bool) data_get($config, 'use_brand_voice', true);
        $applyBrandVisuals = (bool) data_get($config, 'use_brand_visuals', true);

        $referenceImages = $this->resolveReferenceImages($config);

        Log::info('RunGeneratePosterNode: parsed config', [
            'run_id' => $run->id,
            'accounts_count' => count($accountsConfig),
            'poster_size' => $posterSize,
            'poster_count' => $posterCount,
            'template' => $template,
            'reference_images_count' => count($referenceImages),
        ]);

        $accountIds = array_values(array_filter(array_map(
            fn ($a) => data_get($a, 'social_account_id'),
            $accountsConfig,
        )));

        $activeAccounts = SocialAccount::query()
            ->whereIn('id', $accountIds)
            ->where('workspace_id', $workspace->id)
            ->active()
            ->get()
            ->keyBy('id');

        $orientation = $this->sizeToOrientation($posterSize);

        $platforms = [];
        foreach ($accountsConfig as $entry) {
            $accountId = data_get($entry, 'social_account_id');
            if (! $accountId || ! $activeAccounts->has($accountId)) {
                continue;
            }

            $contentTypeValue = (string) data_get($entry, 'content_type', '');
            $contentType = $contentTypeValue !== ''
                ? ContentType::tryFrom($contentTypeValue)
                : ContentType::InstagramFeed;

            $platforms[] = [
                'social_account_id' => $accountId,
                'content_type' => ($contentType ?? ContentType::InstagramFeed)->value,
                'meta' => data_get($entry, 'meta', []),
            ];
        }

        $generatedPosts = [];

        for ($i = 0; $i < $posterCount; $i++) {
            $posterPrompt = $posterCount > 1
                ? $prompt."\n\nThis is poster ".($i + 1).' of '.$posterCount.'. Vary the design across posters.'
                : $prompt;

            try {
                $visualPrompt = $this->generatePlan(
                    workspace: $workspace,
                    userPrompt: $posterPrompt,
                    posterSize: $posterSize,
                    referenceImages: $referenceImages,
                );

                Log::info('RunGeneratePosterNode: plan generated', [
                    'run_id' => $run->id,
                    'poster_index' => $i,
                    'visual_prompt_length' => strlen($visualPrompt),
                ]);

                $imageBytes = $this->generatePosterImage($visualPrompt, $orientation, $referenceImages);

                Log::info('RunGeneratePosterNode: image generation result', [
                    'run_id' => $run->id,
                    'poster_index' => $i,
                    'image_generated' => $imageBytes !== null,
                    'image_bytes' => $imageBytes !== null ? strlen($imageBytes) : 0,
                ]);

                $mediaItem = null;
                if ($imageBytes !== null) {
                    $path = 'posters/poster-'.Str::uuid().'.png';
                    Storage::disk('public')->put($path, $imageBytes);

                    $mediaItem = [
                        'id' => null,
                        'path' => $path,
                        'url' => Storage::disk('public')->url($path),
                        'type' => 'image',
                        'mime_type' => 'image/png',
                        'source' => 'ai',
                    ];
                }

                if ($run->is_dry_run) {
                    $generatedPosts[] = [
                        'post_id' => null,
                        'content' => $posterPrompt,
                        'visual_prompt' => $visualPrompt,
                        'dry_run' => true,
                        'poster_size' => $posterSize,
                    ];

                    continue;
                }

                $user = $this->resolveUser($run);

                $post = CreatePost::execute($workspace, $user, [
                    'content' => $posterPrompt,
                    'media' => $mediaItem ? [$mediaItem] : [],
                    'platforms' => $platforms,
                    'created_via' => CreatedVia::Automation,
                ]);

                Log::info('RunGeneratePosterNode: post created', [
                    'run_id' => $run->id,
                    'poster_index' => $i,
                    'post_id' => $post->id,
                ]);

                $generatedPosts[] = [
                    'post_id' => $post->id,
                    'content' => $posterPrompt,
                    'visual_prompt' => $visualPrompt,
                    'poster_size' => $posterSize,
                    'post_url' => route('app.posts.show', $post->id),
                ];
            } catch (Throwable $e) {
                Log::error('RunGeneratePosterNode: poster generation failed', [
                    'run_id' => $run->id,
                    'poster_index' => $i,
                    'error' => $e->getMessage(),
                    'exception_class' => $e::class,
                    'exception_file' => $e->getFile(),
                    'exception_line' => $e->getLine(),
                ]);

                $generatedPosts[] = [
                    'post_id' => null,
                    'content' => $posterPrompt,
                    'error' => $e->getMessage(),
                ];
            }
        }

        $run->update([
            'generated_post_id' => $generatedPosts[0]['post_id'] ?? null,
        ]);

        return NodeRunResult::completed(output: [
            'generated' => [
                'posters' => $generatedPosts,
                'poster_count' => count($generatedPosts),
                'poster_size' => $posterSize,
            ],
        ]);
    }

    private function generatePlan(
        Workspace $workspace,
        string $userPrompt,
        string $posterSize,
        array $referenceImages = [],
    ): string {
        $agent = new PosterGenerationPlan(
            workspace: $workspace,
            userPrompt: $userPrompt,
            posterSize: $posterSize,
            referenceImages: $referenceImages,
        );

        $attachments = $this->parseReferenceImagesForAi($referenceImages);

        Log::info('RunGeneratePosterNode: calling plan agent', [
            'workspace_id' => $workspace->id,
            'has_reference_images' => count($attachments) > 0,
        ]);

        $response = $agent->prompt(
            prompt: "Create a detailed poster design plan based on this request: {$userPrompt}",
            attachments: $attachments !== [] ? $attachments : null,
        );

        $structured = $response->structured ?? [];
        $visualPrompt = (string) data_get($structured, 'visual_prompt', $userPrompt);

        RecordAiUsage::recordText(
            workspace: $workspace,
            promptTokens: $response->usage->promptTokens,
            completionTokens: $response->usage->completionTokens,
            provider: (string) config('ai.default'),
            model: (string) config('ai.default_text_model'),
            metadata: ['agent' => 'poster_generation_plan', 'source' => 'automation'],
        );

        Log::info('RunGeneratePosterNode: plan agent response', [
            'visual_prompt_length' => strlen($visualPrompt),
            'prompt_tokens' => $response->usage->promptTokens ?? null,
            'completion_tokens' => $response->usage->completionTokens ?? null,
        ]);

        return $visualPrompt;
    }

    private function generatePosterImage(string $prompt, string $orientation, array $referenceImages = []): ?string
    {
        $model = (string) config('ai.default_image_model');

        Log::info('RunGeneratePosterNode: generating image', [
            'model' => $model,
            'orientation' => $orientation,
            'prompt_length' => strlen($prompt),
            'reference_images_count' => count($referenceImages),
        ]);

        try {
            $builder = Image::of($prompt)->quality('low')->timeout(180);

            $builder = match ($orientation) {
                'portrait' => $builder->portrait(),
                'landscape' => $builder->landscape(),
                default => $builder->square(),
            };

            if ($referenceImages !== []) {
                $parsedImages = $this->parseReferenceImagesForAi($referenceImages);
                if ($parsedImages !== []) {
                    $builder = $builder->attachments($parsedImages);
                }
            }

            $image = $builder->generate(model: $model);
            $bytes = (string) $image;

            return $bytes !== '' ? $bytes : null;
        } catch (Throwable $e) {
            Log::warning('RunGeneratePosterNode: Laravel Ai image generation failed, trying OpenRouter fallback', [
                'error' => $e->getMessage(),
            ]);

            return $this->generateViaOpenRouter($prompt);
        }
    }

    /**
     * @param  array<int, string>  $referenceImages
     * @return array<int, Base64Image>
     */
    private function parseReferenceImagesForAi(array $referenceImages): array
    {
        $attachments = [];

        foreach ($referenceImages as $input) {
            if (! is_string($input) || trim($input) === '') {
                continue;
            }

            $input = trim($input);

            if (Storage::exists($input) || Storage::disk('public')->exists($input)) {
                $disk = Storage::exists($input) ? Storage::disk() : Storage::disk('public');
                $bytes = $disk->get($input);
                $mimeType = $disk->mimeType($input) ?: 'image/jpeg';
                $base64 = base64_encode($bytes);
                $attachments[] = Base64Image::fromBase64($base64, $mimeType);

                continue;
            }

            if (Str::isUuid($input)) {
                $media = Media::query()->find($input);
                if ($media) {
                    $disk = Storage::exists($media->path) ? Storage::disk() : (Storage::disk('public')->exists($media->path) ? Storage::disk('public') : null);
                    if ($disk) {
                        $bytes = $disk->get($media->path);
                        $mimeType = $media->mime_type ?: ($disk->mimeType($media->path) ?: 'image/jpeg');
                        $base64 = base64_encode($bytes);
                        $attachments[] = Base64Image::fromBase64($base64, $mimeType);

                        continue;
                    }
                }
            }

            if (str_starts_with($input, 'data:')) {
                $parts = explode(',', $input, 2);
                if (count($parts) === 2) {
                    $metaParts = explode(';', $parts[0]);
                    $mimeType = str_replace('data:', '', $metaParts[0]) ?: 'image/jpeg';
                    $attachments[] = Base64Image::fromBase64($parts[1], $mimeType);
                }

                continue;
            }

            if (filter_var($input, FILTER_VALIDATE_URL)) {
                try {
                    $response = Http::timeout(30)->get($input);
                    if ($response->successful()) {
                        $mimeType = $response->header('Content-Type', 'image/jpeg');
                        $base64 = base64_encode($response->body());
                        $attachments[] = Base64Image::fromBase64($base64, $mimeType);
                    }
                } catch (Throwable) {
                    Log::warning('RunGeneratePosterNode: failed to fetch reference image URL', [
                        'url' => substr($input, 0, 100),
                    ]);
                }
            }
        }

        return $attachments;
    }

    private function generateViaOpenRouter(string $prompt): ?string
    {
        $model = (string) config('ai.default_image_model');

        try {
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
                ->post('https://openrouter.ai/api/v1/images', [
                    'model' => $model,
                    'prompt' => $prompt,
                    'resolution' => '1K',
                    'quality' => 'low',
                    'n' => 1,
                ]);

            if (! $response->successful()) {
                Log::error('RunGeneratePosterNode: OpenRouter API error', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return null;
            }

            $result = $response->json();
            $base64Image = (string) data_get($result, 'data.0.b64_json', '');

            if ($base64Image === '') {
                return null;
            }

            if (str_starts_with($base64Image, 'data:')) {
                $base64Image = (string) Str::of($base64Image)->after(',');
            }

            $imageBytes = base64_decode($base64Image, true);

            return $imageBytes !== false ? $imageBytes : null;
        } catch (Throwable $e) {
            Log::error('RunGeneratePosterNode: OpenRouter fallback failed', [
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }

    private function sizeToOrientation(string $posterSize): string
    {
        return match ($posterSize) {
            '1080*1350' => 'portrait',
            '1200*630' => 'landscape',
            default => 'square',
        };
    }

    private function resolveUser(AutomationRun $run): User
    {
        if ($run->automation->user_id) {
            return $run->automation->user;
        }

        return $run->automation->workspace->owner;
    }

    /**
     * @param  array<string, mixed>  $config
     * @return array<int, string>
     */
    private function resolveReferenceImages(array $config): array
    {
        $images = data_get($config, 'reference_images', []);

        if (! is_array($images)) {
            return [];
        }

        return array_values(array_filter(array_map(
            fn ($img) => is_string($img) ? trim($img) : null,
            $images,
        )));
    }

    /**
     * @param  array<string, mixed>  $config
     * @return array<int, array{social_account_id: string, meta: array<string, mixed>}>
     */
    private function resolveAccountsConfig(array $config): array
    {
        $accounts = data_get($config, 'accounts');

        if (is_array($accounts)) {
            return array_values(array_map(fn ($entry) => [
                'social_account_id' => (string) data_get($entry, 'social_account_id', ''),
                'meta' => (array) data_get($entry, 'meta', []),
            ], $accounts));
        }

        $legacy = data_get($config, 'social_account_ids', []);

        if (! is_array($legacy)) {
            return [];
        }

        return array_values(array_map(fn ($id) => [
            'social_account_id' => (string) $id,
            'meta' => [],
        ], $legacy));
    }
}
