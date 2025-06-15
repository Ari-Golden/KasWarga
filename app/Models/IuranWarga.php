<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IuranWarga extends Model
{
     use HasFactory;

    protected $table = 'iuran_warga';

    protected $fillable = [
        'id_warga',
        'id_jenis_iuran',
        'periode_bulan',
        'tgl_bayar',
        'jumlah',
    ];

    protected $casts = [
        'tgl_bayar' => 'date',
        'jumlah' => 'decimal:2',
    ];

    // Relasi ke warga
    public function warga()
    {
        return $this->belongsTo(Warga::class, 'id_warga');
    }

    // Relasi ke jenis iuran
    public function jenisIuran()
    {
        return $this->belongsTo(JenisIuran::class, 'id_jenis_iuran');
    }
}
