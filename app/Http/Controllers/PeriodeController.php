<?php

namespace App\Http\Controllers;

use App\Models\periode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PeriodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $periodes = periode::all();
        return Inertia::render('kas/periode/dataPeriode', [
            'periodes' => $periodes,
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
            'nama_periode' => 'required|string|max:255',
            'tanggal_mulai' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_mulai',
        ]);

        periode::create([
            'nama_periode' => $request->nama_periode,
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_akhir' => $request->tanggal_akhir,
        ]);

        return redirect()->route('kas.index')->with('success', 'Periode created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(periode $periode)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(periode $periode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, periode $periode)
    {
       
        $request->validate([
            'nama_periode' => 'required|string|max:255',
            'tanggal_mulai' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_mulai',
        ]);

        $periode->update([
            'nama_periode' => $request->nama_periode,
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_akhir' => $request->tanggal_akhir,
        ]);

        return redirect()->route('kas.index')->with('success', 'Periode updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(periode $periode)
    {
        //
    }
}
