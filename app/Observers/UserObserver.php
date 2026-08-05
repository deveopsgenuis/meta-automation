<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    public function created(User $user): void
    {
        $user->userAiCredit()->create([
            'total_allowed_ai_images' => 150,
            'total_allowed_ai_video' => 10,
            'total_allowed_ai_use' => 250,
        ]);
    }
}
