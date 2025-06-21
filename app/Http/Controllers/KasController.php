<?php

namespace App\Http\Controllers;

use App\Models\IuranWarga;
use App\Models\JenisIuran;
use App\Models\KasWarga;
use App\Models\Pengeluaran;
use App\Models\periode;
use App\Models\Warga;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


class KasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)

    {

        $kasWargas = KasWarga::orderBy('id', 'asc')->get();
        $periodes = periode::all();
        $iurans = IuranWarga::all();
        $pengeluaranKas = Pengeluaran::all()->where('kategori', 'Kas');
        return Inertia::render('kas/index', [
            'title' => 'Kas',
            'description' => 'Manage your kas entries here.',
            'kasWargas' => $kasWargas,
            'iurans' => $iurans,
            'wargas' => Warga::select('id', 'nama')->get(),
            'jenisIuran' => JenisIuran::select('id', 'nama_jenis_iuran')->get(),
            'periodes' => $periodes,
            'pengeluaranKas' => $pengeluaranKas,
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
    public function storeIncomeLain(Request $request)
    {
        // Validasi input
        $request->validate([
            'uraian_kas'     => 'required|string|max:255',
            'tanggal_kas'    => 'required|date',
            'nama_periode'   => 'required|string|max:255',
            'periode_bulan'  => 'nullable|string|max:255',
            'uang_masuk'     => 'nullable|numeric|min:0',
            'uang_keluar'    => 'nullable|numeric|min:0',
            'saldo'          => 'nullable|numeric',
            'keterangan'     => 'nullable|string|max:255',
        ]);

        try {
            // Ambil bulan dan tahun dari tanggal kas
            $tanggalKas = Carbon::parse($request->tanggal_kas);
            $bulan = $tanggalKas->format('m');
            $tahun = $tanggalKas->format('Y');

            // Parsing nama_periode dari format Y-m
            $periodeCarbon = Carbon::createFromFormat('Y-m', $request->nama_periode);
            $periodeBulan = $periodeCarbon->format('m-Y');

            // Buat kode kas unik
            $nextId = KasWarga::max('id') + 1;
            $kodeKas = 'Kas-IN-' . $nextId . '-' . $bulan . '-' . $tahun;

            // Cek duplikat kode
            if (KasWarga::where('kode', $kodeKas)->exists()) {
                return redirect()->back()->withErrors(['kode' => 'Data kas masuk untuk bulan ini sudah tercatat.'])->withInput();
            }

            // Simpan data
            KasWarga::create([
                'kode'           => $kodeKas,
                'uraian_kas'     => $request->uraian_kas . ' ' . $periodeBulan,
                'tanggal_kas'    => $tanggalKas->format('Y-m-d'),
                'periode_bulan'  => $periodeBulan,
                'uang_masuk'     => $request->uang_masuk ?? 0,
                'uang_keluar'    => $request->uang_keluar ?? 0,
                'saldo'          => $request->saldo ?? 0,
                'keterangan'     => $request->keterangan,
            ]);

            return redirect()->route('kas.index')->with('success', 'Income lain berhasil ditambahkan.');
        } catch (\Exception $e) {
            Log::error('Gagal simpan income lain: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data.'])->withInput();
        }
    }

    public function store(Request $request)
{
    try {
        // Validasi input
        $validated = $request->validate([
            'uraian_kas'     => 'required|string|max:255',
            'tanggal_kas'    => 'required|date',
            'nama_periode'   => 'required|date_format:m/Y|exists:periodes,nama_periode',
            'periode_bulan'  => 'nullable|string|max:255',
            'uang_masuk'     => 'nullable|numeric|min:0',
            'uang_keluar'    => 'nullable|numeric|min:0',
            'saldo'          => 'nullable|numeric',
            'keterangan'     => 'nullable|string|max:255',
        ]);

        // Format tanggal
        $tanggalKas = Carbon::parse($validated['tanggal_kas']);
        $bulan = $tanggalKas->format('m');
        $tahun = $tanggalKas->format('Y');

        // Format nama_periode dari m/Y ke m-Y
        $periodeFormatted = Carbon::createFromFormat('m/Y', $validated['nama_periode'])->format('m-Y');

        // Generate kode kas
        $nextId = KasWarga::max('id') + 1;
        $kodeKas = 'Kas-IN-' . $nextId . '-' . $bulan . '-' . $tahun;

        // Cek jika kode kas sudah ada → hentikan proses
        if (KasWarga::where('kode', $kodeKas)->exists()) {
            return redirect()->back()->withErrors([
                'kode' => 'Data kas masuk untuk bulan ini sudah tercatat.',
            ])->withInput();
        }

        // Hitung saldo
        $uangMasuk  = $validated['uang_masuk'] ?? 0;
        $uangKeluar = $validated['uang_keluar'] ?? 0;
        $saldo      = $uangMasuk - $uangKeluar;

        // Simpan ke database
        KasWarga::create([
            'kode'           => $kodeKas,
            'uraian_kas'     => $validated['uraian_kas'] . ' ' . $periodeFormatted,
            'tanggal_kas'    => $tanggalKas->format('Y-m-d'),
            'periode_bulan'  => $periodeFormatted,
            'uang_masuk'     => $uangMasuk,
            'uang_keluar'    => $uangKeluar,
            'saldo'          => $saldo,
            'keterangan'     => $validated['keterangan'] ?? null,
        ]);

        return redirect()->route('kas.index')->with('success', 'Data berhasil ditambahkan.');
    } catch (\Exception $e) {
        Log::error('Gagal menyimpan kas: ' . $e->getMessage());

        return redirect()->route('kas.index')->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
    }
}





    public function storeKasOut(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'pengeluaranKas' => 'required|array',
            'pengeluaranKas.*.id' => 'required|numeric',
            'pengeluaranKas.*.uraian_kas' => 'required|string|max:255',
            'pengeluaranKas.*.tanggal_kas' => 'required|date',
            'pengeluaranKas.*.periode_bulan' => 'required|string|max:255',
            'pengeluaranKas.*.uang_masuk' => 'nullable|numeric|min:0',
            'pengeluaranKas.*.uang_keluar' => 'nullable|numeric|min:0',
            'pengeluaranKas.*.keterangan' => 'nullable|string|max:255',
        ]);


        DB::beginTransaction();

        try {
            // Ambil saldo terakhir dari entri terakhir
            $lastSaldo = KasWarga::orderByDesc('tanggal_kas')->orderByDesc('id')->first()?->saldo ?? 0;

            foreach ($request->pengeluaranKas as $data) {
                $uangMasuk = $data['uang_masuk'] ?? 0;
                $uangKeluar = $data['uang_keluar'] ?? 0;

                // Hitung saldo berjalan
                $saldoBaru = $lastSaldo + $uangMasuk - $uangKeluar;

                // Generate kode_kas (ID akan otomatis terisi setelah create, jadi pakai uniqid() atau timestamp sementara)

                $kodeKas = 'Kas-OUT-' . $data['id'] . '-' . str_replace('-', '', Carbon::parse($data['periode_bulan'])->format('m-Y'));

                // Cek apakah kode kas sudah ada
                if (KasWarga::where('kode', $kodeKas)->exists()) {
                    throw new \Exception('Kode kas ' . $kodeKas . ' sudah ada.');
                }



                KasWarga::create([
                    'kode' => $kodeKas,
                    'uraian_kas' => $data['uraian_kas'],
                    'tanggal_kas' => Carbon::parse($data['tanggal_kas'])->format('Y-m-d'),
                    'periode_bulan' => Carbon::createFromFormat('m-Y', $request->nama_periode)->format('m-Y'),
                    'uang_masuk' => $uangMasuk,
                    'uang_keluar' => $uangKeluar,
                    'saldo' => $saldoBaru,
                    'keterangan' => $data['keterangan'] ?? null,
                ]);

                // Perbarui saldo terakhir
                $lastSaldo = $saldoBaru;
            }

            DB::commit();
            return redirect()->route('kas.index')->with('success', 'Transaksi kas berhasil disimpan.');
        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['msg' => 'Gagal menyimpan: ' . $e->getMessage()]);
        }
    }

  
    public function show($id)
    {
        // Logic to display a specific kas entry
    }

    
    public function edit($id)
    {
        // Logic to show the form for editing a specific kas entry
    }

 
    public function update(Request $request, $id)
    {
        $request->validate([
            'uraian_kas' => 'required|string|max:255',
            'tanggal_kas' => 'required|date',
            'periode_bulan' => 'required|string|max:255',
            'uang_masuk' => 'nullable|numeric|min:0',
            'uang_keluar' => 'nullable|numeric|min:0',
            'keterangan' => 'nullable|string|max:255',
        ]);
        $kasWarga = KasWarga::findOrFail($id);
        $kasWarga->update($request->all());
        return redirect()->route('kas.index')->with('success', 'Data kas berhasil diperbarui.');
    }

   
    public function destroy($id)
    {
        $kasWarga = KasWarga::findOrFail($id);

        // Hapus entri kas
        $kasWarga->delete();

        return redirect()->route('kas.index')->with('success', 'Data kas berhasil dihapus.');
    }
}
