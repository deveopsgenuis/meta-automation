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
        $context = $run->resolverContext();
        $prompt = $this->resolver->resolve((string) data_get($config, 'prompt_template', ''), $context);

        $workspace = $run->automation->workspace;

        $accountsConfig = $this->resolveAccountsConfig($config);
        $posterSize = (string) data_get($config, 'poster_size', '1080*1080');
        $posterCount = (int) data_get($config, 'poster_count', 1);
        $template = (string) data_get($config, 'template', 'single');
        $applyBrandVoice = (bool) data_get($config, 'use_brand_voice', true);
        $applyBrandVisuals = (bool) data_get($config, 'use_brand_visuals', true);

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
            $platforms[] = [
                'social_account_id' => $accountId,
                'content_type' => ContentType::InstagramFeed->value,
                'meta' => data_get($entry, 'meta', []),
            ];
        }

        $generatedPosts = [];

        for ($i = 0; $i < $posterCount; $i++) {
            $posterPrompt = $posterCount > 1
                ? $prompt."\n\nThis is poster ".($i + 1).' of '.$posterCount.'. Vary the design across posters.'
                : $prompt;

            try {
                $imageBytes = $this->generatePosterImage($posterPrompt, $orientation);

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

                $generatedPosts[] = [
                    'post_id' => $post->id,
                    'content' => $posterPrompt,
                    'poster_size' => $posterSize,
                    'post_url' => route('app.posts.show', $post->id),
                ];
            } catch (Throwable $e) {
                Log::error('RunGeneratePosterNode: poster generation failed', [
                    'poster_index' => $i,
                    'error' => $e->getMessage(),
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

        try {
            $builder = Image::of($prompt)->quality('low')->timeout(180);

            $builder = match ($orientation) {
                'portrait' => $builder->portrait(),
                'landscape' => $builder->landscape(),
                default => $builder->square(),
            };

            $image = $builder->generate(model: $model);
            $bytes = (string) $image;

            return $bytes !== '' ? $bytes : null;
        } catch (Throwable $e) {
            Log::warning('RunGeneratePosterNode: image generation failed, trying OpenRouter fallback', [
                'error' => $e->getMessage(),
            ]);

            return $this->generateViaOpenRouter($prompt);
        }
    }

    private function generateViaOpenRouter(string $prompt): ?string
    {
        try {
            $model = (string) config('ai.default_image_model');

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
