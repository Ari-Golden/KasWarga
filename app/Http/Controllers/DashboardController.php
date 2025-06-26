<?php

namespace App\Http\Controllers;

use App\Models\IuranWarga;
use App\Models\JenisIuran;
use App\Models\KasWarga;
use App\Models\Pengeluaran;
use App\Models\periode;
use App\Models\Rukem;
use App\Models\Warga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

     public function indexDashboardWarga()
    {
        Warga::all();
        $iuran = IuranWarga::with('warga', 'jenisIuran')->latest()->get();
        return Inertia::render('DashboardWarga/index',[
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
    
    public function indexKasWarga(Request $request)
{
    $selectedPeriode = $request->get('periode_id');

    $kas = KasWarga::with('periode_bulan')
        ->when($selectedPeriode, function ($query, $selectedPeriode) {
            $query->where('periode_id', $selectedPeriode);
        })
        ->orderByDesc('tanggal_kas')
        ->get();

    $periodeList = Periode::orderByDesc('nama_periode')->get();

    $saldoKas = $kas->sum('uang_masuk') - $kas->sum('uang_keluar');

    return Inertia::render('DashboardWarga/KasWarga', [
        'kas' => $kas,
        'saldoKas' => $saldoKas,
        'periodeList' => $periodeList,
        'selectedPeriode' => $selectedPeriode,
        'auth' => [
            'user' => Auth::user()
        ]
    ]);
}

  public function indexKasRukem(Request $request)
{
    $selectedPeriode = $request->get('periode_id');

    $kas = Rukem::with('periode_bulan')
        ->when($selectedPeriode, function ($query, $selectedPeriode) {
            $query->where('periode_id', $selectedPeriode);
        })
        ->orderByDesc('tanggal_kas_rukem')
        ->get();

    $periodeList = Periode::orderByDesc('nama_periode')->get();

    $saldoKas = $kas->sum('uang_masuk_rukem') - $kas->sum('uang_keluar_rukem');

    return Inertia::render('DashboardWarga/KasRukem', [
        'kas' => $kas,
        'saldoKas' => $saldoKas,
        'periodeList' => $periodeList,
        'selectedPeriode' => $selectedPeriode,
        'auth' => [
            'user' => Auth::user()
        ]
    ]);
}
}
