<?php

namespace App\Http\Controllers;

use App\Models\IuranWarga;
use App\Models\JenisIuran;
use App\Models\Warga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

        //terintegrasi dengan tampilan kas index
        return Inertia::render('kas/index', [
            'title' => 'Kas',
            'description' => 'Manage your kas entries here.',
            'iurans' => $iuran,
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

   

    public function store(Request $request)
    {
        $request->validate([
            'id_warga'       => 'required|exists:wargas,id',
            'periode_bulan'  => 'required|date_format:Y-m',
            'tgl_bayar'      => 'required|date',
            'items'          => 'nullable|array',
            'items.*'        => 'in:iuran_kas,rukem',
            'dana_taktis'    => 'nullable|numeric|min:0',
        ]);

        DB::beginTransaction();

        try {
            $data = [];

            // Mapping nama item → id_jenis_iuran dan jumlah tetap
            $mappingJenisIuran = [
                'iuran_kas' => ['id_jenis' => 4, 'jumlah' => 10000],
                'rukem'     => ['id_jenis' => 2, 'jumlah' => 10000],
            ];

            foreach ($request->input('items', []) as $item) {
                if (isset($mappingJenisIuran[$item])) {
                    $data[] = [
                        'id_warga'        => $request->id_warga,
                        'id_jenis_iuran'  => $mappingJenisIuran[$item]['id_jenis'],
                        'periode_bulan'   => $request->periode_bulan,
                        'tgl_bayar'       => $request->tgl_bayar,
                        'jumlah'          => $mappingJenisIuran[$item]['jumlah'],
                        'created_at'      => now(),
                        'updated_at'      => now(),
                    ];
                }
            }

            // Dana Taktis (id: 5)
            if ($request->filled('dana_taktis') && $request->dana_taktis > 0) {
                $data[] = [
                    'id_warga'        => $request->id_warga,
                    'id_jenis_iuran'  => 5,
                    'periode_bulan'   => $request->periode_bulan,
                    'tgl_bayar'       => $request->tgl_bayar,
                    'jumlah'          => $request->dana_taktis,
                    'created_at'      => now(),
                    'updated_at'      => now(),
                ];
            }

            IuranWarga::insert($data);

            DB::commit();

            return redirect()->route('iuran-warga.index')->with('success', 'Data iuran berhasil disimpan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal menyimpan data: ' . $e->getMessage()]);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(IuranWarga $iuranWarga)
    {
        return Inertia::render('iuran/show', [
            'iuran' => $iuranWarga->load('warga', 'jenisIuran'),
            'wargas' => Warga::select('id', 'nama')->get(),
            'jenisIuran' => JenisIuran::select('id', 'nama_jenis_iuran')->get(),
        ]);
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
