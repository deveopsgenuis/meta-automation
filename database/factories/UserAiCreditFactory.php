<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\User;
use App\Models\UserAiCredit;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserAiCreditFactory extends Factory
{
    protected $model = UserAiCredit::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'total_allowed_ai_images' => 150,
            'total_allowed_ai_video' => 10,
            'total_allowed_ai_use' => 250,
        ];
    }

    public function exhausted(): static
    {
        return $this->state([
            'total_allowed_ai_images' => 0,
            'total_allowed_ai_video' => 0,
            'total_allowed_ai_use' => 0,
        ]);
    }
}
