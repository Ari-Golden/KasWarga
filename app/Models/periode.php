<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class periode extends Model
{
    protected $table = 'periodes';

    protected $fillable = [
        'nama_periode',
        'tanggal_mulai',
        'tanggal_akhir',
        'keterangan',
    ];

    public function iuranWarga()
    {
        return $this->hasMany(IuranWarga::class, 'periode_bulan', 'nama_periode');
    }

    public function pengeluaran()
    {
        return $this->hasMany(Pengeluaran::class, 'periode_bulan', 'nama_periode');
    } 
    public function kasWarga()
    {
        return $this->hasMany(KasWarga::class, 'periode_bulan', 'nama_periode');
    }
    public function scopeFilterByPeriode($query, $periode)
    {
        if ($periode) {
            return $query->where('nama_periode', $periode);
        }
        return $query;
    }
    public function scopeFilterByTanggal($query, $tanggalMulai, $tanggalAkhir)
    {
        if ($tanggalMulai && $tanggalAkhir) {
            return $query->whereDate('tanggal_mulai', '>=', $tanggalMulai)
                         ->whereDate('tanggal_akhir', '<=', $tanggalAkhir);
        } elseif ($tanggalMulai) {
            return $query->whereDate('tanggal_mulai', '>=', $tanggalMulai);
        } elseif ($tanggalAkhir) {
            return $query->whereDate('tanggal_akhir', '<=', $tanggalAkhir);
        }
        return $query;
    }
    public function scopeFilterByNama($query, $nama)
    {
        if ($nama) {
            return $query->where('nama_periode', 'like', '%' . $nama . '%');
        }
        return $query;
    }
    public function scopeFilterByKeterangan($query, $keterangan)
    {
        if ($keterangan) {
            return $query->where('keterangan', 'like', '%' . $keterangan . '%');
        }
        return $query;
    }  
   
}
