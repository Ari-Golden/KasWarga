<?php

namespace App\Http\Controllers;

use App\Models\JenisIuran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JenisIuranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jenisIuran = JenisIuran::all();
        return Inertia::render('jenisiuran/index', [
            'jenisIuran' => $jenisIuran,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('jenisiuran/create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $request->validate([
            'nama_jenis_iuran' => 'required|string|max:255',
            'keterangan' => 'required|string|max:255',
        ]);
   
        

        JenisIuran::create($request->only('nama_jenis_iuran', 'keterangan'));

        return redirect()->route('jenis-iuran.index')->with('success', 'Jenis Iuran created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(JenisIuran $jenisIuran)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JenisIuran $jenisIuran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JenisIuran $jenisIuran)
    {
        $request->validate([
            'nama_jenis_iuran' => 'required|string|max:255',
            'keterangan' => 'required|string|max:255',
        ]);

        $jenisIuran->update($request->only('nama_jenis_iuran', 'keterangan'));

        return redirect()->route('jenis-iuran.index')->with('success', 'Jenis Iuran updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JenisIuran $jenisIuran)
    {
        $jenisIuran->delete();
        return redirect()->route('jenis-iuran.index')->with('success', 'Jenis Iuran deleted successfully.');
    }
}
