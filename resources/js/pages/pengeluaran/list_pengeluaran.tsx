import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';

import { Link } from '@inertiajs/react';

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

type Pengeluaran = {
    id: number;
    kategori: string;
    nama_pengeluaran: string;
    periode_bulan: string;
    tgl_bayar: string;
    jumlah: number;
    keterangan?: string;
};

interface ListPengeluaranProps {
    pengeluarans: Pengeluaran[];
   
}

export default function ListPengeluaran({ pengeluarans}: ListPengeluaranProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState<Pengeluaran[]>(pengeluarans || []);
    const [formData, setFormData] = useState({
        nama_pengeluaran: '',
        kategori: '', // Assuming this is not used in the form
        periode_bulan: '', // Assuming this is the same as tanggal
        tgl_bayar: '',
        jumlah: '',
        keterangan: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [currentPengeluaran, setCurrentPengeluaran] = useState<Pengeluaran | null>(null);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredData(pengeluarans);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredData(
                pengeluarans.filter(
                    (p) =>
                        p.kategori.toLowerCase().includes(lower) ||
                        p.nama_pengeluaran.toLowerCase().includes(lower) ||
                        p.periode_bulan.toLowerCase().includes(lower) ||                       
                        p.tgl_bayar.toLowerCase().includes(lower) ||
                        p.jumlah.toString().includes(lower) ||
                        (p.keterangan || '').toLowerCase().includes(lower)
                ),
            );
        }
    }, [searchTerm, pengeluarans]);

    const openModal = (pengeluaran: Pengeluaran | null = null) => {
        setCurrentPengeluaran(pengeluaran);
        setFormData(
            pengeluaran
                ? {
                    kategori: pengeluaran.kategori || '', // Assuming this is not used in the form
                      nama_pengeluaran: pengeluaran.nama_pengeluaran,
                      periode_bulan: pengeluaran.periode_bulan, // Assuming this is the same as tanggal
                      tgl_bayar: pengeluaran.tgl_bayar,
                      jumlah: pengeluaran.jumlah.toString(),
                      keterangan: pengeluaran.keterangan || '',
                  }
                : {
                        kategori: '', // Assuming this is not used in the form
                      nama_pengeluaran: '',
                      periode_bulan: '', // Assuming this is the same as tanggal
                      tgl_bayar: '',
                      jumlah: '',
                      keterangan: '',
                  },
        );
        setIsModalOpen(true);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const payload = {
            kategori: formData.kategori, // Assuming this is not used in the form
            nama_pengeluaran: formData.nama_pengeluaran,
            periode_bulan: formData.periode_bulan, // Assuming this is the same as tanggal
            tgl_bayar: formData.tgl_bayar,
            jumlah: Number(formData.jumlah),
            keterangan: formData.keterangan,
        };
        if (currentPengeluaran) {
            router.put(route('pengeluaran.update', currentPengeluaran.id), payload, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            router.post(route('pengeluaran.store',), payload, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const confirmDelete = (p: Pengeluaran) => {
        setCurrentPengeluaran(p);
        setIsDeleteConfirmOpen(true);
    };

    const handleDelete = () => {
        if (!currentPengeluaran) return;
        router.delete(route('pengeluaran.destroy', currentPengeluaran.id), {
            onSuccess: () => setIsDeleteConfirmOpen(false),
        });
    };

    const columns = useMemo<ColumnDef<Pengeluaran, any>[]>(
        () => [
            {
                header: 'No',
                cell: (info) => info.row.index + 1,
            },
            {
                accessorKey: 'kategori',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Kategori <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'nama_pengeluaran',
                header: 'Nama Pengeluaran',
                cell: (info) => info.getValue(),
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
                        Tanggal Bayar <ArrowUpDown className="ml-2 h-4 w-4" />
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
                cell: (info) => `Rp. ${Number(info.getValue()).toLocaleString('id-ID')}`,
            },
            {
                accessorKey: 'keterangan',
                header: 'Keterangan',
                cell: (info) => info.getValue() || '-',
            },
            {
                header: 'Aksi',
                cell: ({ row }) => (
                    <div>
                        <button className="text-blue-500 hover:underline" onClick={() => openModal(row.original)}>
                            Edit
                        </button>
                        <button className="ml-2 text-red-500 hover:underline" onClick={() => confirmDelete(row.original)}>
                            Hapus
                        </button>
                    </div>
                ),
            },
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

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-between">
                <input
                    type="text"
                    placeholder="Cari pengeluaran..."
                    className="rounded border p-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                <div className="mb-4">
                    <Button onClick={() => openModal()} className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                        + Tambah Pengeluaran
                    </Button>
                </div>
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
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={columns.length - 2} className="font-bold text-right">
                            Total
                        </TableCell>
                        <TableCell className="font-bold" colSpan={2}>
                            Rp. {filteredData.reduce((sum, p) => sum + Number(p.jumlah), 0).toLocaleString('id-ID')}
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
            <DialogPanel className="w-full max-w-md rounded bg-white p-6 shadow">
                <DialogTitle className="mb-4 text-lg font-bold">{currentPengeluaran ? 'Edit' : 'Tambah'} Pengeluaran</DialogTitle>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Nama Pengeluaran</label>
                        <input
                            type="text"
                            value={formData.nama_pengeluaran}
                            onChange={(e) => setFormData({ ...formData, nama_pengeluaran: e.target.value })}
                            className="w-full rounded border p-2"
                            required />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Kategori</label>
                        <select
                            value={formData.kategori}
                            onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        >
                            <option value="">Pilih Kategori</option>
                            <option value="Kas">Kas</option>
                            <option value="Rukem">Rukem</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Periode Bulan</label>
                        <input
                            type="month"
                            value={formData.periode_bulan}
                            onChange={(e) => setFormData({ ...formData, periode_bulan: e.target.value })}
                            className="w-full rounded border p-2"
                            required />
                    </div>
                    <input
                            type="date"
                            placeholder="Tanggal Bayar"
                            value={formData.tgl_bayar}
                            onChange={(e) => setFormData({ ...formData, tgl_bayar: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />
                        {currentPengeluaran && (
                            <div className="text-sm text-gray-500">
                                Tanggal lama: {formatDate(currentPengeluaran.tgl_bayar)}
                            </div>
                        )}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Jumlah</label>
                        <input
                            type="number"
                            value={formData.jumlah}
                            onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
                            className="w-full rounded border p-2"
                            required />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Keterangan</label>
                        <input
                            type="text"
                            value={formData.keterangan}
                            onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                            className="w-full rounded border p-2" />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Batal
                        </Button>
                        <Button type="submit">Simpan</Button>
                    </div>
                </form>
            </DialogPanel>
        </Dialog>
        <Dialog
            open={isDeleteConfirmOpen}
            onClose={() => setIsDeleteConfirmOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
                <DialogPanel className="w-full max-w-sm rounded bg-white p-6 shadow">
                    <DialogTitle className="mb-4 text-lg font-bold">Konfirmasi Hapus</DialogTitle>
                    <p>Apakah Anda yakin ingin menghapus data ini?</p>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setIsDeleteConfirmOpen(false)}>
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Hapus
                        </Button>
                    </div>
                </DialogPanel>
            </Dialog>
        </div>
    );
}
