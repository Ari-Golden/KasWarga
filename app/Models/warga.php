<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warga extends Model
{
    use HasFactory;

    // Kolom yang boleh diisi massal
    protected $fillable = [
        'nama',
        'no_kk',
        'no_ktp',
        'alamat',
        'rt_rw',
        'no_hp',
        'status_aktif',
    ];

    // Cast status_aktif jadi boolean
    protected $casts = [
        'status_aktif' => 'boolean',
    ];

    // Contoh relasi nanti (jika ada tabel kas_warga)
    public function kas()
    {
        // return $this->hasMany(KasWarga::class);
    }
}

