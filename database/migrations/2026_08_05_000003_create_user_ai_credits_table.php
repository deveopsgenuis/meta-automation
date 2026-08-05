<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_ai_credits', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->unique();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->integer('total_allowed_ai_images')->default(150);
            $table->integer('total_allowed_ai_video')->default(10);
            $table->integer('total_allowed_ai_use')->default(250);
            $table->timestamps();
        });

        // Seed existing users who don't have a credit record yet
        $now = now()->toDateTimeString();
        $users = DB::table('users')->select('id')->get();
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
            DB::table('user_ai_credits')->insert($inserts);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('user_ai_credits');
    }
};
