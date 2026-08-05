<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('video_batch_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('video_batch_id')->constrained('video_batches')->cascadeOnDelete();
            $table->foreignUuid('post_id')->nullable()->constrained('posts')->nullOnDelete();
            $table->json('plan_data');
            $table->string('status')->default('pending');
            $table->string('video_path')->nullable();
            $table->text('error')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('video_batch_items');
    }
};
