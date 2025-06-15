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
        Schema::create('iuran_wargas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_warga')->constrained('wargas')->onDelete('cascade');
            $table->foreignId('id_jenis_iuran')->constrained('jenis_iurans')->onDelete('cascade');
            $table->string('periode_bulan'); // contoh: '2025-06'
            $table->date('tgl_bayar')->nullable();
            $table->decimal('jumlah', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('iuran_wargas');
    }
};
