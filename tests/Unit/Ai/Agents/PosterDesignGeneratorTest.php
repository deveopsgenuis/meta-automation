<?php

declare(strict_types=1);

use App\Ai\Agents\PosterDesignGenerator;
use App\Models\Workspace;
use Illuminate\JsonSchema\JsonSchemaTypeFactory;

test('instructions include the provided system prompt and user prompt', function () {
    $workspace = Workspace::factory()->make();
    $agent = new PosterDesignGenerator(
        workspace: $workspace,
        prompt: 'Create a bold tech poster for a SaaS launch',
        systemPrompt: 'Generate a sleek futuristic poster with clean composition',
    );

    $instructions = $agent->instructions();

    expect($instructions)->toContain('Generate a sleek futuristic poster with clean composition');
    expect($instructions)->toContain('Create a bold tech poster for a SaaS launch');
});

test('single generation schema returns one image payload', function () {
    $workspace = Workspace::factory()->make();
    $agent = new PosterDesignGenerator(workspace: $workspace, bulk: false);

    $schemaFactory = new JsonSchemaTypeFactory;
    $schema = $agent->schema($schemaFactory);

    expect($schema)->toHaveKey('image');
    expect($schema)->not->toHaveKey('images');
});

test('bulk generation schema returns multiple images', function () {
    $workspace = Workspace::factory()->make();
    $agent = new PosterDesignGenerator(workspace: $workspace, bulk: true);

    $schemaFactory = new JsonSchemaTypeFactory;
    $schema = $agent->schema($schemaFactory);

    expect($schema)->toHaveKey('images');
    expect($schema)->not->toHaveKey('image');
});
