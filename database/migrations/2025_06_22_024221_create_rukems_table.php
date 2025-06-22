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
        Schema::create('rukems', function (Blueprint $table) {
            $table->id();
            $table->string('kode_rukem')->unique();
            $table->string('uraian_kas_rukem');
            $table->date('tanggal_kas_rukem');
            $table->string('periode_bulan')->nullable();
            $table->decimal('uang_masuk_rukem', 15, 2)->default(0);
            $table->decimal('uang_keluar_rukem', 15, 2)->default(0);
            $table->decimal('saldo_rukem', 15, 2)->default(0);
            $table->string('keterangan_rukem')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rukems');
    }
};
