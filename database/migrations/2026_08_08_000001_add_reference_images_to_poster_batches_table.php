<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('poster_batches', function (Blueprint $table) {
            $table->json('reference_images')->nullable()->after('plan');
        });
    }

    public function down(): void
    {
        Schema::table('poster_batches', function (Blueprint $table) {
            $table->dropColumn('reference_images');
        });
    }
};
