<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\SocialAccount\Platform;
use App\Models\PlatformCredential;
use App\Models\Workspace;
use Illuminate\Support\Facades\Cache;

class PlatformCredentialService
{
    /**
     * Load platform credentials for a workspace and merge into config.
     * This overrides the global env-based credentials with per-workspace ones.
     */
    public function loadForWorkspace(Workspace $workspace): void
    {
        $credentials = Cache::remember(
            "platform_credentials:{$workspace->id}",
            300,
            fn () => PlatformCredential::query()
                ->where('workspace_id', $workspace->id)
                ->get()
                ->keyBy('platform')
        );

        foreach ($credentials as $platform => $credential) {
            $this->applyCredential($platform, $credential);
        }
    }

    /**
     * Clear cached credentials for a workspace.
     */
    public function clearCache(Workspace $workspace): void
    {
        Cache::forget("platform_credentials:{$workspace->id}");
    }

    /**
     * Get credential for a specific platform and workspace.
     */
    public function getForPlatform(Workspace $workspace, Platform|string $platform): ?PlatformCredential
    {
        $key = $platform instanceof Platform ? $platform->value : $platform;

        return PlatformCredential::query()
            ->where('workspace_id', $workspace->id)
            ->where('platform', $key)
            ->first();
    }

    /**
     * Check if workspace has credentials for a platform.
     */
    public function hasCredentials(Workspace $workspace, Platform|string $platform): bool
    {
        return $this->getForPlatform($workspace, $platform) !== null;
    }

    private function applyCredential(string $platform, PlatformCredential $credential): void
    {
        $configKey = $this->mapPlatformToConfigKey($platform);

        if ($configKey === null) {
            return;
        }

        if ($credential->client_id !== null) {
            config(["services.{$configKey}.client_id" => $credential->client_id]);
        }

        if ($credential->client_secret !== null) {
            config(["services.{$configKey}.client_secret" => $credential->client_secret]);
        }

        if ($credential->callback_url !== null) {
            config(["services.{$configKey}.redirect" => $credential->callback_url]);
        }

        $this->applyPlatformSpecificConfig($platform, $credential);
    }

    private function mapPlatformToConfigKey(string $platform): ?string
    {
        return match ($platform) {
            'linkedin' => 'linkedin-openid',
            'linkedin-page' => 'linkedin-openid',
            'x' => 'x',
            'tiktok' => 'tiktok',
            'youtube' => 'google',
            'facebook' => 'facebook',
            'instagram' => 'instagram',
            'instagram-facebook' => 'facebook',
            'threads' => 'threads',
            'pinterest' => 'pinterest',
            'discord' => 'discord',
            default => null,
        };
    }

    private function applyPlatformSpecificConfig(string $platform, PlatformCredential $credential): void
    {
        $extra = $credential->extra ?? [];

        match ($platform) {
            'bluesky' => [
                'bluesky.default_service' => data_get($extra, 'service', 'https://bsky.social'),
            ],
            'mastodon' => [
                'mastodon.default_instance' => data_get($extra, 'instance', 'https://mastodon.social'),
            ],
            'telegram' => [
                'telegram.bot_token' => $credential->client_secret,
                'telegram.bot_username' => $credential->client_id,
            ],
            'youtube' => [
                'youtube.api' => data_get($extra, 'youtube_data_api', config('trypost.platforms.youtube.api')),
                'youtube.oauth' => data_get($extra, 'youtube_oauth_api', config('trypost.platforms.youtube.oauth')),
            ],
            default => null,
        };
    }
}
