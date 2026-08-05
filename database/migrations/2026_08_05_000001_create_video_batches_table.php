<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('video_batches', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('workspace_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('social_account_id')->nullable()->constrained()->nullOnDelete();
            $table->json('plan');
            $table->string('status')->default('pending');
            $table->string('size')->default('9:16');
            $table->string('quality')->default('720p');
            $table->integer('total_items')->default(0);
            $table->integer('completed_items')->default(0);
            $table->integer('failed_items')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('video_batches');
    }
};
