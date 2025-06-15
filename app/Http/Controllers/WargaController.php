<?php

namespace App\Http\Controllers;

use App\Models\warga;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WargaController extends Controller
{
    public function index(Request $request)
    {
        $warga = warga::all();
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
