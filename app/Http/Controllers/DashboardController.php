<?php

namespace App\Http\Controllers;

use App\Models\IuranWarga;
use App\Models\JenisIuran;
use App\Models\KasWarga;
use App\Models\Pengeluaran;
use App\Models\Warga;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Warga::all();
        $iuran = IuranWarga::with('warga', 'jenisIuran')->latest()->get();
        return Inertia::render('dashboard',[
            'title' => 'Dashboard',
            'description' => 'Welcome to your dashboard!', 
            'warga' => Warga::select('id', 'nama')->get(),
            'wargaCount' => Warga::count(),
            'pengeluaranTotal' => Pengeluaran::sum('jumlah'),
            'iuranTotal' => IuranWarga::sum('jumlah'),
            'saldoKas' => KasWarga::sum('uang_masuk') - KasWarga::sum('uang_keluar'),
            'kas' => KasWarga::all(),
            'iuran' => $iuran,
            'jenisIuran' => JenisIuran::select('id', 'nama_jenis_iuran')->get(),
        ]);
    }
}
