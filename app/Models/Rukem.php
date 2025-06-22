<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rukem extends Model
{
   

    protected $fillable =[
    'kode_rukem',
    'uraian_kas_rukem',
    'tanggal_kas_rukem',
    'periode_bulan',
    'uang_masuk_rukem',
    'uang_keluar_rukem',
    'saldo_rukem',
    'keterangan_rukem',
    ];
    
}
