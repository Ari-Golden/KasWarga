<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KasWarga extends Model
{
    protected $table = 'kas_wargas';

    protected $fillable = [
        'uraian_kas',
        'tanggal_kas',
        'periode_bulan',
        'uang_masuk',
        'uang_keluar',
        'saldo',
        'keterangan',
    ];

    public function periode()
    {
        return $this->belongsTo(Periode::class, 'periode_bulan', 'nama_periode');
    }
    public function iuranWarga()
    {
        return $this->hasMany(IuranWarga::class, 'periode_bulan', 'periode_bulan');
    }
    public function pengeluaran()
    {
        return $this->hasMany(Pengeluaran::class, 'periode_bulan', 'periode_bulan');
    }
    public function getSaldoAttribute()
    {
        return $this->uang_masuk - $this->uang_keluar;
    }
    public function scopeFilterByPeriode($query, $periode)
    {
        if ($periode) {
            return $query->where('periode_bulan', $periode);
        }
        return $query;
    }
}
