<?php

declare(strict_types=1);

use App\Models\User;
use App\Models\UserAiCredit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserAiCreditSeeder extends Seeder
{
    public function run(): void
    {
        $existingIds = UserAiCredit::pluck('user_id')->toArray();

        $users = User::query()
            ->whereNotIn('id', $existingIds)
            ->get();

        $now = now()->toDateTimeString();
        $inserts = [];

        foreach ($users as $user) {
            $inserts[] = [
                'id' => (string) Str::uuid(),
                'user_id' => $user->id,
                'total_allowed_ai_images' => 150,
                'total_allowed_ai_video' => 10,
                'total_allowed_ai_use' => 250,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        if ($inserts !== []) {
            UserAiCredit::insert($inserts);
            $this->command->info('Created AI credits for '.count($inserts).' users.');
        } else {
            $this->command->info('All users already have AI credits.');
        }
    }
}
