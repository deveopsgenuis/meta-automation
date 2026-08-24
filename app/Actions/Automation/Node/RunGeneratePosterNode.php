<?php

declare(strict_types=1);

namespace App\Actions\Automation\Node;

use App\Actions\Post\CreatePost;
use App\DataTransferObjects\Automation\NodeRunResult;
use App\Enums\Post\CreatedVia;
use App\Enums\PostPlatform\ContentType;
use App\Models\AutomationRun;
use App\Models\SocialAccount;
use App\Models\User;
use App\Services\Automation\ExpressionResolver;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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

        Log::info('RunGeneratePosterNode: parsed config', [
            'run_id' => $run->id,
            'accounts_count' => count($accountsConfig),
            'poster_size' => $posterSize,
            'poster_count' => $posterCount,
            'template' => $template,
            'apply_brand_voice' => $applyBrandVoice,
            'apply_brand_visuals' => $applyBrandVisuals,
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

        Log::info('RunGeneratePosterNode: resolved accounts', [
            'run_id' => $run->id,
            'requested_account_ids' => $accountIds,
            'active_account_ids' => $activeAccounts->keys()->all(),
            'workspace_id' => $workspace->id,
        ]);

        $orientation = $this->sizeToOrientation($posterSize);

        $platforms = [];
        foreach ($accountsConfig as $entry) {
            $accountId = data_get($entry, 'social_account_id');
            if (! $accountId || ! $activeAccounts->has($accountId)) {
                Log::info('RunGeneratePosterNode: skipping inactive account', [
                    'run_id' => $run->id,
                    'account_id' => $accountId,
                    'is_active' => $activeAccounts->has((string) $accountId),
                ]);

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

        Log::info('RunGeneratePosterNode: resolved platforms', [
            'run_id' => $run->id,
            'platform_count' => count($platforms),
            'platforms' => $platforms,
        ]);

        $generatedPosts = [];

        for ($i = 0; $i < $posterCount; $i++) {
            $posterPrompt = $posterCount > 1
                ? $prompt."\n\nThis is poster ".($i + 1).' of '.$posterCount.'. Vary the design across posters.'
                : $prompt;

            try {
                Log::info('RunGeneratePosterNode: generating poster image', [
                    'run_id' => $run->id,
                    'poster_index' => $i,
                    'orientation' => $orientation,
                    'prompt_length' => strlen($posterPrompt),
                ]);

                $imageBytes = $this->generatePosterImage($posterPrompt, $orientation);

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

                    Log::info('RunGeneratePosterNode: image saved', [
                        'run_id' => $run->id,
                        'poster_index' => $i,
                        'path' => $path,
                    ]);
                }

                if ($run->is_dry_run) {
                    Log::info('RunGeneratePosterNode: dry run, skipping post creation', [
                        'run_id' => $run->id,
                        'poster_index' => $i,
                    ]);

                    $generatedPosts[] = [
                        'post_id' => null,
                        'content' => $posterPrompt,
                        'dry_run' => true,
                        'poster_size' => $posterSize,
                    ];

                    continue;
                }

                $user = $this->resolveUser($run);

                Log::info('RunGeneratePosterNode: creating post', [
                    'run_id' => $run->id,
                    'poster_index' => $i,
                    'user_id' => $user->id,
                    'workspace_id' => $workspace->id,
                    'platform_count' => count($platforms),
                    'has_media' => $mediaItem !== null,
                ]);

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

    private function generatePosterImage(string $prompt, string $orientation): ?string
    {
        $model = (string) config('ai.default_image_model');

        Log::info('RunGeneratePosterNode: generating image via Laravel Ai', [
            'model' => $model,
            'orientation' => $orientation,
            'prompt_length' => strlen($prompt),
        ]);

        try {
            $builder = Image::of($prompt)->quality('low')->timeout(180);

            $builder = match ($orientation) {
                'portrait' => $builder->portrait(),
                'landscape' => $builder->landscape(),
                default => $builder->square(),
            };

            $image = $builder->generate(model: $model);
            $bytes = (string) $image;

            Log::info('RunGeneratePosterNode: Laravel Ai image result', [
                'bytes_length' => strlen($bytes),
                'is_empty' => $bytes === '',
            ]);

            return $bytes !== '' ? $bytes : null;
        } catch (Throwable $e) {
            Log::warning('RunGeneratePosterNode: Laravel Ai image generation failed, trying OpenRouter fallback', [
                'error' => $e->getMessage(),
                'exception_class' => $e::class,
            ]);

            return $this->generateViaOpenRouter($prompt);
        }
    }

    private function generateViaOpenRouter(string $prompt): ?string
    {
        $model = (string) config('ai.default_image_model');

        Log::info('RunGeneratePosterNode: generating image via OpenRouter fallback', [
            'model' => $model,
            'prompt_length' => strlen($prompt),
            'api_key_set' => config('services.openai.api_key') !== '',
        ]);

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

            Log::info('RunGeneratePosterNode: OpenRouter response', [
                'status' => $response->status(),
                'successful' => $response->successful(),
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

            Log::info('RunGeneratePosterNode: OpenRouter parsed response', [
                'has_b64' => $base64Image !== '',
                'b64_length' => strlen($base64Image),
            ]);

            if ($base64Image === '') {
                return null;
            }

            if (str_starts_with($base64Image, 'data:')) {
                $base64Image = (string) Str::of($base64Image)->after(',');
            }

            $imageBytes = base64_decode($base64Image, true);

            Log::info('RunGeneratePosterNode: OpenRouter decoded image', [
                'decode_success' => $imageBytes !== false,
                'bytes_length' => $imageBytes !== false ? strlen($imageBytes) : 0,
            ]);

            return $imageBytes !== false ? $imageBytes : null;
        } catch (Throwable $e) {
            Log::error('RunGeneratePosterNode: OpenRouter fallback failed', [
                'error' => $e->getMessage(),
                'exception_class' => $e::class,
                'exception_file' => $e->getFile(),
                'exception_line' => $e->getLine(),
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
