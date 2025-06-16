<?php

namespace App\Http\Controllers;

use App\Models\IuranWarga;
use App\Models\JenisIuran;
use App\Models\Warga;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IuranWargaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $iuran = IuranWarga::with('warga', 'jenisIuran')->latest()->get();

        return Inertia::render('iuran/index', [
            'iurans' => $iuran,
            'wargas' => Warga::select('id', 'nama')->get(),
            'jenisIuran' => JenisIuran::select('id', 'nama_jenis_iuran')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         return Inertia::render('iuran/create', [
            'wargas' => Warga::select('id', 'nama')->get(),
            'jenisIuran' => JenisIuran::select('id', 'nama_jenis_iuran')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_warga' => 'required|exists:wargas,id',
            'id_jenis_iuran' => 'required|exists:jenis_iurans,id',
            'periode_bulan' => 'required|string|max:7',
            'tgl_bayar' => 'nullable|date',
            'jumlah' => 'required|numeric|min:0',
        ]);

        IuranWarga::create($request->all());

        return redirect()->route('iuran-warga.index')->with('success', 'Data iuran berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(IuranWarga $iuranWarga)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(IuranWarga $iuranWarga)
    {
        return Inertia::render('IuranWarga/Edit', [
            'iuran' => $iuranWarga->load('warga', 'jenisIuran'),
            'wargas' => Warga::select('id', 'nama')->get(),
            'jenisIuran' => JenisIuran::select('id', 'nama_jenis_iuran')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, IuranWarga $iuranWarga)
    {
         $request->validate([
            'id_warga' => 'required|exists:wargas,id',
            'id_jenis_iuran' => 'required|exists:jenis_iurans,id',
            'periode_bulan' => 'required|string|max:7',
            'tgl_bayar' => 'nullable|date',
            'jumlah' => 'required|numeric|min:0',
        ]);

        $iuranWarga->update($request->all());

        return redirect()->route('iuran-warga.index')->with('success', 'Data iuran berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(IuranWarga $iuranWarga)
    {
         $iuranWarga->delete();

        return redirect()->route('iuran-warga.index')->with('success', 'Data iuran berhasil dihapus.');
    }
}
