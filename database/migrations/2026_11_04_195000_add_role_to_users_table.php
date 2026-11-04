<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add the role used by the admin authorization middleware.
        Schema::table('users', function (Blueprint $table): void {
            $table->string('role')->default('customer')->after('email');
        });
    }

    public function down(): void
    {
        // Remove role data when rolling back this change.
        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn('role');
        });
    }
};
