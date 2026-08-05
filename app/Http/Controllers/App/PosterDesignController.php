<?php

declare(strict_types=1);

namespace App\Http\Controllers\App;

use App\Ai\Agents\PosterDesignGenerator;
use App\Http\Requests\App\Ai\GeneratePosterDesignRequest;
use App\Services\Ai\UserAiCreditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
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
                );

                $items[] = [
                    'id' => $id,
                    'result' => $this->normalizeResponse($this->runAgent($agent, $prompt)),
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
        );

        $response = $this->runAgent($agent, $prompt);

        UserAiCreditService::consumeImage($user);

        return response()->json($this->normalizeResponse($response), Response::HTTP_OK);
    }

    private function runAgent(PosterDesignGenerator $agent, string $prompt): mixed
    {
        // Promptable trait provides the `prompt()` method
        return $agent->prompt($prompt);
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
