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
class PostPlanGenerator implements Agent, HasStructuredOutput
{
    use Promptable;

    public function __construct(
        public Workspace $workspace,
        public int $totalPosts = 7,
        public string $startDate = '',
        public ?string $channelPlatform = null,
        public string $instruction = '',
        public ?string $provider = null,
        public ?string $model = null,
    ) {}

    public function instructions(): string
    {
        return view('prompts.poster_design.plan_generator', [
            'total_posts' => $this->totalPosts,
            'start_date' => $this->startDate ?: now()->format('Y-m-d'),
            'channel_platform' => $this->channelPlatform ?: 'general',
            'brand_description' => $this->workspace->brand_description,
            'brand_voice_traits' => is_array($this->workspace->brand_voice_traits) ? implode(', ', $this->workspace->brand_voice_traits) : '',
            'content_language' => $this->workspace->content_language ?: 'en',
            'instruction' => $this->instruction,
        ])->render();
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'posts' => $schema->array()
                ->items($schema->object(fn ($post) => [
                    'post_description' => $post->string()->description('Detailed concept and content description for the post idea.')->required(),
                    'post_hashtags' => $post->string()->description('Related post hashtags (e.g. #marketing #design).')->required(),
                    'post_visual_prompt' => $post->string()->description('Visual prompt that will be used to generate the poster design.')->required(),
                    'poster_size' => $post->string()->description('Poster dimensions format ex: 1080*1080.')->required(),
                    'scheduled_date' => $post->string()->description('Scheduled date formatted as YYYY-MM-DD.')->required(),
                ]))
                ->min(1)
                ->description('Structured array of planned poster posts.')
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
