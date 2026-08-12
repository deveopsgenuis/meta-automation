<?php

declare(strict_types=1);

use App\Ai\Agents\PosterDesignGenerator;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Ai\Files\Base64Image;
use Laravel\Ai\Prompts\AgentPrompt;
use Symfony\Component\HttpFoundation\Response;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->workspace = Workspace::factory()->create(['user_id' => $this->user->id]);
    $this->user->update(['current_workspace_id' => $this->workspace->id]);
});

test('endpoint requires authentication', function () {
    $this->postJson(route('app.posts.ai.poster-design'), ['prompt' => 'hi'])
        ->assertStatus(Response::HTTP_UNAUTHORIZED);
});

test('endpoint validates prompt and allows optional system prompt', function () {
    $this->actingAs($this->user)
        ->postJson(route('app.posts.ai.poster-design'), [])
        ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
        ->assertJsonValidationErrors(['prompt']);
});

test('bulk requests return each item with its original id', function () {
    PosterDesignGenerator::fake([
        'images' => [
            [
                'title' => 'Launch Poster',
                'description' => 'A bold cinematic poster',
                'prompt' => 'Detailed prompt for image generation',
                'style' => 'cinematic',
            ],
            [
                'title' => 'Alternate Poster',
                'description' => 'A minimalist alternate',
                'prompt' => 'Detailed prompt for second image',
                'style' => 'minimalist',
            ],
        ],
    ]);

    $this->actingAs($this->user)
        ->postJson(route('app.posts.ai.poster-design'), [
            'bulk' => true,
            'prompts' => [
                ['id' => 'alpha', 'prompt' => 'Design a launch poster'],
                ['id' => 'beta', 'prompt' => 'Design a follow-up poster'],
            ],
            'system_prompt' => 'Keep it cinematic',
        ])
        ->assertStatus(Response::HTTP_OK)
        ->assertJsonStructure([
            'items' => [
                '*' => [
                    'id',
                    'result' => ['images' => ['*' => ['title', 'description', 'prompt', 'style']]],
                ],
            ],
        ])
        ->assertJsonPath('items.0.id', 'alpha')
        ->assertJsonPath('items.1.id', 'beta');
});

test('stored reference images are converted to base64 agent attachments', function () {
    Storage::fake();

    $file = UploadedFile::fake()->image('brand-reference.jpg', 10, 10);
    $media = $this->workspace->addMedia($file, 'assets');

    PosterDesignGenerator::fake([
        'image' => [
            'title' => 'Launch Poster',
            'description' => 'A bold cinematic poster',
            'prompt' => 'Detailed prompt for image generation',
            'style' => 'cinematic',
        ],
    ]);

    $this->actingAs($this->user)
        ->postJson(route('app.posts.ai.poster-design'), [
            'prompt' => 'Design a launch poster',
            'reference_images' => [$media->path],
        ])
        ->assertOk();

    PosterDesignGenerator::assertPrompted(function (AgentPrompt $prompt) use ($media) {
        $attachment = $prompt->attachments->first();

        return $prompt->attachments->count() === 1
            && $attachment instanceof Base64Image
            && $attachment->base64 === base64_encode(Storage::get($media->path))
            && $attachment->mimeType() === $media->mime_type;
    });
});
