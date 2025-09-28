<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->boolean('is_flagged')->default(false)->after('is_approved');
            $table->string('flag_reason')->nullable()->after('is_flagged');
            $table->unsignedBigInteger('parent_id')->nullable()->after('flag_reason'); // admin reply thread
        });
    }

    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->dropColumn(['is_flagged','flag_reason','parent_id']);
        });
    }
};


