<?php

declare(strict_types=1);

namespace App\Http\Controllers\App;

use App\Ai\Agents\PosterDesignGenerator;
use App\Http\Requests\App\Ai\GeneratePosterDesignRequest;
use App\Models\Media;
use App\Services\Ai\UserAiCreditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravel\Ai\Files\Base64Image;
use Laravel\Ai\Files\Image as AiImage;
use Symfony\Component\HttpFoundation\Response;

class PosterDesignController extends Controller
{
    public function store(GeneratePosterDesignRequest $request): JsonResponse
    {
        $workspace = $request->user()->currentWorkspace;

        $this->authorize('createPost', $workspace);

        $gate = Gate::inspect('useAi', $workspace->account);
        if ($gate->denied()) {
            return response()->json(['message' => $gate->message()], Response::HTTP_PAYMENT_REQUIRED);
        }

        $user = $request->user();
        $bulk = $request->boolean('bulk', false);
        $systemPrompt = $request->string('system_prompt')->toString();
        $provider = $request->string('provider')->toString() ?: null;
        $referenceImages = $request->input('reference_images', []);

        if ($bulk) {
            $prompts = (array) $request->input('prompts', []);
            $requiredCredits = count($prompts);
            $remaining = UserAiCreditService::remainingImage($user);

            if ($remaining < $requiredCredits) {
                return response()->json([
                    'message' => "Not enough image credits. Required: {$requiredCredits}, remaining: {$remaining}.",
                    'remaining' => $remaining,
                ], Response::HTTP_PAYMENT_REQUIRED);
            }

            $items = [];

            foreach ($prompts as $item) {
                $prompt = (string) data_get($item, 'prompt', '');
                $id = (string) data_get($item, 'id', '');

                $agent = new PosterDesignGenerator(
                    workspace: $workspace,
                    prompt: $prompt,
                    systemPrompt: $systemPrompt,
                    bulk: true,
                    provider: $provider,
                    referenceImages: $referenceImages,
                );

                $items[] = [
                    'id' => $id,
                    'result' => $this->normalizeResponse($this->runAgent($agent, $prompt, $referenceImages)),
                ];

                UserAiCreditService::consumeImage($user);
            }

            return response()->json(['items' => $items], Response::HTTP_OK);
        }

        $remaining = UserAiCreditService::remainingImage($user);
        if ($remaining < 1) {
            return response()->json([
                'message' => 'No image credits remaining.',
                'remaining' => 0,
            ], Response::HTTP_PAYMENT_REQUIRED);
        }

        $prompt = $request->string('prompt')->toString();
        $agent = new PosterDesignGenerator(
            workspace: $workspace,
            prompt: $prompt,
            systemPrompt: $systemPrompt,
            bulk: false,
            provider: $provider,
            referenceImages: $referenceImages,
        );

        $response = $this->runAgent($agent, $prompt, $referenceImages);

        UserAiCreditService::consumeImage($user);

        return response()->json($this->normalizeResponse($response), Response::HTTP_OK);
    }

    private function runAgent(PosterDesignGenerator $agent, string $prompt, array $referenceImages = []): mixed
    {
        $attachments = $this->parseReferenceImages($referenceImages);

        Log::info('PosterDesignController: running agent', [
            'reference_images_input_count' => count($referenceImages),
            'attachments_created_count' => count($attachments),
            'prompt_length' => strlen($prompt),
        ]);

        // Promptable trait provides the `prompt()` method
        return $agent->prompt($prompt, $attachments);
    }

    /**
     * Parse an array of reference image strings (which may be file paths like `medias/xxx.jpg`,
     * Media UUIDs, browser-produced data URIs like `data:image/png;base64,...`, or raw base64)
     * into Base64Image attachments.
     *
     * @param  array<int, string>  $referenceImages
     * @return array<int, Base64Image>
     */
    private function parseReferenceImages(array $referenceImages): array
    {
        $attachments = [];

        foreach ($referenceImages as $input) {
            if (! is_string($input) || trim($input) === '') {
                continue;
            }

            $input = trim($input);

            // 1. Check if $input is a stored file path (e.g. "medias/xxxx.jpg")
            if (Storage::exists($input) || Storage::disk('public')->exists($input)) {
                $disk = Storage::exists($input) ? Storage::disk() : Storage::disk('public');
                $bytes = $disk->get($input);
                $mimeType = $disk->mimeType($input) ?: 'image/jpeg';
                $base64 = base64_encode($bytes);

                $attachments[] = AiImage::fromBase64($base64, $mimeType);

                Log::info('PosterDesignController: parsed reference image from storage', [
                    'input' => substr($input, 0, 80),
                    'mime_type' => $mimeType,
                    'size' => strlen($bytes),
                ]);

                continue;
            }

            // 2. Check if $input is a Media record ID
            if (Str::isUuid($input)) {
                $media = Media::query()->find($input);
                if ($media) {
                    $disk = Storage::exists($media->path) ? Storage::disk() : (Storage::disk('public')->exists($media->path) ? Storage::disk('public') : null);
                    if ($disk) {
                        $bytes = $disk->get($media->path);
                        $mimeType = $media->mime_type ?: ($disk->mimeType($media->path) ?: 'image/jpeg');
                        $base64 = base64_encode($bytes);

                        $attachments[] = AiImage::fromBase64($base64, $mimeType);

                        Log::info('PosterDesignController: parsed reference image from Media UUID', [
                            'media_id' => $media->id,
                            'mime_type' => $mimeType,
                            'size' => strlen($bytes),
                        ]);

                        continue;
                    }
                }
            }

            // 3. Fallback: Data URI (data:image/png;base64,...)
            if (str_starts_with($input, 'data:')) {
                if (preg_match('/^data:([a-zA-Z0-9\/+\-]+);base64,(.+)$/s', $input, $matches)) {
                    $attachments[] = AiImage::fromBase64($matches[2], $matches[1]);

                    Log::info('PosterDesignController: parsed reference image from data URI', [
                        'mime_type' => $matches[1],
                        'size' => strlen($matches[2]),
                    ]);
                }

                continue;
            }

            // 4. Fallback: Raw base64 string
            $attachments[] = AiImage::fromBase64($input);

            Log::info('PosterDesignController: parsed reference image from raw base64', [
                'size' => strlen($input),
            ]);
        }

        Log::info('PosterDesignController: parseReferenceImages complete', [
            'input_count' => count($referenceImages),
            'output_count' => count($attachments),
        ]);

        return $attachments;
    }

    private function normalizeResponse(mixed $response): array
    {
        if (is_array($response)) {
            return $response;
        }

        if (is_object($response)) {
            if (method_exists($response, 'toArray')) {
                return $response->toArray();
            }

            if ($response instanceof \JsonSerializable) {
                return $response->jsonSerialize();
            }
        }

        if ($response instanceof \Stringable) {
            return ['output' => (string) $response];
        }

        return ['output' => $response];
    }
}
