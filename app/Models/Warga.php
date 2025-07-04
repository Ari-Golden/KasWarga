<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warga extends Model
{
    use HasFactory;
    protected $table = 'wargas';

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


public function iuranWargas()
{
    return $this->hasMany(IuranWarga::class, 'id_warga');
}

public function user()
{
    return $this->belongsTo(User::class,'user_id');
}





}

