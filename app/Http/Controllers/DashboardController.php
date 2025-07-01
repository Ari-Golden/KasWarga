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
            'saldoRukem' => Rukem::sum('uang_masuk_rukem') - Rukem::sum('uang_keluar_rukem'),
            'kas' => KasWarga::all(),
            'iuran' => $iuran,
            'jenisIuran' => JenisIuran::select('id', 'nama_jenis_iuran')->get(),
        ]);
    }
    
    public function indexKasWarga(Request $request)
{
    $selectedPeriode = $request->get('periode_id');

    $kas = KasWarga::select('id', 'uraian_kas as keterangan', 'tanggal_kas as tanggal', 'uang_masuk', 'uang_keluar')
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

    $kas = Rukem::select('id', 'uraian_kas_rukem as keterangan', 'tanggal_kas_rukem', 'uang_masuk_rukem', 'uang_keluar_rukem')
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
 public function iuranPribadi(Request $request)
{
    $user = $request->user();

    $warga = $user->warga;
    if (!$warga) {
        return abort(403, 'Akun ini belum terhubung ke data warga');
    }

    $iuran = $warga->iuranWargas()
    ->with('jenisIuran')
    ->when($request->dari, fn($q) => $q->whereDate('tgl_bayar', '>=', $request->dari))
    ->when($request->sampai, fn($q) => $q->whereDate('tgl_bayar', '<=', $request->sampai))
    ->orderByDesc('tgl_bayar')
    ->get();


    $total = $iuran->sum('jumlah');

    return Inertia::render('DashboardWarga/IuranPribadi', [
        'auth' => ['user' => $user],
        'iuran' => $iuran,
        'total' => $total,
    ]);
}

public function profilSaya(Request $request)
{
    $user = $request->user();
    $warga = $user->warga;

    return Inertia::render('DashboardWarga/ProfilSaya', [
        'auth' => ['user' => $user],
        'warga' => $warga,
    ]);
}
public function updateProfilSaya(Request $request)
{
    $request->validate([
        'nama' => 'required|string',
        'no_kk' => 'required|string',
        'no_ktp' => 'required|string',
        'alamat' => 'required|string',
        'rt_rw' => 'required|string',
        'no_hp' => 'nullable|string',
    ]);

    $warga = $request->user()->warga;

    $warga->update($request->only(['nama', 'no_kk', 'no_ktp', 'alamat', 'rt_rw', 'no_hp']));

    return redirect()->back()->with('success', 'Profil berhasil diperbarui');
}



}
