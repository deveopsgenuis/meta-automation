<?php

declare(strict_types=1);

use App\Ai\Agents\PostPlanGenerator;
use App\Jobs\Ai\GeneratePosterBatchItem;
use App\Models\Account;
use App\Models\PosterBatch;
use App\Models\PosterBatchItem;
use App\Models\SocialAccount;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Queue;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->account = Account::factory()->create(['user_id' => $this->user->id]);
    $this->workspace = Workspace::factory()->create([
        'account_id' => $this->account->id,
        'brand_description' => 'A luxury eco-friendly clothing brand',
        'brand_voice_traits' => ['sustainable', 'modern', 'elegant'],
        'content_language' => 'en',
    ]);

    $this->user->workspaces()->attach($this->workspace, ['role' => 'owner']);
    $this->user->update(['current_workspace_id' => $this->workspace->id]);

    $this->socialAccount = SocialAccount::factory()->create([
        'workspace_id' => $this->workspace->id,
        'platform' => 'instagram',
        'is_active' => true,
    ]);
});

it('generates a post plan successfully', function () {
    PostPlanGenerator::fake([
        'posts' => [
            [
                'post_description' => 'Eco-friendly summer collection showcase',
                'post_hashtags' => '#sustainable #fashion',
                'post_visual_prompt' => 'Minimalist linen dress on sunlit background',
                'poster_size' => '1080x1080',
                'scheduled_date' => '2026-08-04',
            ],
        ],
    ]);

    $response = $this->actingAs($this->user)
        ->postJson(route('app.posts.ai.plan.generate'), [
            'total_posts' => 1,
            'start_date' => '2026-08-04',
            'social_account_id' => $this->socialAccount->id,
            'instruction' => 'Focus on summer dresses',
        ]);

    $response->assertSuccessful()
        ->assertJsonStructure([
            'posts' => [
                '*' => [
                    'post_description',
                    'post_hashtags',
                    'post_visual_prompt',
                    'poster_size',
                    'scheduled_date',
                ],
            ],
        ]);
});

it('validates generate plan inputs', function () {
    $response = $this->actingAs($this->user)
        ->postJson(route('app.posts.ai.plan.generate'), [
            'total_posts' => 100, // max is 31
        ]);

    $response->assertUnprocessable()
        ->assertJsonValidationErrors(['total_posts']);
});

it('executes a post plan creating a PosterBatch and queueing jobs', function () {
    Queue::fake();

    $plan = [
        [
            'post_description' => 'Post 1 description',
            'post_hashtags' => '#tag1',
            'post_visual_prompt' => 'Prompt 1',
            'poster_size' => '1080x1080',
            'scheduled_date' => '2026-08-04',
        ],
        [
            'post_description' => 'Post 2 description',
            'post_hashtags' => '#tag2',
            'post_visual_prompt' => 'Prompt 2',
            'poster_size' => '1080x1080',
            'scheduled_date' => '2026-08-05',
        ],
    ];

    $response = $this->actingAs($this->user)
        ->postJson(route('app.posts.ai.plan.execute'), [
            'plan' => $plan,
            'social_account_id' => $this->socialAccount->id,
        ]);

    $response->assertCreated()
        ->assertJsonStructure([
            'batch' => [
                'id',
                'status',
                'total_items',
                'completed_items',
                'failed_items',
                'items',
            ],
        ]);

    $this->assertDatabaseHas('poster_batches', [
        'workspace_id' => $this->workspace->id,
        'user_id' => $this->user->id,
        'social_account_id' => $this->socialAccount->id,
        'total_items' => 2,
        'status' => 'generating',
    ]);

    $this->assertDatabaseCount('poster_batch_items', 2);

    Queue::assertPushed(GeneratePosterBatchItem::class, 2);
});

it('shows poster batch status and items', function () {
    $batch = PosterBatch::factory()->create([
        'workspace_id' => $this->workspace->id,
        'user_id' => $this->user->id,
        'social_account_id' => $this->socialAccount->id,
        'status' => 'generating',
        'total_items' => 1,
        'completed_items' => 0,
        'failed_items' => 0,
    ]);

    $item = PosterBatchItem::factory()->create([
        'poster_batch_id' => $batch->id,
        'status' => 'pending',
        'plan_data' => [
            'post_description' => 'Sample',
            'post_hashtags' => '#sample',
            'post_visual_prompt' => 'Prompt',
            'poster_size' => '1080x1080',
            'scheduled_date' => '2026-08-04',
        ],
    ]);

    $response = $this->actingAs($this->user)
        ->getJson(route('app.posts.ai.plan.batch', $batch));

    $response->assertSuccessful()
        ->assertJson([
            'batch' => [
                'id' => $batch->id,
                'status' => 'generating',
                'total_items' => 1,
                'items' => [
                    [
                        'id' => $item->id,
                        'status' => 'pending',
                    ],
                ],
            ],
        ]);
});

it('allows retrying a failed poster batch item', function () {
    Queue::fake();

    $batch = PosterBatch::factory()->create([
        'workspace_id' => $this->workspace->id,
        'user_id' => $this->user->id,
        'social_account_id' => $this->socialAccount->id,
        'status' => 'failed',
        'total_items' => 1,
        'completed_items' => 0,
        'failed_items' => 1,
    ]);

    $item = PosterBatchItem::factory()->create([
        'poster_batch_id' => $batch->id,
        'status' => 'failed',
        'error' => 'API timeout',
    ]);

    $response = $this->actingAs($this->user)
        ->postJson(route('app.posts.ai.plan.batch.retry', $item));

    $response->assertSuccessful();

    $this->assertDatabaseHas('poster_batch_items', [
        'id' => $item->id,
        'status' => 'pending',
        'error' => null,
    ]);

    $this->assertDatabaseHas('poster_batches', [
        'id' => $batch->id,
        'status' => 'generating',
        'failed_items' => 0,
    ]);

    Queue::assertPushed(GeneratePosterBatchItem::class);
});
