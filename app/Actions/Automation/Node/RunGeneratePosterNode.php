<?php

declare(strict_types=1);

namespace App\Actions\Automation\Node;

use App\Actions\Post\CreatePost;
use App\Ai\Agents\PosterGenerationPlan;
use App\DataTransferObjects\Automation\NodeRunResult;
use App\Enums\Media\Source;
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
                $plan = $this->generatePlan(
                    workspace: $workspace,
                    userPrompt: $posterPrompt,
                    posterSize: $posterSize,
                    referenceImages: $referenceImages,
                );

                $visualPrompt = $plan['visual_prompt'];
                $postDescription = $plan['post_description'];
                $postHashtags = $plan['post_hashtags'];

                Log::info('RunGeneratePosterNode: plan generated', [
                    'run_id' => $run->id,
                    'poster_index' => $i,
                    'visual_prompt_length' => strlen($visualPrompt),
                    'post_description_length' => strlen($postDescription),
                ]);

                $imagePath = $this->generatePosterImage($visualPrompt, $orientation, $referenceImages);

                Log::info('RunGeneratePosterNode: image generation result', [
                    'run_id' => $run->id,
                    'poster_index' => $i,
                    'image_generated' => $imagePath !== null,
                    'image_path' => $imagePath,
                ]);

                if ($imagePath !== null) {
                    RecordAiUsage::recordImage(
                        workspace: $workspace,
                        provider: 'openrouter',
                        model: (string) config('ai.default_image_model'),
                        metadata: ['source' => 'automation', 'node' => 'generate_poster'],
                    );
                }

                $mediaItem = null;
                if ($imagePath !== null) {
                    $mimeType = Storage::disk('public')->mimeType($imagePath) ?: 'image/png';
                    $mediaRecord = $workspace->addMediaFromStoredPath(
                        storagePath: $imagePath,
                        originalFilename: basename($imagePath),
                        mimeType: $mimeType,
                        size: Storage::disk('public')->size($imagePath),
                        collection: 'ai-generated',
                        meta: ['source' => Source::Ai->value],
                    );

                    $mediaItem = [
                        'id' => $mediaRecord->id,
                        'path' => $mediaRecord->path,
                        'url' => Storage::disk('public')->url($mediaRecord->path),
                        'type' => 'image',
                        'mime_type' => $mimeType,
                        'source' => Source::Ai->value,
                    ];
                }

                $fullContent = trim($postDescription."\n\n".$postHashtags);

                if ($run->is_dry_run) {
                    $generatedPosts[] = [
                        'post_id' => null,
                        'content' => $fullContent,
                        'visual_prompt' => $visualPrompt,
                        'dry_run' => true,
                        'poster_size' => $posterSize,
                    ];

                    continue;
                }

                $user = $this->resolveUser($run);

                $post = CreatePost::execute($workspace, $user, [
                    'content' => $fullContent,
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
                    'content' => $fullContent,
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
    ): array {
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

        RecordAiUsage::recordText(
            workspace: $workspace,
            promptTokens: $response->usage->promptTokens,
            completionTokens: $response->usage->completionTokens,
            provider: (string) config('ai.default'),
            model: (string) config('ai.default_text_model'),
            metadata: ['agent' => 'poster_generation_plan', 'source' => 'automation'],
        );

        $result = [
            'post_description' => (string) data_get($structured, 'post_description', $userPrompt),
            'post_hashtags' => (string) data_get($structured, 'post_hashtags', ''),
            'visual_prompt' => (string) data_get($structured, 'visual_prompt', $userPrompt),
        ];

        Log::info('RunGeneratePosterNode: plan agent response', [
            'visual_prompt_length' => strlen($result['visual_prompt']),
            'post_description_length' => strlen($result['post_description']),
            'has_hashtags' => $result['post_hashtags'] !== '',
            'prompt_tokens' => $response->usage->promptTokens ?? null,
            'completion_tokens' => $response->usage->completionTokens ?? null,
        ]);

        return $result;
    }

    private function generatePosterImage(string $prompt, string $orientation, array $referenceImages = []): ?string
    {
        $model = (string) config('ai.default_image_model');

        Log::info('RunGeneratePosterNode: generating image via OpenRouter', [
            'model' => $model,
            'orientation' => $orientation,
            'prompt_length' => strlen($prompt),
            'reference_images_count' => count($referenceImages),
        ]);

        $effectivePrompt = $prompt;

        if (count($referenceImages) > 0) {
            $effectivePrompt = 'IMPORTANT: The reference image(s) attached are exact assets (logos, brand marks, product images, or media) that must appear in the poster exactly as provided - do not stylize, recolor, distort, or reinterpret them in any way. Composite them faithfully into the design as locked elements. '.$prompt;
        }

        $aspectRatio = match ($orientation) {
            'portrait' => '2:3',
            'landscape' => '3:2',
            default => '1:1',
        };

        $payload = array_filter([
            'model' => $model,
            'prompt' => $effectivePrompt,
            'resolution' => '1K',
            'aspect_ratio' => $aspectRatio,
            'quality' => 'low',
            'n' => 1,
            'input_references' => $this->formatReferenceImages($referenceImages),
        ], fn (mixed $value) => $value !== null && $value !== []);

        Log::info('RunGeneratePosterNode: OpenRouter payload', [
            'payload_keys' => array_keys($payload),
            'has_references' => isset($payload['input_references']),
            'reference_count' => isset($payload['input_references']) ? count($payload['input_references']) : 0,
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
                ->post('https://openrouter.ai/api/v1/images', $payload);

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
                Log::warning('RunGeneratePosterNode: no b64_json in OpenRouter response', [
                    'response_keys' => is_array($result) ? array_keys($result) : [],
                ]);

                return null;
            }

            if (str_starts_with($base64Image, 'data:')) {
                $base64Image = (string) Str::of($base64Image)->after(',');
            }

            $imageBytes = base64_decode($base64Image, true);

            if ($imageBytes === false) {
                Log::warning('RunGeneratePosterNode: failed to decode OpenRouter image');

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

            Log::info('RunGeneratePosterNode: image saved', [
                'path' => $path,
                'media_type' => $mediaType,
                'size' => strlen($imageBytes),
            ]);

            return $path;
        } catch (Throwable $e) {
            Log::error('RunGeneratePosterNode: OpenRouter image generation failed', [
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * @param  array<int, string>  $referenceImages
     * @return array<int, array{type: string, image_url: array{url: string}}>
     */
    private function formatReferenceImages(array $referenceImages): array
    {
        return array_values(array_filter(array_map(
            fn (string $referenceImage) => $this->formatReferenceImage($referenceImage),
            $referenceImages,
        )));
    }

    /**
     * @return array{type: string, image_url: array{url: string}}|null
     */
    private function formatReferenceImage(string $reference): ?array
    {
        $reference = trim($reference);

        if ($reference === '') {
            return null;
        }

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

        Log::warning('RunGeneratePosterNode: unable to format reference image', [
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

    /**
     * Parse reference images into Base64Image attachments for the plan agent (vision).
     *
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
