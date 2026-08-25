<?php

declare(strict_types=1);

namespace App\Http\Controllers\App;

use App\Enums\SocialAccount\Platform;
use App\Http\Controllers\Controller;
use App\Models\PlatformCredential;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class PlatformCredentialController extends Controller
{
    public function index(Request $request): Response
    {
        $workspace = $request->user()->currentWorkspace;

        $this->authorize('manageAccounts', $workspace);

        $credentials = PlatformCredential::query()
            ->where('workspace_id', $workspace->id)
            ->get()
            ->map(fn (PlatformCredential $c) => [
                'id' => $c->id,
                'platform' => $c->platform,
                'client_id' => $c->client_id,
                'has_client_secret' => $c->client_secret !== null,
                'callback_url' => $c->callback_url,
                'extra' => $c->extra,
                'created_at' => $c->created_at->toIso8601String(),
            ]);

        $platforms = collect(Platform::cases())->map(fn (Platform $p) => [
            'value' => $p->value,
            'label' => $p->label(),
            'has_credentials' => $credentials->contains('platform', $p->value),
        ]);

        return Inertia::render('accounts/PlatformCredentials', [
            'credentials' => $credentials,
            'platforms' => $platforms,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $workspace = $request->user()->currentWorkspace;

        $this->authorize('manageAccounts', $workspace);

        $validated = $request->validate([
            'platform' => ['required', 'string'],
            'client_id' => ['nullable', 'string'],
            'client_secret' => ['nullable', 'string'],
            'callback_url' => ['nullable', 'string', 'url'],
            'extra' => ['nullable', 'array'],
        ]);

        $credential = PlatformCredential::updateOrCreate(
            [
                'workspace_id' => $workspace->id,
                'platform' => $validated['platform'],
            ],
            [
                'user_id' => $request->user()->id,
                'client_id' => $validated['client_id'] ?? null,
                'client_secret' => $validated['client_secret'] ?? null,
                'callback_url' => $validated['callback_url'] ?? null,
                'extra' => $validated['extra'] ?? null,
            ],
        );

        return response()->json([
            'id' => $credential->id,
            'platform' => $credential->platform,
            'client_id' => $credential->client_id,
            'has_client_secret' => $credential->client_secret !== null,
            'callback_url' => $credential->callback_url,
            'extra' => $credential->extra,
        ]);
    }

    public function destroy(Request $request, PlatformCredential $credential): JsonResponse
    {
        $workspace = $request->user()->currentWorkspace;

        $this->authorize('manageAccounts', $workspace);

        if ($credential->workspace_id !== $workspace->id) {
            abort(403);
        }

        $credential->delete();

        return response()->json(['ok' => true]);
    }

    public function test(Request $request, PlatformCredential $credential): JsonResponse
    {
        $workspace = $request->user()->currentWorkspace;

        $this->authorize('manageAccounts', $workspace);

        if ($credential->workspace_id !== $workspace->id) {
            abort(403);
        }

        $platform = Platform::tryFrom($credential->platform);

        if ($platform === null) {
            return response()->json(['success' => false, 'message' => 'Unknown platform'], 400);
        }

        try {
            return match ($platform) {
                Platform::Facebook, Platform::Instagram, Platform::InstagramFacebook => $this->testFacebook($credential),
                Platform::LinkedIn, Platform::LinkedInPage => $this->testLinkedIn($credential),
                Platform::X => $this->testX($credential),
                Platform::TikTok => $this->testTikTok($credential),
                Platform::YouTube => $this->testYouTube($credential),
                Platform::Threads => $this->testThreads($credential),
                Platform::Pinterest => $this->testPinterest($credential),
                Platform::Bluesky => $this->testBluesky($credential),
                Platform::Mastodon => $this->testMastodon($credential),
                Platform::Telegram => $this->testTelegram($credential),
                Platform::Discord => $this->testDiscord($credential),
            };
        } catch (\Throwable $e) {
            Log::error('PlatformCredential test failed', [
                'platform' => $credential->platform,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Test failed: '.$e->getMessage(),
            ], 500);
        }
    }

    private function testFacebook(PlatformCredential $credential): JsonResponse
    {
        $response = Http::withToken($credential->client_secret ?? '')
            ->get('https://graph.facebook.com/v19.0/me', ['fields' => 'id,name']);

        if ($response->successful()) {
            $data = $response->json();

            return response()->json([
                'success' => true,
                'message' => 'Connected as '.$data['name'] ?? 'Unknown',
                'details' => $data,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Facebook API error: '.$response->body(),
        ], 422);
    }

    private function testLinkedIn(PlatformCredential $credential): JsonResponse
    {
        $response = Http::withToken($credential->client_secret ?? '')
            ->get('https://api.linkedin.com/v2/userinfo');

        if ($response->successful()) {
            $data = $response->json();

            return response()->json([
                'success' => true,
                'message' => 'Connected as '.($data['name'] ?? 'Unknown'),
                'details' => $data,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'LinkedIn API error: '.$response->body(),
        ], 422);
    }

    private function testX(PlatformCredential $credential): JsonResponse
    {
        $response = Http::withToken($credential->client_secret ?? '')
            ->get('https://api.twitter.com/2/users/me');

        if ($response->successful()) {
            $data = $response->json();

            return response()->json([
                'success' => true,
                'message' => 'Connected as '.($data['data']['name'] ?? 'Unknown'),
                'details' => $data,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'X API error: '.$response->body(),
        ], 422);
    }

    private function testTikTok(PlatformCredential $credential): JsonResponse
    {
        $response = Http::withToken($credential->client_secret ?? '')
            ->get('https://open.tiktokapis.com/v2/user/info/', ['fields' => 'display_name,unique_id']);

        if ($response->successful()) {
            $data = $response->json();

            return response()->json([
                'success' => true,
                'message' => 'Connected as '.($data['data']['user']['display_name'] ?? 'Unknown'),
                'details' => $data,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'TikTok API error: '.$response->body(),
        ], 422);
    }

    private function testYouTube(PlatformCredential $credential): JsonResponse
    {
        $response = Http::withToken($credential->client_secret ?? '')
            ->get('https://www.googleapis.com/youtube/v3/channels', [
                'part' => 'snippet',
                'mine' => 'true',
            ]);

        if ($response->successful()) {
            $data = $response->json();
            $channel = $data['items'][0] ?? null;

            return response()->json([
                'success' => true,
                'message' => 'Connected as '.($channel['snippet']['title'] ?? 'Unknown'),
                'details' => $data,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'YouTube API error: '.$response->body(),
        ], 422);
    }

    private function testThreads(PlatformCredential $credential): JsonResponse
    {
        $response = Http::withToken($credential->client_secret ?? '')
            ->get('https://graph.threads.net/v1/me', ['fields' => 'id,username,name']);

        if ($response->successful()) {
            $data = $response->json();

            return response()->json([
                'success' => true,
                'message' => 'Connected as '.($data['username'] ?? 'Unknown'),
                'details' => $data,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Threads API error: '.$response->body(),
        ], 422);
    }

    private function testPinterest(PlatformCredential $credential): JsonResponse
    {
        $response = Http::withToken($credential->client_secret ?? '')
            ->get('https://api.pinterest.com/v5/user_account');

        if ($response->successful()) {
            $data = $response->json();

            return response()->json([
                'success' => true,
                'message' => 'Connected as '.($data['username'] ?? 'Unknown'),
                'details' => $data,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Pinterest API error: '.$response->body(),
        ], 422);
    }

    private function testBluesky(PlatformCredential $credential): JsonResponse
    {
        $service = data_get($credential->extra, 'service', 'https://bsky.social');
        $username = $credential->client_id;
        $password = $credential->client_secret;

        if (! $username || ! $password) {
            return response()->json([
                'success' => false,
                'message' => 'Bluesky requires username and app password',
            ], 422);
        }

        $response = Http::post($service.'/xrpc/com.atproto.server.createSession', [
            'identifier' => $username,
            'password' => $password,
        ]);

        if ($response->successful()) {
            $data = $response->json();

            return response()->json([
                'success' => true,
                'message' => 'Connected as '.$data['handle'] ?? 'Unknown',
                'details' => ['did' => $data['did'] ?? null, 'handle' => $data['handle'] ?? null],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Bluesky error: '.$response->body(),
        ], 422);
    }

    private function testMastodon(PlatformCredential $credential): JsonResponse
    {
        $instance = data_get($credential->extra, 'instance', '');
        $token = $credential->client_secret;

        if (! $instance || ! $token) {
            return response()->json([
                'success' => false,
                'message' => 'Mastodon requires instance URL and access token',
            ], 422);
        }

        $response = Http::withToken($token)
            ->get(rtrim($instance, '/').'/api/v1/accounts/verify_credentials');

        if ($response->successful()) {
            $data = $response->json();

            return response()->json([
                'success' => true,
                'message' => 'Connected as '.($data['username'] ?? 'Unknown'),
                'details' => $data,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Mastodon error: '.$response->body(),
        ], 422);
    }

    private function testTelegram(PlatformCredential $credential): JsonResponse
    {
        $botToken = $credential->client_secret;

        if (! $botToken) {
            return response()->json([
                'success' => false,
                'message' => 'Telegram requires bot token',
            ], 422);
        }

        $response = Http::get("https://api.telegram.org/bot{$botToken}/getMe");

        if ($response->successful()) {
            $data = $response->json();

            return response()->json([
                'success' => true,
                'message' => 'Bot: @'.$data['result']['username'] ?? 'Unknown',
                'details' => $data['result'],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Telegram error: '.$response->body(),
        ], 422);
    }

    private function testDiscord(PlatformCredential $credential): JsonResponse
    {
        $token = $credential->client_secret;

        if (! $token) {
            return response()->json([
                'success' => false,
                'message' => 'Discord requires bot token',
            ], 422);
        }

        $response = Http::withToken($token)
            ->get('https://discord.com/api/v10/users/@me');

        if ($response->successful()) {
            $data = $response->json();

            return response()->json([
                'success' => true,
                'message' => 'Bot: '.$data['username'] ?? 'Unknown',
                'details' => $data,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Discord error: '.$response->body(),
        ], 422);
    }
}
