<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\PosterBatch;
use App\Models\PosterBatchItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PosterBatchItem>
 */
class PosterBatchItemFactory extends Factory
{
    protected $model = PosterBatchItem::class;

    public function definition(): array
    {
        return [
            'poster_batch_id' => PosterBatch::factory(),
            'post_id' => null,
            'plan_data' => [
                'post_description' => 'Sample post idea',
                'post_hashtags' => '#design #ai',
                'post_visual_prompt' => 'Minimalist poster design',
                'poster_size' => '1080x1080',
                'scheduled_date' => now()->addDay()->format('Y-m-d'),
            ],
            'status' => 'pending',
            'image_path' => null,
            'error' => null,
        ];
    }
}
