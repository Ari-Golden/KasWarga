import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Head } from '@inertiajs/react';
import LaporanKasTable from './dataKas';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import CreatePeriodeForm from './periode/creatre';
import DataPeriode from './periode/dataPeriode';

interface IndexProps {
    iurans?: any[]; // opsional
    wargas?: any[]; // opsional
    periodes?: any[]; // opsional
    kasWargas?: any[]; // opsional
    pengeluaranKas?: any[]; // opsional
    kas?: any[]; // opsional
}

export default function Index(_: IndexProps) {
    // default array kosong
   

    const [selectedPeriode, setSelectedPeriode] = useState<string | undefined>(undefined);

    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <Head title="Daftar Iuran Warga" />
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex min-h-screen min-w-0 flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="mr-6 ml-6 flex flex-col gap-4 py-4 md:gap-4 md:py-4">
                            <h2 className="text-xl font-semibold">Pembuatan Laporan Kas</h2>
                            <p className="text-muted-foreground">Daftar Laporan kas warga.</p>
                            <span className="text-sm text-muted-foreground">
                                Silahkan buat periode laporan kas terlebih dahulu sebelum membuat laporan kas.
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
                                    <TabsTrigger value="General Kas">General Kas</TabsTrigger>
                                    <TabsTrigger value="Iuran Bulanan">Iuran Bulanan</TabsTrigger>                                    
                                    <TabsTrigger value="Pengeluaran Kas">Pengeluaran Kas</TabsTrigger>
                                </TabsList>
                                <TabsContent value="General Kas">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Kas Bulanan</CardTitle>
                                            <CardDescription>Make changes to your account here. Click save when you&apos;re done.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-6">
                                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                                <LaporanKasTable kasWargas={_.kasWargas || []} />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            
                                        </CardFooter>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="Iuran Bulanan">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Iuran Bulanan</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-6">
                                            disini akan ditampilkan data iuran bulanan warga
                                            <div className="flex items-center gap-4 mb-4">
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
                                                        const filteredIurans = (_.iurans || []).filter((iuran) => {
                                                            if (!selectedPeriode) return true;
                                                            const periode = (_.periodes || []).find((p) => p.id?.toString() === selectedPeriode);
                                                            if (!periode) return false;
                                                            const tglBayar = iuran.tgl_bayar ? new Date(iuran.tgl_bayar) : null;
                                                            const tanggalMulai = periode.tanggal_mulai ? new Date(periode.tanggal_mulai) : null;
                                                            const tanggalAkhir = periode.tanggal_akhir ? new Date(periode.tanggal_akhir) : null;
                                                            if (!tglBayar || !tanggalMulai || !tanggalAkhir) return false;
                                                            return tglBayar >= tanggalMulai && tglBayar <= tanggalAkhir;
                                                        });

                                                        // Kirim ke inertia
                                                        import('@inertiajs/react').then(({ router }) => {
                                                            const periode = (_.periodes || []).find((p) => p.id?.toString() === selectedPeriode);
                                                            router.post('/kas', {
                                                                iurans: filteredIurans,
                                                                periode_id: selectedPeriode,
                                                                nama_periode: periode?.nama_periode || '',
                                                                uraian_kas: 'Iuran Bulanan',
                                                                tanggal_kas: new Date().toISOString().split('T')[0],
                                                                periode_bulan: selectedPeriode,
                                                                uang_masuk: filteredIurans.reduce((sum, iuran) => sum + (Number(iuran.jumlah) || 0), 0),
                                                                uang_keluar: 0,
                                                                saldo: filteredIurans.reduce((sum, iuran) => sum + (Number(iuran.jumlah) || 0), 0),
                                                                keterangan: '',
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
                                                <div className="text-sm text-muted-foreground">Silakan pilih periode untuk melihat data iuran.</div>
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
                                            <CardTitle>Pengeluaran Kas</CardTitle>
                                            <CardDescription>Penarikan Data Pengeluaran Kas</CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-6">
                                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                                Disini akan ditampilkan data pengeluaran kas warga
                                                <div className="flex items-center gap-4 mb-4">
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
                                                        const filteredPengeluaranKas = (_.pengeluaranKas || []).filter((pengeluaranKas) => {
                                                            if (!selectedPeriode) return true;
                                                            const periode = (_.periodes || []).find((p) => p.id?.toString() === selectedPeriode);
                                                            if (!periode) return false;
                                                            const tglBayar = pengeluaranKas.tgl_bayar ? new Date(pengeluaranKas.tgl_bayar) : null;
                                                            const tanggalMulai = periode.tanggal_mulai ? new Date(periode.tanggal_mulai) : null;
                                                            const tanggalAkhir = periode.tanggal_akhir ? new Date(periode.tanggal_akhir) : null;
                                                            if (!tglBayar || !tanggalMulai || !tanggalAkhir) return false;
                                                            return tglBayar >= tanggalMulai && tglBayar <= tanggalAkhir;
                                                        });

                                                        // Kirim ke inertia
                                                        import('@inertiajs/react').then(({ router }) => {
                                                            router.post('/kas/kas-out', {
                                                                pengeluaranKas: filteredPengeluaranKas.map((item: any) => ({
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
                                                <div className="text-sm text-muted-foreground">Silakan pilih periode untuk melihat data iuran.</div>
                                            )}
                                            <div className="mb-2 font-semibold">
                                                Total Pengeluaran: Rp{' '}
                                                {(_.pengeluaranKas || [])
                                                    .filter((pengeluaranKas) => {
                                                        if (!selectedPeriode) return true;
                                                        const periode = (_.periodes || []).find((p) => p.id?.toString() === selectedPeriode);
                                                        if (!periode) return false;
                                                        const tglBayar = pengeluaranKas.tgl_bayar ? new Date(pengeluaranKas.tgl_bayar) : null;
                                                        const tanggalMulai = periode.tanggal_mulai ? new Date(periode.tanggal_mulai) : null;
                                                        const tanggalAkhir = periode.tanggal_akhir ? new Date(periode.tanggal_akhir) : null;
                                                        if (!tglBayar || !tanggalMulai || !tanggalAkhir) return false;
                                                        return tglBayar >= tanggalMulai && tglBayar <= tanggalAkhir;
                                                    })
                                                    .reduce((sum, pengeluaranKas) => sum + (Number(pengeluaranKas.jumlah) || 0), 0)
                                                    .toLocaleString('id-ID')}
                                            </div>
                                            </div>
                                            {(_.pengeluaranKas || [])
                                                .filter((pengeluaranKas) => {
                                                    if (!selectedPeriode) return true;
                                                    const periode = (_.periodes || []).find((p) => p.id?.toString() === selectedPeriode);
                                                   if (!periode) return false;
                                                    const tglBayar = pengeluaranKas.tgl_bayar ? new Date(pengeluaranKas.tgl_bayar) : null;
                                                    const tanggalMulai = periode.tanggal_mulai ? new Date(periode.tanggal_mulai) : null;
                                                    const tanggalAkhir = periode.tanggal_akhir ? new Date(periode.tanggal_akhir) : null;
                                                    if (!tglBayar || !tanggalMulai || !tanggalAkhir) return false;
                                                    // Filter jika tgl_bayar berada di antara tanggal_mulai dan tanggal_akhir (inklusif)
                                                    return tglBayar >= tanggalMulai && tglBayar <= tanggalAkhir;
                                                })
                                                .map((pengeluaranKas, idx) => (
                                                    <div key={idx} className="mb-2 rounded border p-2">
                                                        <div>
                                                            <strong>id_kas_out:</strong> {pengeluaranKas.id || '-'}
                                                        </div>
                                                        <div>
                                                            <strong>Kategori:</strong> {pengeluaranKas.kategori || '-'}
                                                        </div>
                                                        <div>
                                                            <strong>Nama Pengeluaran:</strong> {pengeluaranKas.nama_pengeluaran || '-'}
                                                        </div>
                                                        <div>
                                                            <strong>Jumlah:</strong> Rp {Number(pengeluaranKas.jumlah || 0).toLocaleString('id-ID')}
                                                        </div>
                                                        <div>
                                                            <strong>Tanggal Bayar:</strong>{' '}
                                                            {pengeluaranKas.tgl_bayar
                                                                ? new Date(pengeluaranKas.tgl_bayar).toLocaleDateString('id-ID', {
                                                                      day: '2-digit',
                                                                      month: 'short',
                                                                      year: 'numeric',
                                                                  })
                                                                : '-'}
                                                        </div>
                                                        <div>
                                                            <strong>Keterangan:</strong> {pengeluaranKas.keterangan || '-'}
                                                        </div>
                                                    </div>
                                                ))}
                                        </CardContent>
                                        <CardFooter>
                                            
                                        </CardFooter>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
