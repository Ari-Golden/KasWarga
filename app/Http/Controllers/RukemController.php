<?php

namespace App\Http\Controllers;

use App\Models\IuranWarga;
use App\Models\JenisIuran;
use App\Models\Pengeluaran;
use App\Models\periode;
use App\Models\Rukem;
use App\Models\Warga;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class RukemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Periode = periode::all();
        $Rukem = Rukem::all();
        $iurans = IuranWarga::where('id_jenis_iuran', 2)->get();
        $wargas = Warga::all();
        $pengeluaranRukem = Pengeluaran::all()->where('kategori', 'Rukem');
        $jenisIuran = JenisIuran::all();

        return Inertia::render('rukem/index', [
            'rukem' => $Rukem,
            'periodes' => $Periode,
            'iurans' => $iurans,
            'wargas' => $wargas,
            'pengeluaranRukem' => $pengeluaranRukem,
            'listIuran' => $jenisIuran
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

        // dd($request->all());
//         "iurans" => array:2 [▶]
//   "periode_id" => "1"
//   "nama_periode" => "2026-06"
//   "uraian_rukem" => "Iuran Rukem Bulanan"
//   "tanggal_kas_rukem" => "2025-06-22"
//   "periode_bulan" => "1"
//   "uang_masuk_rukem" => 20000
//   "uang_keluar_rukem" => 0
//   "saldo_rukem" => 20000
//   "keterangan_rukem" => null
        try {
            $validated = $request->validate([
                
                'uraian_rukem' => 'required|string|max:255',
                'tanggal_kas_rukem' => 'required|date',
                'nama_periode' => 'required|date_format:Y-m',
                'periode_bulan' => 'nullable|string|max:255',
                'uang_masuk_rukem' => 'nullable|numeric|min:0',
                'uang_keluar_rukem' => 'nullable|numeric|min:0',
                'saldo_rukem' => 'nullable|numeric',
                'keterangan_rukem' => 'nullable|string|max:255',

            ]);
            
           

            // format tanggal
            $tanggalKasRukem = Carbon::parse($validated['tanggal_kas_rukem']);
            $bulan = $tanggalKasRukem->format('m');
            $tahun = $tanggalKasRukem->format('Y');
            // dd($validated);
            // Format nama periode ke m-y
            $periodeFormatted = Carbon::createFromFormat('Y-m', $validated['nama_periode'])->format('m-Y');
             
            // Generate kode Kas rukem
            $nextId = Rukem::max('id') + 1;
            $kodeKasRukem = 'Rkm-IN-' . $nextId . '-' . $bulan . '-' . $tahun;

            // Cek jika kode kas sudah ada → hentikan proses
            if (Rukem::where('kode_rukem', $kodeKasRukem)->exists()) {
                return redirect()->back()->withErrors([
                    'kode_rukem' => 'Data kas Rukem masuk untuk bulan ini sudah tercatat.',
                ])->withInput();
            }
           
            // Hitung saldo
            $uangMasukRukem  = $validated['uang_masuk_rukem'] ?? 0;
            $uangKeluarRukem = $validated['uang_keluar_rukem'] ?? 0;
            $saldoRukem      = $uangMasukRukem - $uangKeluarRukem;          
            //  dd($periodeFormatted);
            Rukem::create([
                'kode_rukem' => $kodeKasRukem,
                'uraian_kas_rukem' => $validated['uraian_rukem'] .' '.$periodeFormatted,
                'tanggal_kas_rukem' => $tanggalKasRukem->format('Y-m-d'),
                'periode_bulan' => $periodeFormatted,
                'uang_masuk_rukem' => $uangMasukRukem,
                'uang_keluar_rukem' => $uangKeluarRukem,
                'saldo_rukem' => $saldoRukem,
                'keterangan_rukem' => $validated['keterangan_rukem'] ?? null,

            ]);

            return redirect()->route('rukem.index')->with('success', 'Data berhasil ditambahkan.');
        } catch (\Exception $e) {
            Log::error('Gagal menyimpan kas: ' . $e->getMessage());

            return redirect()->route('rukem.index')->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function storeLain(Request $request)
{
    $validated = $request->validate([
        'uraian_rukem' => 'required|string|max:255',
        'tanggal_kas_rukem' => 'required|date',
        'nama_periode' => 'required|date_format:Y-m',
        'periode_bulan' => 'nullable|string|max:255',
        'uang_masuk_rukem' => 'nullable|numeric|min:0',
        'uang_keluar_rukem' => 'nullable|numeric|min:0',
        'saldo_rukem' => 'nullable|numeric',
        'keterangan_rukem' => 'nullable|string|max:255',
    ]);
    
    try {
        $tanggalKas = \Carbon\Carbon::parse($validated['tanggal_kas_rukem']);
        $periodeCarbon = \Carbon\Carbon::createFromFormat('Y-m', $validated['nama_periode']);
        $periodeBulan = $periodeCarbon->format('m-Y');

        $kode = 'Rkm-IN-' . (Rukem::max('id') + 1) . '-' . $tanggalKas->format('m-Y');

        if (Rukem::where('kode_rukem', $kode)->exists()) {
            return back()->withErrors(['kode_rukem' => 'Data Rukem bulan ini sudah tercatat.'])->withInput();
        }
        // dd($validated);
        Rukem::create([
            'kode_rukem'         => $kode,
            'uraian_kas_rukem'   => $validated['uraian_rukem'] . ' ' . $periodeBulan,
            'tanggal_kas_rukem'  => $tanggalKas->toDateString(),
            'periode_bulan'      => $periodeBulan,
            'uang_masuk_rukem'   => $validated['uang_masuk_rukem'] ?? 0,
            'uang_keluar_rukem'  => $validated['uang_keluar_rukem'] ?? 0,
            'saldo_rukem'        => $validated['saldo_rukem'] ?? 0,
            'keterangan_rukem'   => $validated['keterangan_rukem'] ?? '-',
        ]);

        return redirect()->route('rukem.index')->with('success', 'Data berhasil disimpan!');
    } catch (\Exception $e) {
        \Illuminate\Support\Facades\Log::error('Gagal menyimpan Rukem: ' . $e->getMessage());
        return back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan.'])->withInput();
    }
}

  public function storeRukemOut(Request $request)
{
    $request->validate([
        'pengeluaranRukem' => 'required|array',
        'pengeluaranRukem.*.id' => 'required|numeric',
        'pengeluaranRukem.*.uraian_kas' => 'required|string|max:255',
        'pengeluaranRukem.*.tanggal_kas' => 'required|date',
        'pengeluaranRukem.*.periode_bulan' => 'required|string|max:255',
        'pengeluaranRukem.*.uang_keluar' => 'nullable|numeric|min:0',
        'pengeluaranRukem.*.keterangan' => 'nullable|string|max:255',
    ]);

    DB::beginTransaction();

    try {
        $lastSaldo = Rukem::orderByDesc('tanggal_kas_rukem')->orderByDesc('id')->first()?->saldo_rukem ?? 0;

        foreach ($request->pengeluaranRukem as $data) {
            $uangMasukRukem = 0;
            $uangKeluarRukem = $data['uang_keluar'] ?? 0;
            $saldoBaru = $lastSaldo + $uangMasukRukem - $uangKeluarRukem;

            $kodeKasRukem = 'RKM-OUT-' . $data['id'] . '-' . str_replace('-', '', Carbon::parse($data['periode_bulan'])->format('m-Y'));

            if (Rukem::where('kode_rukem', $kodeKasRukem)->exists()) {
                throw new \Exception('Kode kas ' . $kodeKasRukem . ' sudah ada.');
            }

            Rukem::create([
                'kode_rukem' => $kodeKasRukem,
                'uraian_kas_rukem' => $data['uraian_kas'],
                'tanggal_kas_rukem' => Carbon::parse($data['tanggal_kas'])->format('Y-m-d'),
                'periode_bulan' => $data['periode_bulan'],
                'uang_masuk_rukem' => 0,
                'uang_keluar_rukem' => $uangKeluarRukem,
                'saldo_rukem' => $saldoBaru,
                'keterangan_rukem' => $data['keterangan'] ?? null,
            ]);

            $lastSaldo = $saldoBaru;
        }

        DB::commit();
        return redirect()->route('rukem.index')->with('success', 'Transaksi kas berhasil disimpan.');
    } catch (\Throwable $e) {
        DB::rollBack();
        return redirect()->back()->withErrors(['msg' => 'Gagal menyimpan: ' . $e->getMessage()]);
    }
}



    /**
     * Display the specified resource.
     */
    public function show(Rukem $rukem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rukem $rukem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rukem $rukem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rukem $rukem)
    {
        try {
            $rukem->delete();
            return redirect()->route('rukem.index')->with('success', 'Data kas rukem berhasil dihapus.');
        } catch (\Exception $e) {
            Log::error('Gagal menghapus data kas rukem: ' . $e->getMessage());
            return redirect()->route('rukem.index')->with('error', 'Terjadi kesalahan saat menghapus data kas rukem.');
        }
    }
}
