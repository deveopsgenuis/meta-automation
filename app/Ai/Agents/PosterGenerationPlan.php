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
class PosterGenerationPlan implements Agent, HasStructuredOutput
{
    use Promptable;

    /**
     * @param  array<int, mixed>  $referenceImages
     */
    public function __construct(
        public Workspace $workspace,
        public string $userPrompt = '',
        public string $posterSize = '1080*1080',
        public array $referenceImages = [],
        public ?string $provider = null,
        public ?string $model = null,
    ) {}

    public function instructions(): string
    {
        return view('prompts.poster_design.poster_generation_plan', [
            'user_prompt' => $this->userPrompt,
            'brand_description' => $this->workspace->brand_description,
            'brand_voice_traits' => is_array($this->workspace->brand_voice_traits) ? implode(', ', $this->workspace->brand_voice_traits) : '',
            'content_language' => $this->workspace->content_language ?: 'en',
            'poster_size' => $this->posterSize,
            'reference_images' => $this->referenceImages,
        ])->render();
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'visual_prompt' => $schema->string()->description('The detailed AI image generation prompt for the poster. Must describe a complete finished poster with text, layout, graphics, palette, typography, and composition.')->required(),
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
