<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IuranWarga extends Model
{
    use HasFactory;

    protected $table = 'iuran_wargas';

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

    public function scopeFilterByPeriode($query, $periode)
    {
        if ($periode) {
            return $query->where('periode_bulan', $periode);
        }
        return $query;
    }

    public function scopeFilterByWarga($query, $idWarga)
    {
        if ($idWarga) {
            return $query->where('id_warga', $idWarga);
        }
        return $query;
    }

    public function scopeFilterByJenisIuran($query, $idJenisIuran)
    {
        if ($idJenisIuran) {
            return $query->where('id_jenis_iuran', $idJenisIuran);
        }
        return $query;
    }
}
