import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreatePeriodeForm from '@/pages/kas/periode/creatre';
import DataPeriode from '@/pages/kas/periode/dataPeriode';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import LaporanKasTable from './dataKas';

interface IndexProps {
    iurans?: any[]; // opsional
    wargas?: any[]; // opsional
    periodes?: any[]; // opsional
    rukem?: any[]; // opsional
    pengeluaranRukem?: any[]; // opsional
    listIuran?: any[];
}

export default function Index(_: IndexProps) {
    // default array kosong

    const [selectedPeriode, setSelectedPeriode] = useState<string | undefined>(undefined);

    return (
        <>
            <SidebarProvider
                style={
                    {
                        '--sidebar-width': 'calc(var(--spacing) * 72)',
                        '--header-height': 'calc(var(--spacing) * 12)',
                    } as React.CSSProperties
                }
            >
                <Head title="Rukem" />
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex min-h-screen min-w-0 flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="mr-6 ml-6 flex flex-col gap-4 py-4 md:gap-4 md:py-4">
                                <h2 className="text-xl font-semibold">Pembuatan Laporan Kas Rukem</h2>
                                <p className="text-muted-foreground">Daftar Laporan Kas Rukem.</p>
                                <span className="text-sm text-muted-foreground">
                                    Silahkan Pilih Periode laporan kas Rukem terlebih dahulu sebelum membuat Laporan Kas Rukem.
                                </span>
                                <div className="flex w-full gap-4">
                                    <div className="w-[40%]">
                                        {/* Konten kolom kiri di sini */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Create Periode Laporan</CardTitle>
                                                <CardDescription>Buat Periode Laporan</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                                    <CreatePeriodeForm />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="w-[60%]">
                                        {/* Konten kolom kanan di sini */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Tabel Periode</CardTitle>
                                                <CardDescription>List periode laporan</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                {/* Tambahkan konten sesuai kebutuhan */}
                                                <DataPeriode periodes={_.periodes} />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>

                                <Tabs defaultValue="General Kas" className="w-full">
                                    <TabsList>
                                        <TabsTrigger value="General Kas">Kas Rukem</TabsTrigger>
                                        <TabsTrigger value="Iuran Rukem Bulanan">Iuran Rukem Bulanan</TabsTrigger>
                                        <TabsTrigger value="Pengeluaran Kas">Pengeluaran Kas Rukem</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="General Kas">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Kas Rukem Bulanan</CardTitle>
                                                <CardDescription>
                                                    Make changes to your account here. Click save when you&apos;re done.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="grid gap-6">
                                                <section className="container mx-auto">
                                                    <div className="flex flex-col gap-4 px-2 py-4 md:gap-6 md:px-6 md:py-6">
                                                        <LaporanKasTable kasWargas={_.rukem || []} />
                                                    </div>
                                                </section>
                                            </CardContent>
                                            <CardFooter></CardFooter>
                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="Iuran Rukem Bulanan">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Iuran Rukem Bulanan</CardTitle>
                                            </CardHeader>
                                            <CardContent className="grid gap-6">
                                                disini akan ditampilkan data iuran bulanan rukem warga
                                                <div className="mb-4 flex items-center gap-4">
                                                    <Select value={selectedPeriode} onValueChange={setSelectedPeriode}>
                                                        <SelectTrigger className="w-[200px]">
                                                            <SelectValue placeholder="Pilih Periode" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value={undefined as any}>All Data</SelectItem>
                                                            {(Array.isArray(_.periodes) ? _.periodes : []).map((periode: any) => (
                                                                <SelectItem key={periode.id} value={periode.id?.toString()}>
                                                                    {periode.nama_periode || `Periode ${periode.id}`}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <Button
                                                        onClick={() => {
                                                            const periode = (_.periodes || []).find((p) => p.id?.toString() === selectedPeriode);
                                                            

                                                            const filteredIurans = (_.iurans || []).filter((iuran) => {
                                                                if (!selectedPeriode) return true;
                                                                if (!periode) return false;

                                                                const tglBayar = iuran.tgl_bayar ? new Date(iuran.tgl_bayar) : null;
                                                                const tanggalMulai = periode.tanggal_mulai ? new Date(periode.tanggal_mulai) : null;
                                                                const tanggalAkhir = periode.tanggal_akhir ? new Date(periode.tanggal_akhir) : null;

                                                                if (!tglBayar || !tanggalMulai || !tanggalAkhir) return false;

                                                                return tglBayar >= tanggalMulai && tglBayar <= tanggalAkhir;
                                                            });

                                                            const totalUang = filteredIurans.reduce(
                                                                (sum, iuran) => sum + (Number(iuran.jumlah) || 0),
                                                                0,
                                                            );

                                                            const parsedNamaPeriode = (() => {
                                                                const parts = (periode?.nama_periode || '').split('/');
                                                                return parts.length === 2 ? `${parts[1]}-${parts[0]}` : '';
                                                            })();
                                                            

                                                            import('@inertiajs/react').then(({ router }) => {
                                                                router.post('/rukem', {
                                                                    iurans: filteredIurans,
                                                                    periode_id: selectedPeriode,
                                                                    nama_periode: parsedNamaPeriode,
                                                                    uraian_rukem: 'Iuran Rukem Bulanan',
                                                                    tanggal_kas_rukem: new Date().toISOString().split('T')[0],
                                                                    periode_bulan: selectedPeriode,
                                                                    uang_masuk_rukem: totalUang,
                                                                    uang_keluar_rukem: 0,
                                                                    saldo_rukem: totalUang,
                                                                    keterangan_rukem: '',
                                                                });
                                                            });
                                                        }}
                                                    >
                                                        Kirim data iuran bulanan Ke Kas
                                                    </Button>
                                                </div>
                                                {selectedPeriode ? (
                                                    (() => {
                                                        const periode = (_.periodes || []).find((p) => p.id?.toString() === selectedPeriode);
                                                        return periode ? (
                                                            <div className="mb-4 rounded border bg-muted p-2">
                                                                <div>
                                                                    <strong>Nama Periode:</strong> {periode.nama_periode || '-'}
                                                                </div>
                                                                <div>
                                                                    <strong>Tanggal Mulai:</strong>{' '}
                                                                    {periode.tanggal_mulai
                                                                        ? new Date(periode.tanggal_mulai).toLocaleDateString('id-ID', {
                                                                              day: '2-digit',
                                                                              month: 'short',
                                                                              year: 'numeric',
                                                                          })
                                                                        : '-'}
                                                                </div>
                                                                <div>
                                                                    <strong>Tanggal Akhir:</strong>{' '}
                                                                    {periode.tanggal_akhir
                                                                        ? new Date(periode.tanggal_akhir).toLocaleDateString('id-ID', {
                                                                              day: '2-digit',
                                                                              month: 'short',
                                                                              year: 'numeric',
                                                                          })
                                                                        : '-'}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="text-sm text-muted-foreground">Data periode tidak ditemukan.</div>
                                                        );
                                                    })()
                                                ) : (
                                                    <div className="text-sm text-muted-foreground">
                                                        Silakan pilih periode untuk melihat data iuran.
                                                    </div>
                                                )}
                                                <div className="mb-2 font-semibold">
                                                    Total Iuran: Rp{' '}
                                                    {(_.iurans || [])
                                                        .filter((iuran) => {
                                                            if (!selectedPeriode) return true;
                                                            const periode = (_.periodes || []).find((p) => p.id?.toString() === selectedPeriode);
                                                            if (!periode) return false;
                                                            const tglBayar = iuran.tgl_bayar ? new Date(iuran.tgl_bayar) : null;
                                                            const tanggalMulai = periode.tanggal_mulai ? new Date(periode.tanggal_mulai) : null;
                                                            const tanggalAkhir = periode.tanggal_akhir ? new Date(periode.tanggal_akhir) : null;
                                                            if (!tglBayar || !tanggalMulai || !tanggalAkhir) return false;
                                                            return tglBayar >= tanggalMulai && tglBayar <= tanggalAkhir;
                                                        })
                                                        .reduce((sum, iuran) => sum + (Number(iuran.jumlah) || 0), 0)
                                                        .toLocaleString('id-ID')}
                                                </div>
                                                {(_.iurans || [])

                                                    .filter((iuran) => {
                                                        // Jika "All Data" dipilih (selectedPeriode undefined/null/empty), tampilkan semua data
                                                        if (!selectedPeriode) return true;
                                                        // Cari periode yang dipilih
                                                        const periode = (_.periodes || []).find((p) => p.id?.toString() === selectedPeriode);
                                                        if (!periode) return false;
                                                        const tglBayar = iuran.tgl_bayar ? new Date(iuran.tgl_bayar) : null;
                                                        const tanggalMulai = periode.tanggal_mulai ? new Date(periode.tanggal_mulai) : null;
                                                        const tanggalAkhir = periode.tanggal_akhir ? new Date(periode.tanggal_akhir) : null;
                                                        if (!tglBayar || !tanggalMulai || !tanggalAkhir) return false;
                                                        // Filter jika tgl_bayar berada di antara tanggal_mulai dan tanggal_akhir (inklusif)
                                                        return tglBayar >= tanggalMulai && tglBayar <= tanggalAkhir;
                                                    })
                                                    .map((iuran, idx) => {
                                                        // Cari data warga yang sesuai dengan iuran.id_warga
                                                        const warga = (_.wargas || []).find((w) => w.id === iuran.id_warga);

                                                        return (
                                                            <div key={idx} className="mb-2 rounded border p-2">
                                                                <div>
                                                                    <strong>Nama:</strong> {warga?.nama || '-'}
                                                                </div>
                                                                <div>
                                                                    <strong>Jumlah:</strong> {iuran.jumlah || '-'}
                                                                </div>
                                                                <div>
                                                                    <strong>Tanggal:</strong>{' '}
                                                                    {iuran.tgl_bayar
                                                                        ? new Date(iuran.tgl_bayar).toLocaleDateString('id-ID', {
                                                                              day: '2-digit',
                                                                              month: 'short',
                                                                              year: 'numeric',
                                                                          })
                                                                        : '-'}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </CardContent>
                                            <CardFooter></CardFooter>
                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="Pengeluaran Kas">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Pengeluaran Kas Rukem</CardTitle>
                                                <CardDescription>Penarikan Data Pengeluaran Kas Rukem</CardDescription>
                                            </CardHeader>
                                            <CardContent className="grid gap-6">
                                                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                                    Disini akan ditampilkan data pengeluaran kas rukem warga
                                                    <div className="mb-4 flex items-center gap-4">
                                                        <Select value={selectedPeriode} onValueChange={setSelectedPeriode}>
                                                            <SelectTrigger className="w-[200px]">
                                                                <SelectValue placeholder="Pilih Periode" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value={undefined as any}>All Data</SelectItem>
                                                                {(Array.isArray(_.periodes) ? _.periodes : []).map((periode: any) => (
                                                                    <SelectItem key={periode.id} value={periode.id?.toString()}>
                                                                        {periode.nama_periode || `Periode ${periode.id}`}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <Button
                                                            onClick={() => {
                                                                // Kirim data iuran bulanan yang difilter ke kas Controller
                                                                const filteredPengeluaranRukem = (_.pengeluaranRukem || []).filter(
                                                                    (pengeluaranRukem) => {
                                                                        if (!selectedPeriode) return true;
                                                                        const periode = (_.periodes || []).find(
                                                                            (p) => p.id?.toString() === selectedPeriode,
                                                                        );
                                                                        if (!periode) return false;
                                                                        const tglBayar = pengeluaranRukem.tgl_bayar
                                                                            ? new Date(pengeluaranRukem.tgl_bayar)
                                                                            : null;
                                                                        const tanggalMulai = periode.tanggal_mulai
                                                                            ? new Date(periode.tanggal_mulai)
                                                                            : null;
                                                                        const tanggalAkhir = periode.tanggal_akhir
                                                                            ? new Date(periode.tanggal_akhir)
                                                                            : null;
                                                                        if (!tglBayar || !tanggalMulai || !tanggalAkhir) return false;
                                                                        return tglBayar >= tanggalMulai && tglBayar <= tanggalAkhir;
                                                                    },
                                                                );

                                                                // Kirim ke inertia
                                                                import('@inertiajs/react').then(({ router }) => {
                                                                    router.post('/rukem/rukem-out', {
                                                                        pengeluaranRukem: filteredPengeluaranRukem.map((item: any) => ({
                                                                            id: item.id,
                                                                            uraian_kas: item.nama_pengeluaran,
                                                                            tanggal_kas: item.tgl_bayar,
                                                                            periode_bulan: item.periode_bulan,
                                                                            uang_keluar: item.jumlah,
                                                                            keterangan: item.keterangan || '',
                                                                        })),

                                                                        // Data tambahan jika perlu
                                                                    });
                                                                });
                                                            }}
                                                        >
                                                            Kirim data iuran bulanan Ke Kas
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="mb-2 font-semibold">
                                                    {selectedPeriode ? (
                                                        (() => {
                                                            const periode = (_.periodes || []).find((p) => p.id?.toString() === selectedPeriode);
                                                            return periode ? (
                                                                <div className="mb-4 rounded border bg-muted p-2">
                                                                    <div>
                                                                        <strong>Nama Periode:</strong> {periode.nama_periode || '-'}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Tanggal Mulai:</strong>{' '}
                                                                        {periode.tanggal_mulai
                                                                            ? new Date(periode.tanggal_mulai).toLocaleDateString('id-ID', {
                                                                                  day: '2-digit',
                                                                                  month: 'short',
                                                                                  year: 'numeric',
                                                                              })
                                                                            : '-'}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Tanggal Akhir:</strong>{' '}
                                                                        {periode.tanggal_akhir
                                                                            ? new Date(periode.tanggal_akhir).toLocaleDateString('id-ID', {
                                                                                  day: '2-digit',
                                                                                  month: 'short',
                                                                                  year: 'numeric',
                                                                              })
                                                                            : '-'}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="text-sm text-muted-foreground">Data periode tidak ditemukan.</div>
                                                            );
                                                        })()
                                                    ) : (
                                                        <div className="text-sm text-muted-foreground">
                                                            Silakan pilih periode untuk melihat data iuran.
                                                        </div>
                                                    )}
                                                    <div className="mb-2 font-semibold">
                                                        Total Pengeluaran: Rp{' '}
                                                        {(_.pengeluaranRukem || [])
                                                            .filter((pengeluaranRukem) => {
                                                                if (!selectedPeriode) return true;
                                                                const periode = (_.periodes || []).find((p) => p.id?.toString() === selectedPeriode);
                                                                if (!periode) return false;
                                                                const tglBayar = pengeluaranRukem.tgl_bayar
                                                                    ? new Date(pengeluaranRukem.tgl_bayar)
                                                                    : null;
                                                                const tanggalMulai = periode.tanggal_mulai ? new Date(periode.tanggal_mulai) : null;
                                                                const tanggalAkhir = periode.tanggal_akhir ? new Date(periode.tanggal_akhir) : null;
                                                                if (!tglBayar || !tanggalMulai || !tanggalAkhir) return false;
                                                                return tglBayar >= tanggalMulai && tglBayar <= tanggalAkhir;
                                                            })
                                                            .reduce((sum, pengeluaranRukem) => sum + (Number(pengeluaranRukem.jumlah) || 0), 0)
                                                            .toLocaleString('id-ID')}
                                                    </div>
                                                </div>
                                                {(_.pengeluaranRukem || [])
                                                    .filter((pengeluaranRukem) => {
                                                        if (!selectedPeriode) return true;
                                                        const periode = (_.periodes || []).find((p) => p.id?.toString() === selectedPeriode);
                                                        if (!periode) return false;
                                                        const tglBayar = pengeluaranRukem.tgl_bayar ? new Date(pengeluaranRukem.tgl_bayar) : null;
                                                        const tanggalMulai = periode.tanggal_mulai ? new Date(periode.tanggal_mulai) : null;
                                                        const tanggalAkhir = periode.tanggal_akhir ? new Date(periode.tanggal_akhir) : null;
                                                        if (!tglBayar || !tanggalMulai || !tanggalAkhir) return false;
                                                        // Filter jika tgl_bayar berada di antara tanggal_mulai dan tanggal_akhir (inklusif)
                                                        return tglBayar >= tanggalMulai && tglBayar <= tanggalAkhir;
                                                    })
                                                    .map((pengeluaranRukem, idx) => (
                                                        <div key={idx} className="mb-2 rounded border p-2">
                                                            <div>
                                                                <strong>id_kas_out:</strong> {pengeluaranRukem.id || '-'}
                                                            </div>
                                                            <div>
                                                                <strong>Kategori:</strong> {pengeluaranRukem.kategori || '-'}
                                                            </div>
                                                            <div>
                                                                <strong>Nama Pengeluaran:</strong> {pengeluaranRukem.nama_pengeluaran || '-'}
                                                            </div>
                                                            <div>
                                                                <strong>Jumlah:</strong> Rp{' '}
                                                                {Number(pengeluaranRukem.jumlah || 0).toLocaleString('id-ID')}
                                                            </div>
                                                            <div>
                                                                <strong>Tanggal Bayar:</strong>{' '}
                                                                {pengeluaranRukem.tgl_bayar
                                                                    ? new Date(pengeluaranRukem.tgl_bayar).toLocaleDateString('id-ID', {
                                                                          day: '2-digit',
                                                                          month: 'short',
                                                                          year: 'numeric',
                                                                      })
                                                                    : '-'}
                                                            </div>
                                                            <div>
                                                                <strong>Keterangan:</strong> {pengeluaranRukem.keterangan || '-'}
                                                            </div>
                                                        </div>
                                                    ))}
                                            </CardContent>
                                            <CardFooter></CardFooter>
                                        </Card>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
