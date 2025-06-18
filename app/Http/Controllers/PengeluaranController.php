<?php

namespace App\Http\Controllers;

use App\Models\Pengeluaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengeluaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pengeluarans = Pengeluaran::orderBy('created_at', 'desc')->get();
        return Inertia::render('pengeluaran/index', [
            'pengeluarans' => $pengeluarans,
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
        
        $request->validate([
            'kategori' => 'required|string|max:255',
            'nama_pengeluaran' => 'required|string|max:255',
            'periode_bulan' => 'required|date_format:Y-m',
            'tgl_bayar' => 'required|date',
            'jumlah' => 'required|numeric|min:0',
            'keterangan' => 'nullable|string|max:500',
        ]);
        

        Pengeluaran::create([
            'kategori' => $request->kategori,
            'nama_pengeluaran' => $request->nama_pengeluaran,
            'periode_bulan' => $request->periode_bulan,
            'tgl_bayar' => $request->tgl_bayar,
            'jumlah' => $request->jumlah,
            'keterangan' => $request->keterangan,
        ]);
        return redirect()->route('pengeluaran.index')->with('success', 'Pengeluaran berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pengeluaran $pengeluaran)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pengeluaran $pengeluaran)
    {
        
        return Inertia::render('pengeluaran/edit', [
            'pengeluaran' => $pengeluaran,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengeluaran $pengeluaran)
    {
        $request->validate([
            'kategori' => 'required|string|max:255',
            'nama_pengeluaran' => 'required|string|max:255',
            'periode_bulan' => 'required|date_format:Y-m',
            'tgl_bayar' => 'required|date',
            'jumlah' => 'required|numeric|min:0',
            'keterangan' => 'nullable|string|max:500',
        ]);

        $pengeluaran->update([
            'kategori' => $request->kategori,
            'nama_pengeluaran' => $request->nama_pengeluaran,
            'periode_bulan' => $request->periode_bulan,
            'tgl_bayar' => $request->tgl_bayar,
            'jumlah' => $request->jumlah,
            'keterangan' => $request->keterangan,
        ]);

        return redirect()->route('pengeluaran.index')->with('success', 'Pengeluaran berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengeluaran $pengeluaran)
    {
        //
    }
}
