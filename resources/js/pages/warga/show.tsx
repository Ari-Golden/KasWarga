import { usePage } from "@inertiajs/react";
import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, SortingState, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

function formatDate(dateString: string) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return isNaN(date.getTime())
        ? "-"
        : date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
}

type IuranWarga = {
    id: number;
    tgl_bayar: string;
    jenis_iuran: { nama_jenis_iuran: string };
    jumlah: number;
};


export default function WargaShow() {
    const { warga, iuranWargas } = usePage().props as unknown as { warga: any; iuranWargas: IuranWarga[] };

    if (!warga) return <div>Data warga tidak ditemukan.</div>;

    // Table columns definition
    const columns = React.useMemo<ColumnDef<IuranWarga, any>[]>(
        () => [
            {
                accessorKey: 'tgl_bayar',
                header: ({ column }) => (
                    <button
                        type="button"
                        className="flex items-center gap-1 font-semibold"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Tanggal Pembayaran <ArrowUpDown className="ml-1 h-4 w-4" />
                    </button>
                ),
                cell: (info) => formatDate(info.getValue()),
            },
            {
                accessorKey: 'jenis_iuran.nama_jenis_iuran',
                header: ({ column }) => (
                    <button
                        type="button"
                        className="flex items-center gap-1 font-semibold"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Jenis Iuran <ArrowUpDown className="ml-1 h-4 w-4" />
                    </button>
                ),
                cell: (info) => info.row.original.jenis_iuran?.nama_jenis_iuran || "-",
            },
            {
                accessorKey: 'jumlah',
                header: ({ column }) => (
                    <button
                        type="button"
                        className="flex items-center gap-1 font-semibold"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Jumlah <ArrowUpDown className="ml-1 h-4 w-4" />
                    </button>
                ),
                cell: (info) => (
                    <span>
                        Rp {Number(info.getValue()).toLocaleString("id-ID")}
                    </span>
                ),
            },
        ],
        []
    );

    function DataTable<TData, TValue>({ columns, data }: { columns: ColumnDef<TData, TValue>[]; data: TData[] }) {
        const [sorting, setSorting] = React.useState<SortingState>([]);
        const table = useReactTable({
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            onSortingChange: setSorting,
            getSortedRowModel: getSortedRowModel(),
            state: { sorting },
        });

        return (
            <>
                <Table className="min-w-full bg-white rounded-lg shadow">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="border-b px-4 py-2">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Tidak ada data pembayaran.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <button
                        className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </button>
                    <button
                        className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </button>
                </div>
            </>
        );
    }

    return (
        <Card className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg dark:bg-gray-800 md:mt-12">
            <CardHeader>
                <CardTitle className="text-2xl font-bold mb-2">Profil Warga</CardTitle>               
            </CardHeader>
            <CardContent>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div>
                        <Label htmlFor="nama">Nama</Label>
                        <Input id="nama" value={warga.nama} readOnly className="bg-gray-100" />
                    </div>
                    <div>
                        <Label htmlFor="alamat">Alamat</Label>
                        <Input id="alamat" value={warga.alamat} readOnly className="bg-gray-100" />
                    </div>
                    <div>
                        <Label htmlFor="no_hp">No HP</Label>
                        <Input id="no_hp" value={warga.no_hp || "-"} readOnly className="bg-gray-100" />
                    </div>
                    <div>
                        <Label htmlFor="no_kk">No KK</Label>
                        <Input id="no_kk" value={warga.no_kk || "-"} readOnly className="bg-gray-100" />
                    </div>
                    <div>
                        <Label htmlFor="no_ktp">No KTP</Label>
                        <Input id="no_ktp" value={warga.no_ktp || "-"} readOnly className="bg-gray-100" />
                    </div>
                    <div>
                        <Label htmlFor="rt_rw">RT/RW</Label>
                        <Input id="rt_rw" value={warga.rt_rw || "-"} readOnly className="bg-gray-100" />
                    </div>
                </form>
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Riwayat Pembayaran Iuran</h2>
                    <DataTable columns={columns} data={iuranWargas || []} />
                </div>
            </CardContent>
             <Button
                    
                    className="mt-2"
                    onClick={() => window.history.back()}
                >
                    Kembali
                </Button>
        </Card>
    );
}
