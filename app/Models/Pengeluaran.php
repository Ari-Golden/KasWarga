<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengeluaran extends Model
{
    protected $fillable = [
        'kategori',
        'nama_pengeluaran',
        'periode_bulan', // contoh: '2025-06'
        'tgl_bayar',
        'jumlah',
        'keterangan',
    ];

    protected $casts = [
        'tgl_bayar' => 'date',
        'jumlah' => 'decimal:2',
    ];
    public function getFormattedTglBayarAttribute()
    {
        return $this->tgl_bayar ? $this->tgl_bayar->format('d-m-Y') : null;
    }
}
