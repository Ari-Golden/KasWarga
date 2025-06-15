<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisIuran extends Model
{
    use HasFactory;

    protected $table = 'jenis_iurans';

    protected $fillable = [
        'nama_jenis_iuran',
        'keterangan',
    ];

    // Relasi ke iuran warga
    public function iuranWarga()
    {
        return $this->hasMany(IuranWarga::class, 'id_jenis_iuran');
    }
}
