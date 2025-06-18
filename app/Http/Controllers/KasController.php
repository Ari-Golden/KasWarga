<?php

namespace App\Http\Controllers;

use App\Models\IuranWarga;
use App\Models\JenisIuran;
use App\Models\KasWarga;
use App\Models\periode;
use App\Models\Warga;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)

    {
        $kasWargas = KasWarga::all();
        
    $periodes = periode::all();   
    $iurans = IuranWarga::all();
       return Inertia::render('kas/index', [
            'title' => 'Kas',
            'description' => 'Manage your kas entries here.',
            'kasWargas' => $kasWargas,
            'iurans' => $iurans,
            'wargas' => Warga::select('id', 'nama')->get(),
            'jenisIuran' => JenisIuran::select('id', 'nama_jenis_iuran')->get(),
            'periodes' => $periodes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // Logic to show the form for creating a new kas entry
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
        $request->validate([
            'uraian_kas' => 'required|string|max:255',
            'tanggal_kas' => 'required|date',
            'nama_periode' => 'required|exists:periodes,nama_periode',
            'periode_bulan' => 'required|string|max:255',
            'uang_masuk' => 'nullable|numeric|min:0',
            'uang_keluar' => 'nullable|numeric|min:0',
            'saldo' => 'nullable|numeric',
            'keterangan' => 'nullable|string|max:255',
        ]);

        KasWarga::create([
            'uraian_kas' => $request->uraian_kas . ' ' . $request->nama_periode,
            'tanggal_kas' => $request->tanggal_kas,
            'periode_bulan' => $request->nama_periode,
            'uang_masuk' => $request->uang_masuk ?? 0,
            'uang_keluar' => $request->uang_keluar ?? 0,
            'saldo' => $request->uang_masuk - $request->uang_keluar,
            'keterangan' => $request->keterangan,
        ]);

        // Logic to store the kas entry
        // Example:
        // KasWarga::create($request->all());

        return redirect()->route('kas.index')->with('success', 'Kas entry created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Logic to display a specific kas entry
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // Logic to show the form for editing a specific kas entry
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Logic to update a specific kas entry
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Logic to delete a specific kas entry
    }
}
