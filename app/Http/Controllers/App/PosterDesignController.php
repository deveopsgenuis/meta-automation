<?php

declare(strict_types=1);

namespace App\Http\Controllers\App;

use App\Ai\Agents\PosterDesignGenerator;
use App\Http\Requests\App\Ai\GeneratePosterDesignRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use RuntimeException;
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

        $agent = new PosterDesignGenerator(
            workspace: $workspace,
            prompt: $request->string('prompt')->toString(),
            systemPrompt: $request->string('system_prompt')->toString(),
            bulk: $request->boolean('bulk', false),
            provider: $request->string('provider')->toString() ?: null,
        );

        $response = $this->runAgent($agent, $request->string('prompt')->toString());

        return response()->json($this->normalizeResponse($response), Response::HTTP_OK);
    }

    private function runAgent(PosterDesignGenerator $agent, string $prompt): mixed
    {
        if (method_exists($agent, 'respond')) {
            return $agent->respond($prompt);
        }

        foreach (['run', 'ask', 'generate', 'execute'] as $method) {
            if (method_exists($agent, $method)) {
                return $agent->{$method}($prompt);
            }
        }

        throw new RuntimeException('The poster design agent does not expose a supported execution method.');
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
