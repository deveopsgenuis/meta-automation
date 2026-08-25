<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('platform_credentials', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('workspace_id')->constrained()->cascadeOnDelete();
            $table->string('platform');
            $table->string('client_id')->nullable();
            $table->text('client_secret')->nullable();
            $table->string('callback_url')->nullable();
            $table->json('extra')->nullable();
            $table->timestamps();

            $table->unique(['workspace_id', 'platform']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('platform_credentials');
    }
};
