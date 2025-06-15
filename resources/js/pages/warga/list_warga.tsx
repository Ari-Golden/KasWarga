import * as React from "react";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, SortingState, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { ArrowUpDown } from "lucide-react";

type Warga = {
    id: number;
    nama: string;
    alamat: string;
    no_hp: string;
    no_kk?: string;
    no_ktp?: string;
    rt_rw?: string;
};

interface WargaIndexProps {
    warga: Warga[];
}

export default function WargaIndex({ warga }: WargaIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState<Warga[]>(warga || []);
    const [formData, setFormData] = useState({
        nama: '',
        alamat: '',
        no_hp: '',
        no_kk: '',
        no_ktp: '',
        rt_rw: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [currentWarga, setCurrentWarga] = useState<Warga | null>(null);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredData(warga);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredData(
                warga.filter(
                    (w) => w.nama.toLowerCase().includes(lower) || w.alamat.toLowerCase().includes(lower) || w.no_hp.toLowerCase().includes(lower),
                )
            );
        }
    }, [searchTerm, warga]);

    const openModal = (warga: Warga | null = null) => {
        setCurrentWarga(warga);
        setFormData(
            warga ? {
                nama: warga.nama,
                alamat: warga.alamat,
                no_hp: warga.no_hp,
                no_kk: warga.no_kk || '',
                no_ktp: warga.no_ktp || '',
                rt_rw: warga.rt_rw || '',
            } : {
                nama: '',
                alamat: '',
                no_hp: '',
                no_kk: '',
                no_ktp: '',
                rt_rw: '',
            }
        );
        setIsModalOpen(true);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (currentWarga) {
            router.put(route('warga.update', currentWarga.id), formData, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            router.post(route('warga.store'), formData, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const confirmDelete = (w: Warga) => {
        setCurrentWarga(w);
        setIsDeleteConfirmOpen(true);
    };

    const handleDelete = () => {
        if (!currentWarga) return;
        router.delete(route('warga.destroy', currentWarga.id), {
            onSuccess: () => setIsDeleteConfirmOpen(false),
        });
    };

    const columns = useMemo<ColumnDef<Warga, any>[]>(
        () => [
            {
                header: 'ID',
                cell: (info) => info.row.index + 1,
            },
            {
                accessorKey: 'nama',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Nama <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                ),
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'alamat',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Alamat <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                ),
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'no_hp',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>No HP <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                ),
                cell: (info) => info.getValue(),
            },
            {
                header: 'Aksi',
                cell: ({ row }) => (
                    <div>
                        <button className="text-blue-500 hover:underline" onClick={() => openModal(row.original)}>Edit</button>
                        <button className="ml-2 text-red-500 hover:underline" onClick={() => confirmDelete(row.original)}>Hapus</button>
                    </div>
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
            <div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
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
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto max-w-4xl rounded-lg bg-white p-4 shadow-md">
                <h1 className="mb-4 text-2xl font-bold">List Warga</h1>
                <div className="mb-4 flex flex-col gap-2 md:flex-row md:justify-between">
                    <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" onClick={() => openModal()}>
                        Tambah Warga
                    </button>
                    <input
                        type="text"
                        placeholder="Cari Warga..."
                        className="w-full rounded border px-4 py-2 md:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <p className="mb-2 text-gray-600">Total: {filteredData.length}</p>
                <DataTable columns={columns} data={filteredData} />
            </div>

            {/* Modal Tambah/Edit */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="fixed inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-full max-w-md rounded bg-white p-4">
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Nama" className="mb-2 w-full rounded border px-3 py-2" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} required />
                            <input type="text" placeholder="Alamat" className="mb-2 w-full rounded border px-3 py-2" value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} required />
                            <input type="text" placeholder="No HP" className="mb-2 w-full rounded border px-3 py-2" value={formData.no_hp} onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })} required />
                            <input type="text" placeholder="No KK" className="mb-2 w-full rounded border px-3 py-2" value={formData.no_kk} onChange={(e) => setFormData({ ...formData, no_kk: e.target.value })} />
                            <input type="text" placeholder="No KTP" className="mb-2 w-full rounded border px-3 py-2" value={formData.no_ktp} onChange={(e) => setFormData({ ...formData, no_ktp: e.target.value })} />
                            <input type="text" placeholder="RT/RW" className="mb-2 w-full rounded border px-3 py-2" value={formData.rt_rw} onChange={(e) => setFormData({ ...formData, rt_rw: e.target.value })} />
                            <div className="flex justify-end gap-2">
                                <button type="button" className="rounded bg-gray-300 px-3 py-2" onClick={() => setIsModalOpen(false)}>Batal</button>
                                <button type="submit" className="rounded bg-blue-500 px-3 py-2 text-white">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>

            {/* Modal Konfirmasi Hapus */}
            <Dialog open={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)}>
                <div className="fixed inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-full max-w-sm rounded bg-white p-4">
                        <p>Yakin hapus <strong>{currentWarga?.nama}</strong>?</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button className="rounded bg-gray-300 px-3 py-2" onClick={() => setIsDeleteConfirmOpen(false)}>Batal</button>
                            <button className="rounded bg-red-500 px-3 py-2 text-white" onClick={handleDelete}>Hapus</button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
