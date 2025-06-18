<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KasWarga extends Model
{
    protected $table = 'kas_wargas';

    protected $fillable = [
        'kode',
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
    public static function getKasWithRealtimeSaldo()
{
    $kasList = self::orderBy('tanggal_kas')
        ->orderBy('id')
        ->get();

    $saldo = 0;

    return $kasList->map(function ($item) use (&$saldo) {
        $saldo += ($item->uang_masuk ?? 0) - ($item->uang_keluar ?? 0);
        $item->saldo_realtime = $saldo;
        return $item;
    });
}

}
