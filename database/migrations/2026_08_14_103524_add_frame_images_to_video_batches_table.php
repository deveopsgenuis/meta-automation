<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('video_batches', function (Blueprint $table) {
            $table->json('start_frame_image')->nullable()->after('quality');
            $table->json('end_frame_image')->nullable()->after('start_frame_image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('video_batches', function (Blueprint $table) {
            $table->dropColumn(['start_frame_image', 'end_frame_image']);
        });
    }
};
