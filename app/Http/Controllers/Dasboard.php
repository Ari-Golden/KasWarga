<?php

namespace App\Http\Controllers;

use App\Models\IuranWarga;
use App\Models\JenisIuran;
use App\Models\KasWarga;
use App\Models\Pengeluaran;
use App\Models\Warga;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Dasboard extends Controller
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
