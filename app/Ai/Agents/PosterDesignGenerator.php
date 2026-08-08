<?php

declare(strict_types=1);

namespace App\Ai\Agents;

use App\Models\Workspace;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Attributes\Temperature;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasStructuredOutput;
use Laravel\Ai\Enums\Lab;
use Laravel\Ai\Promptable;

#[Temperature(0.7)]
class PosterDesignGenerator implements Agent, HasStructuredOutput
{
    use Promptable;

    public function __construct(
        public Workspace $workspace,
        public string $prompt = '',
        public string $systemPrompt = '',
        public bool $bulk = false,
        public ?string $provider = null,
        public ?string $model = null,
        public array $referenceImages = [],
    ) {}

    public function instructions(): string
    {
        return view('prompts.poster_design.generator', [
            'prompt' => $this->prompt,
            'system_prompt' => $this->systemPrompt,
            'content_language' => $this->workspace->content_language ?: 'en',
            'bulk' => $this->bulk,
            'reference_images' => $this->referenceImages,
        ])->render();
    }

    public function schema(JsonSchema $schema): array
    {
        if ($this->bulk) {
            return [
                'images' => $schema->array()
                    ->items($schema->object(fn ($image) => [
                        'title' => $image->string()->description('Short title for the poster concept.')->required(),
                        'description' => $image->string()->description('Concise description of the poster visual direction.')->required(),
                        'prompt' => $image->string()->description('Detailed image-generation prompt for this poster concept.')->required(),
                        'style' => $image->string()->description('Poster style such as cinematic, minimalist, editorial, or bold.')->required(),
                    ]))
                    ->min(2)
                    ->max(4)
                    ->description('Two to four poster concepts for bulk generation.')
                    ->required(),
            ];
        }

        return [
            'image' => $schema->object(fn ($image) => [
                'title' => $image->string()->description('Short title for the poster concept.')->required(),
                'description' => $image->string()->description('Concise description of the poster visual direction.')->required(),
                'prompt' => $image->string()->description('Detailed image-generation prompt for the poster.')->required(),
                'style' => $image->string()->description('Poster style such as cinematic, minimalist, editorial, or bold.')->required(),
            ])->description('A single poster concept ready for image generation.')->required(),
        ];
    }

    public function provider(): Lab
    {
        return match ($this->provider ?? config('ai.default_for_images')) {
            'gemini' => Lab::Gemini,
            'openai' => Lab::OpenAI,
            default => Lab::Gemini,
        };
    }

    public function model(): string
    {
        return (string) ($this->model ?? config('ai.default_image_model', config('ai.default_text_model')));
    }
}
