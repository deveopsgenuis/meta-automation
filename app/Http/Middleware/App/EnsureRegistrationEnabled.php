<?php

declare(strict_types=1);

namespace App\Http\Middleware\App;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class EnsureRegistrationEnabled
{
    public function handle(Request $request, Closure $next): mixed
    {
        // In non-self-hosted mode (SaaS), registration is always allowed
        if (! config('trypost.self_hosted')) {
            return $next($request);
        }

        // In self-hosted mode, check if registration is explicitly enabled
        if (config('trypost.registration.enabled')) {
            return $next($request);
        }

        // Otherwise, only allow registration via invite
        if ($inviteId = $request->query('invite') ?? $request->session()->get('pending_invite_id')) {
            $request->session()->put('pending_invite_id', $inviteId);

            return $next($request);
        }

        throw new NotFoundHttpException;
    }
}
