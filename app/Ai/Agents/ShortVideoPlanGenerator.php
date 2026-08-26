<?php

declare(strict_types=1);

namespace App\Ai\Agents;

use App\Models\Workspace;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Attributes\Temperature;
use Laravel\Ai\Attributes\Timeout;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasStructuredOutput;
use Laravel\Ai\Enums\Lab;
use Laravel\Ai\Promptable;

#[Temperature(0.7)]
#[Timeout(120)]
class ShortVideoPlanGenerator implements Agent, HasStructuredOutput
{
    use Promptable;

    /**
     * @param  array<int, array{date: string, time: string, content: string}>  $existingScheduledPosts
     */
    public function __construct(
        public Workspace $workspace,
        public int $totalVideos = 3,
        public string $startDate = '',
        public ?string $channelPlatform = null,
        public string $instruction = '',
        public string $size = '9:16',
        public string $quality = '720p',
        public array $existingScheduledPosts = [],
        public bool $hasStartFrame = false,
        public bool $hasEndFrame = false,
        public ?string $provider = null,
        public ?string $model = null,
    ) {}

    public function instructions(): string
    {
        return view('prompts.video_design.short_video_plan_generator', [
            'total_videos' => $this->totalVideos,
            'start_date' => $this->startDate ?: now()->format('Y-m-d'),
            'channel_platform' => $this->channelPlatform ?: 'general',
            'brand_description' => $this->workspace->brand_description,
            'brand_voice_traits' => is_array($this->workspace->brand_voice_traits) ? implode(', ', $this->workspace->brand_voice_traits) : '',
            'content_language' => $this->workspace->content_language ?: 'en',
            'instruction' => $this->instruction,
            'size' => $this->size,
            'quality' => $this->quality,
            'existing_scheduled_posts' => $this->existingScheduledPosts,
            'has_start_frame' => $this->hasStartFrame,
            'has_end_frame' => $this->hasEndFrame,
        ])->render();
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'videos' => $schema->array()
                ->items($schema->object(fn ($video) => [
                    'video_description' => $video->string()->description('Creative concept and storyboard description for the short video.')->required(),
                    'video_prompt' => $video->string()->description('Detailed prompt for AI video generation with specific visual content, timing, and text overlays.')->required(),
                    'scheduled_date' => $video->string()->description('Scheduled date formatted as YYYY-MM-DD.')->required(),
                    'scheduled_time' => $video->string()->description('Scheduled time in HH:MM format (24h).')->required(),
                    'post_hashtags' => $video->string()->description('Relevant post hashtags (e.g. #marketing #reels).')->required(),
                ]))
                ->min(1)
                ->max(10)
                ->description('Structured array of planned short video posts.')
                ->required(),
        ];
    }

    public function provider(): Lab
    {
        return match ($this->provider ?? config('ai.default')) {
            'gemini' => Lab::Gemini,
            'openai' => Lab::OpenAI,
            'anthropic' => Lab::Anthropic,
            default => Lab::Gemini,
        };
    }

    public function model(): string
    {
        return (string) ($this->model ?? config('ai.default_text_model', config('ai.default')));
    }
}
