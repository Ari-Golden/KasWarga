import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Head } from '@inertiajs/react';
import LaporanKasTable from './dataKas';

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from '@/components/ui/tabs';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface IndexProps {
    pengeluarans?: any[]; // opsional
}

export default function Index({ pengeluarans = [] }: IndexProps) {
    // default array kosong

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
                <div className="flex flex-1 flex-col min-h-screen min-w-0">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        
                        <div className="flex flex-col gap-4 py-4 md:gap-4 md:py-4 ml-6 mr-6">
                            <h2 className="text-xl font-semibold">Pembuatan Laporan Kas</h2>
                            <p className="text-muted-foreground">
                                Daftar Laporan kas warga.
                            </p>
                            <span className="text-sm text-muted-foreground">
                                Silahkan buat periode laporan kas terlebih dahulu sebelum membuat laporan kas.
                            </span>
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <div className="flex w-full max-w-2xl items-start gap-4">
                                    <form className="flex flex-wrap gap-4 w-full items-end">
                                        <div className="flex flex-col gap-1.5">
                                            <Label htmlFor="nama-periode">Nama Periode</Label>
                                            <Input
                                                id="nama-periode"
                                                name="namaPeriode"
                                                placeholder="Masukkan nama periode"
                                                type="text"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <Label htmlFor="tgl-mulai">Tanggal Mulai</Label>
                                            <Input
                                                id="tgl-mulai"
                                                name="tglMulai"
                                                type="date"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <Label htmlFor="tgl-akhir">Tanggal Akhir</Label>
                                            <Input
                                                id="tgl-akhir"
                                                name="tglAkhir"
                                                type="date"
                                            />
                                        </div>
                                        <Button type="submit" className="self-end">Simpan Periode</Button>
                                    </form>
                                </div>
                            </div>

                        <Tabs defaultValue="General Kas" className="w-full">
                            <TabsList>
                                <TabsTrigger value="General Kas">General Kas</TabsTrigger>
                                <TabsTrigger value="Iuran Bulanan">Iuran Bulanan</TabsTrigger>
                                <TabsTrigger value="Pemasukan Lain">Pemasukan lain</TabsTrigger>
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
                                            <LaporanKasTable />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save changes</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="Iuran Bulanan">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Iuran Bulanan</CardTitle>
                                        <CardDescription>Penarikan data Iuran bulanan</CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-6">
                                       disini akan ditampilkan data iuran bulanan warga
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Kirim Ke Kas</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="Pemasukan Lain">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Pemasukan Lain</CardTitle>
                                        <CardDescription>Penarikan Data Pemasukan Lain</CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-6">
                                        Disini akan ditampilkan data pemasukan lain warga
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Kirim Ke Kas</Button>
                                    </CardFooter>
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
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Kirim Ke Kas</Button>
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
