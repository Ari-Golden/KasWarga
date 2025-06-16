import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';

type JenisIuran = {
    id: number;
    nama_jenis_iuran: string;
    keterangan?: string;
};

interface ListJenisIuranProps {
    jenisIuran: JenisIuran[];
}

export default function ListJenisIuran({ jenisIuran }: ListJenisIuranProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState<JenisIuran[]>(jenisIuran || []);
    const [formData, setFormData] = useState({
        nama_jenis_iuran: '',
        keterangan: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [currentJenis, setCurrentJenis] = useState<JenisIuran | null>(null);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredData(jenisIuran);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredData(
                jenisIuran.filter((i) => i.nama_jenis_iuran.toLowerCase().includes(lower) || (i.keterangan?.toLowerCase().includes(lower) ?? false)),
            );
        }
    }, [searchTerm, jenisIuran]);

    // Fungsi untuk membuka modal tambah/edit data
    const openModal = (jenis: JenisIuran | null = null) => {
        setCurrentJenis(jenis);
        setFormData(
            jenis
                ? {
                      nama_jenis_iuran: jenis.nama_jenis_iuran,
                      keterangan: jenis.keterangan ?? '',
                  }
                : {
                      nama_jenis_iuran: '',
                      keterangan: '',
                  },
        );
        setIsModalOpen(true);
    };

    // Fungsi untuk submit form tambah/edit data
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const payload = {
            nama_jenis_iuran: formData.nama_jenis_iuran,
            keterangan: formData.keterangan,
        };
        if (currentJenis) {
            // Edit data
            router.put(route('jenis-iuran.update', currentJenis.id), payload, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            // Tambah data
            router.post(route('jenis-iuran.store'), payload, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const confirmDelete = (jenis: JenisIuran) => {
        setCurrentJenis(jenis);
        setIsDeleteConfirmOpen(true);
    };

    const handleDelete = () => {
        if (!currentJenis) return;
        router.delete(route('jenis-iuran.destroy', currentJenis.id), {
            onSuccess: () => setIsDeleteConfirmOpen(false),
        });
    };

    const columns = useMemo<ColumnDef<JenisIuran, any>[]>(
        () => [
            {
                header: 'ID',
                cell: (info) => info.row.index + 1,
            },
            {
                accessorKey: 'nama_jenis_iuran',
                header: ({ column }: { column: any }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Nama Jenis Iuran <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
            },
            {
                accessorKey: 'keterangan',
                header: 'Keterangan',
                cell: (info: any) => info.getValue() || '-',
            },
            {
                header: 'Aksi',
                cell: ({ row }: { row: any }) => (
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
                    placeholder="Cari..."
                    className="rounded border p-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div>
                    <Button onClick={() => openModal(null)}>+ Tambah Jenis Iuran</Button>
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
                        <TableCell colSpan={columns.length} className="text-right font-bold">
                            Total: {filteredData.length} Jenis Iuran
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
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="z-50 w-full max-w-md rounded bg-white p-6 shadow">
                    <h2 className="mb-4 text-lg font-bold">{currentJenis ? 'Edit' : 'Tambah'} Jenis Iuran</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nama Jenis Iuran"
                            value={formData.nama_jenis_iuran}
                            onChange={(e) => setFormData({ ...formData, nama_jenis_iuran: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Keterangan"
                            value={formData.keterangan}
                            onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                            className="w-full rounded border p-2"
                        />
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit">Simpan</Button>
                        </div>
                    </form>
                </div>
            </Dialog>
            <Dialog
                open={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="z-50 w-full max-w-sm rounded bg-white p-6 shadow">
                    <h2 className="mb-4 text-lg font-bold">Konfirmasi Hapus</h2>
                    <p>Apakah Anda yakin ingin menghapus data ini?</p>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setIsDeleteConfirmOpen(false)}>
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Hapus
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
