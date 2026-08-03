<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\PosterBatch;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PosterBatch>
 */
class PosterBatchFactory extends Factory
{
    protected $model = PosterBatch::class;

    public function definition(): array
    {
        return [
            'workspace_id' => Workspace::factory(),
            'user_id' => User::factory(),
            'social_account_id' => null,
            'plan' => [
                [
                    'post_description' => 'Sample post description',
                    'post_hashtags' => '#marketing #tech',
                    'post_visual_prompt' => 'A futuristic tech office with vibrant neon lighting',
                    'poster_size' => '1080x1080',
                    'scheduled_date' => now()->addDay()->format('Y-m-d'),
                ],
            ],
            'status' => 'pending',
            'total_items' => 1,
            'completed_items' => 0,
            'failed_items' => 0,
        ];
    }
}
