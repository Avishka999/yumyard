<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Store customer totals and delivery information for each checkout.
        Schema::create('orders', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->decimal('subtotal', 10, 2);
            $table->decimal('delivery_fee', 10, 2)->default(0);
            $table->decimal('total', 10, 2);
            $table->string('status')->default('pending')->index();
            $table->string('delivery_status')->default('pending')->index();
            $table->text('delivery_address');
            $table->string('phone', 30);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        // Remove the order table during rollback.
        Schema::dropIfExists('orders');
    }
};
