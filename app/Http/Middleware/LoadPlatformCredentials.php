<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Services\PlatformCredentialService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LoadPlatformCredentials
{
    public function __construct(
        private PlatformCredentialService $credentialService,
    ) {}

    public function handle(Request $request, Closure $next): Response
    {
        $workspace = $request->user()?->currentWorkspace;

        if ($workspace !== null) {
            $this->credentialService->loadForWorkspace($workspace);
        }

        return $next($request);
    }
}
