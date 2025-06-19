import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, TableRowsSplit } from 'lucide-react';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';

import { Link } from '@inertiajs/react';
import { Label } from '@/components/ui/label';

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

type Iuran = {
    id: number;
    id_warga: number;
    warga: {
        id: number;
        nama: string;
    };
    id_jenis_iuran: number;
    jenis_iuran: {
        id: number;
        nama_jenis_iuran: string;
    };
    periode_bulan: string;
    tgl_bayar: string;
    jumlah: number;
};

interface ListIuranProps {
    iurans: Iuran[];
    wargas?: { id: number; nama: string }[]; // Optional list of warga for combobox
    jenisIuran?: { id: number; nama_jenis_iuran: string }[]; // Optional list of jenis iuran for combobox
}

export default function ListIuran({ iurans, wargas, jenisIuran }: ListIuranProps) {   
   
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState<Iuran[]>(iurans || []);
    const [formData, setFormData] = useState({
        id_warga: '',
        id_jenis_iuran: '',
        periode_bulan: '',
        tgl_bayar: '',
        jumlah: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [currentIuran, setCurrentIuran] = useState<Iuran | null>(null);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredData(iurans);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredData(
                iurans.filter(
                    (i) =>
                        i.warga?.nama?.toLowerCase().includes(lower) ||
                        '' ||
                        i.id_warga.toString().includes(lower) ||
                        i.jenis_iuran?.nama_jenis_iuran.toLowerCase().includes(lower) ||
                        i.id_jenis_iuran.toString().includes(lower) ||
                        i.periode_bulan.toLowerCase().includes(lower) ||
                        i.tgl_bayar.toLowerCase().includes(lower) ||
                        i.jumlah.toString().includes(lower),
                ),
            );
        }
    }, [searchTerm, iurans]);

    const openModal = (iuran: Iuran | null = null) => {
        setCurrentIuran(iuran);
        setFormData(
            iuran
                ? {
                      id_warga: iuran.id_warga.toString(),
                      id_jenis_iuran: iuran.id_jenis_iuran.toString(),
                      periode_bulan: iuran.periode_bulan,
                      tgl_bayar: iuran.tgl_bayar,
                      jumlah: iuran.jumlah.toString(),
                  }
                : {
                      id_warga: '',
                      id_jenis_iuran: '',
                      periode_bulan: '',
                      tgl_bayar: '',
                      jumlah: '',
                  },
        );
        setIsModalOpen(true);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const payload = {
            id_warga: Number(formData.id_warga),
            id_jenis_iuran: Number(formData.id_jenis_iuran),
            periode_bulan: formData.periode_bulan,
            tgl_bayar: formData.tgl_bayar,
            jumlah: Number(formData.jumlah),
        };
        if (currentIuran) {
            router.put(route('iuran-warga.update', currentIuran.id), payload, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            router.post(route('iuran-warga.store'), payload, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const confirmDelete = (i: Iuran) => {
        setCurrentIuran(i);
        setIsDeleteConfirmOpen(true);
    };

    const handleDelete = () => {
        if (!currentIuran) return;
        router.delete(route('iuran.destroy', currentIuran.id), {
            onSuccess: () => setIsDeleteConfirmOpen(false),
        });
    };

    const columns = useMemo<ColumnDef<Iuran, any>[]>(
        () => [
            {
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        No <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                accessorKey: 'id',
                cell: (info) => info.row.index + 1,
            },
            {
                accessorFn: (row) => row.warga?.nama ?? '-',
                id: 'nama_warga',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Nama Warga <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => (
                    <Link
                        className="text-blue-500 hover:underline"
                        href={route('warga.show', info.row.original.id_warga)}
                    >
                        {info.getValue()}
                    </Link>
                ),
            },
            {
                accessorKey: 'id_jenis_iuran',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Jenis Iuran <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => info.row.original.jenis_iuran?.nama_jenis_iuran ?? '-',
            },
            {
                accessorKey: 'periode_bulan',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Periode Bulan <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'tgl_bayar',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Tgl Bayar <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => formatDate(info.getValue()),
            },
            {
                accessorKey: 'jumlah',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Jumlah <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) =>
                    `Rp. ${Number(info.getValue()).toLocaleString('id-ID')}`,
            },
            // {
            //     header: 'Aksi',
            //     cell: ({ row }) => (
            //         <div>
            //             <button className="text-blue-500 hover:underline" onClick={() => openModal(row.original)}>
            //                 Edit
            //             </button>
            //             <button className="ml-2 text-red-500 hover:underline" onClick={() => confirmDelete(row.original)}>
            //                 Hapus
            //             </button>
            //         </div>
            //     ),
            // },
        ],
        [],
    );

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {},
    });
    console.log(wargas)

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-between">
                <input
                    type="text"
                    placeholder="Cari..."
                    className="rounded border p-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <div className="mb-4">
                    <Link href={route('iuran-warga.create')} className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                        + Tambah Iuran
                    </Link>
                </div> */}
            </div>

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <>
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}
                            </TableRow>
                            
                        </>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={columns.length - 1} className="font-bold text-right">
                            Total
                        </TableCell>
                        <TableCell className="font-bold">
                            Rp. {filteredData.reduce((sum, i) => sum + Number(i.jumlah), 0).toLocaleString('id-ID')}
                        </TableCell>
                    </TableRow>
                </TableFooter> 
            </Table>

            <div className="mt-4 flex items-center justify-between">
                <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Sebelumnya
                </Button>
                <span>
                    Halaman {table.getState().pagination.pageIndex + 1} dari {table.getPageCount()}
                </span>
                <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Selanjutnya
                </Button>
            </div>

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
                <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow">
                    <Dialog.Title className="mb-4 text-lg font-bold">{currentIuran ? 'Edit' : 'Tambah'} Iuran</Dialog.Title>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="number"
                            placeholder="ID Warga"
                            value={formData.id_warga}
                            onChange={(e) => setFormData({ ...formData, id_warga: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />

                        <input
                            placeholder="Nama Warga"
                            value={wargas?.find((w) => w.id.toString() === formData.id_warga)?.nama || ''}
                            readOnly
                            className="w-full rounded border bg-gray-100 p-2"
                        />
                        <input
                            type="hidden"
                            placeholder="ID Jenis Iuran"
                            value={formData.id_jenis_iuran}
                            onChange={(e) => setFormData({ ...formData, id_jenis_iuran: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />
                        <input
                            placeholder="Nama Jenis Iuran"
                            value={jenisIuran?.find((j) => j.id.toString() === formData.id_jenis_iuran)?.nama_jenis_iuran || ''}
                            readOnly
                            className="w-full rounded border bg-gray-100 p-2"
                        />
                        <input
                            type="month"
                            placeholder="Periode Bulan"
                            value={formData.periode_bulan}
                            onChange={(e) => setFormData({ ...formData, periode_bulan: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />
                        <input
                            type="date"
                            placeholder="Tanggal Bayar"
                            value={
                                currentIuran
                                    ? formData.tgl_bayar
                                    : formData.tgl_bayar
                            }
                            onChange={(e) => setFormData({ ...formData, tgl_bayar: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />
                        {currentIuran && (
                            <div className="text-sm text-gray-500">
                                Tanggal lama: {formatDate(currentIuran.tgl_bayar)}
                            </div>
                        )}
                        <input
                            type="number"
                            placeholder="Jumlah"
                            value={formData.jumlah}
                            onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit">Simpan</Button>
                        </div>
                    </form>
                </Dialog.Panel>
            </Dialog>

            <Dialog
                open={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6 shadow">
                    <Dialog.Title className="mb-4 text-lg font-bold">Konfirmasi Hapus</Dialog.Title>
                    <p>Apakah Anda yakin ingin menghapus data ini?</p>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setIsDeleteConfirmOpen(false)}>
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Hapus
                        </Button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}
