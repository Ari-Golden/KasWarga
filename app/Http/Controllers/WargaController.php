<?php

namespace App\Http\Controllers;

use App\Models\IuranWarga;
use App\Models\Warga;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WargaController extends Controller
{
    public function index(Request $request)
    {
        $warga = Warga::all();
        return Inertia::render('warga/index', compact('warga'));
    }

    public function store(Request $request)
    {
       
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'no_kk' => 'required|string|max:255|unique:wargas,no_kk',
            'no_ktp' => 'required|string|max:255|unique:wargas,no_ktp',
            'alamat' => 'required|string',
            'rt_rw' => 'required|string',
            'no_hp' => 'nullable|string',
        ]);

       

        Warga::create($validated);

        return redirect()->route('warga.index')->with('success', 'Data warga berhasil ditambahkan.');
    }

    public function edit(Warga $warga)
    {
        return Inertia::render('warga/edit', compact('warga'));
    }

    public function show(Warga $warga)    
    {
        // Make sure the foreign key matches your database schema, e.g., 'warga_id' or 'wargaId'
        // If your foreign key is different, replace 'warga_id' below with the correct column name
        // Example: IuranWarga::where('warga_id', $warga->id)->get();

        $warga->load('iuranWargas.jenisIuran');

        return Inertia::render('warga/show', [
            'warga' => $warga,
            'iuranWargas' => $warga->iuranWargas,
        ]);
    }


    public function update(Request $request, Warga $warga)
    {
     
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'no_kk' => 'required|string|max:255|unique:wargas,no_kk,' . $warga->id,
            'no_ktp' => 'required|string|max:255|unique:wargas,no_ktp,' . $warga->id,
            'alamat' => 'required|string',
            'rt_rw' => 'required|string',
            'no_hp' => 'nullable|string',
        ]);

        $warga->update($validated);

        return redirect()->route('warga.index')->with('success', 'Data warga berhasil diupdate.');
    }

    public function destroy(Warga $warga)
    {
        $warga->delete();

        return redirect()->route('warga.index')->with('success', 'Data warga berhasil dihapus.');
    }
}
