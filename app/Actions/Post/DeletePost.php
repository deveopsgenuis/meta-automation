<?php

declare(strict_types=1);

namespace App\Actions\Post;

use App\Enums\PostPlatform\Status as PostPlatformStatus;
use App\Enums\SocialAccount\Platform;
use App\Events\PostDeleted;
use App\Models\Post;
use App\Models\PostPlatform;
use App\Services\Social\BlueskyPublisher;
use App\Services\Social\Discord\DiscordPublisher;
use App\Services\Social\FacebookPublisher;
use App\Services\Social\InstagramPublisher;
use App\Services\Social\LinkedInPagePublisher;
use App\Services\Social\LinkedInPublisher;
use App\Services\Social\MastodonPublisher;
use App\Services\Social\PinterestPublisher;
use App\Services\Social\Telegram\TelegramPublisher;
use App\Services\Social\ThreadsPublisher;
use App\Services\Social\TikTokPublisher;
use App\Services\Social\XPublisher;
use App\Services\Social\YouTubePublisher;
use Illuminate\Support\Facades\Log;

use function Illuminate\Support\data_get;

class DeletePost
{
    public static function execute(Post $post): void
    {
        $postId = $post->id;
        $workspaceId = $post->workspace_id;

        // Delete from connected social platforms before deleting the post
        self::deleteFromSocialPlatforms($post);

        $post->delete();

        PostDeleted::dispatch($postId, $workspaceId);
    }

    private static function deleteFromSocialPlatforms(Post $post): void
    {
        $enabledPlatforms = $post->postPlatforms()
            ->where('enabled', true)
            ->where('status', PostPlatformStatus::Published)
            ->whereNotNull('platform_post_id')
            ->with('socialAccount')
            ->get();

        foreach ($enabledPlatforms as $postPlatform) {
            $platform = $postPlatform->platform;
            $platformPostId = $postPlatform->platform_post_id;
            $socialAccount = $postPlatform->socialAccount;

            if (! $socialAccount || ! $platformPostId) {
                continue;
            }

            try {
                match ($platform) {
                    Platform::Facebook, Platform::InstagramFacebook => self::deleteFromFacebook($postPlatform),
                    Platform::Instagram => self::deleteFromInstagram($postPlatform),
                    Platform::Threads => self::deleteFromThreads($postPlatform),
                    Platform::X => self::deleteFromX($postPlatform),
                    Platform::LinkedIn => self::deleteFromLinkedIn($postPlatform),
                    Platform::LinkedInPage => self::deleteFromLinkedInPage($postPlatform),
                    Platform::TikTok => self::deleteFromTikTok($postPlatform),
                    Platform::YouTube => self::deleteFromYouTube($postPlatform),
                    Platform::Pinterest => self::deleteFromPinterest($postPlatform),
                    Platform::Bluesky => self::deleteFromBluesky($postPlatform),
                    Platform::Mastodon => self::deleteFromMastodon($postPlatform),
                    Platform::Telegram => self::deleteFromTelegram($postPlatform),
                    Platform::Discord => self::deleteFromDiscord($postPlatform),
                    default => null,
                };
            } catch (\Throwable $e) {
                // Log the error but don't fail the whole deletion
                Log::error('Failed to delete post from social platform', [
                    'post_id' => $post->id,
                    'post_platform_id' => $postPlatform->id,
                    'platform' => $platform->value,
                    'platform_post_id' => $platformPostId,
                    'error' => $e->getMessage(),
                ]);
            }
        }
    }

    private static function deleteFromFacebook(PostPlatform $postPlatform): void
    {
        $publisher = app(FacebookPublisher::class);
        $publisher->deletePost($postPlatform->platform_post_id, $postPlatform->socialAccount->access_token);
    }

    private static function deleteFromInstagram(PostPlatform $postPlatform): void
    {
        $publisher = app(InstagramPublisher::class);
        $publisher->deletePost($postPlatform->platform_post_id, $postPlatform->socialAccount->access_token);
    }

    private static function deleteFromThreads(PostPlatform $postPlatform): void
    {
        $publisher = app(ThreadsPublisher::class);
        $publisher->deletePost($postPlatform->platform_post_id, $postPlatform->socialAccount->access_token);
    }

    private static function deleteFromX(PostPlatform $postPlatform): void
    {
        $publisher = app(XPublisher::class);
        $publisher->deletePost($postPlatform->platform_post_id, $postPlatform->socialAccount->access_token);
    }

    private static function deleteFromLinkedIn(PostPlatform $postPlatform): void
    {
        $publisher = app(LinkedInPublisher::class);
        $publisher->deletePost($postPlatform->platform_post_id, $postPlatform->socialAccount->access_token);
    }

    private static function deleteFromLinkedInPage(PostPlatform $postPlatform): void
    {
        $publisher = app(LinkedInPagePublisher::class);
        $publisher->deletePost($postPlatform->platform_post_id, $postPlatform->socialAccount->access_token);
    }

    private static function deleteFromTikTok(PostPlatform $postPlatform): void
    {
        $publisher = app(TikTokPublisher::class);
        $publisher->deletePost($postPlatform->platform_post_id, $postPlatform->socialAccount->access_token);
    }

    private static function deleteFromYouTube(PostPlatform $postPlatform): void
    {
        $publisher = app(YouTubePublisher::class);
        $publisher->deletePost($postPlatform->platform_post_id, $postPlatform->socialAccount->access_token);
    }

    private static function deleteFromPinterest(PostPlatform $postPlatform): void
    {
        $publisher = app(PinterestPublisher::class);
        $publisher->deletePost($postPlatform->platform_post_id, $postPlatform->socialAccount->access_token);
    }

    private static function deleteFromBluesky(PostPlatform $postPlatform): void
    {
        $publisher = app(BlueskyPublisher::class);
        $service = $postPlatform->socialAccount->meta['service'] ?? config('trypost.platforms.bluesky.default_service');
        $publisher->deletePost($postPlatform->platform_post_id, $postPlatform->socialAccount->access_token, $postPlatform->socialAccount->platform_user_id, $service);
    }

    private static function deleteFromMastodon(PostPlatform $postPlatform): void
    {
        $publisher = app(MastodonPublisher::class);
        $instance = $postPlatform->socialAccount->meta['instance'] ?? config('trypost.platforms.mastodon.default_instance');
        $publisher->deletePost($postPlatform->platform_post_id, $postPlatform->socialAccount->access_token, $instance);
    }

    private static function deleteFromTelegram(PostPlatform $postPlatform): void
    {
        $publisher = app(TelegramPublisher::class);
        $chatId = (string) data_get($postPlatform->socialAccount->meta, 'chat_id');
        $publisher->deletePost($postPlatform->platform_post_id, $chatId);
    }

    private static function deleteFromDiscord(PostPlatform $postPlatform): void
    {
        $publisher = app(DiscordPublisher::class);
        $channelId = (string) data_get($postPlatform->meta, 'channel_id');
        $publisher->deletePost($postPlatform->platform_post_id, $channelId);
    }
}
