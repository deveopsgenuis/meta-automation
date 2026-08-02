<?php

declare(strict_types=1);

use App\Models\User;
use App\Models\Workspace;
use Illuminate\Support\Facades\Bus;
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

test('endpoint returns a structured response payload', function () {
    Bus::fake();

    $this->actingAs($this->user)
        ->postJson(route('app.posts.ai.poster-design'), [
            'prompt' => 'Design a launch poster',
            'system_prompt' => 'Keep it cinematic',
            'bulk' => true,
        ])
        ->assertStatus(Response::HTTP_OK)
        ->assertJsonStructure(['image', 'style']);
});
