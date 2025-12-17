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
        Schema::create('payment_logs', function (Blueprint $table) {
            $table->id();
            $table->uuid('payment_uuid');
            $table->string('action', 50); // 'processed_success' или 'processed_failed'
            $table->timestamp('timestamp')->useCurrent();
            
            // Индекс для быстрого поиска по payment_uuid
            $table->index('payment_uuid');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_logs');
    }
};
