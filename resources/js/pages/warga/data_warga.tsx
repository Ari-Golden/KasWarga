/**
 * Renders a data table for managing resident (warga) information with search, pagination, and CRUD functionality.
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {Warga[]} props.wargas - Array of resident data to be displayed in the table
 * 
 * @returns {JSX.Element} A page with a table of residents, search input, and modal dialogs for adding/editing/deleting residents
 * 
 * @example
 * <DataWarga wargas={residentData} />
 */
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog } from '@headlessui/react';
import { Link, router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

type Warga = {
    id: number;
    nama: string;
    no_kk: string;
    no_ktp: string;
    alamat: string;
    rt_rw: string;
    no_hp: string;
    status: string;
};

interface DataWargaProps {
    wargas: Warga[];
}

export default function DataWarga({ wargas }: DataWargaProps) {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState<Warga[]>(wargas || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [currentWarga, setCurrentWarga] = useState<Warga | null>(null);
    const [formData, setFormData] = useState({
        nama: '',
        no_kk: '',
        no_ktp: '',
        alamat: '',
        rt_rw: '',
        no_hp: '',
        status: '',
    });

    useEffect(() => {
        if (!searchTerm) {
            setFilteredData(wargas);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredData(
                wargas.filter(
                    (w) =>
                        w.nama.toLowerCase().includes(lower) ||
                        w.no_ktp.toLowerCase().includes(lower) ||
                        w.alamat.toLowerCase().includes(lower) ||
                        w.no_hp.toLowerCase().includes(lower) ||
                        w.status.toLowerCase().includes(lower),
                ),
            );
        }
    }, [searchTerm, wargas]);

    const openModal = (warga: Warga | null = null) => {
        setCurrentWarga(warga);
        setFormData(
            warga
                ? {
                      nama: warga.nama,
                      no_kk: warga.no_kk,
                      no_ktp: warga.no_ktp,
                      alamat: warga.alamat,
                      rt_rw: warga.rt_rw,
                      no_hp: warga.no_hp,
                      status: warga.status,
                  }
                : {
                      nama: '',
                      no_kk: '',
                      no_ktp: '',
                      alamat: '',
                      rt_rw: '',
                      no_hp: '',
                      status: '',
                  },
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
                accessorKey: 'index',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        No <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => info.row.index + 1,
            },
            {
                accessorKey: 'id',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        id_warga <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'nama',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Nama <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => (
                    <Link className="text-blue-500 hover:underline" href={route('warga.show', info.row.original.id)}>
                        {info.getValue()}
                    </Link>
                ),
            },
            {
                accessorKey: 'no_ktp',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        No_KTP <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'alamat',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Alamat <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'no_hp',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        No HP <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'status',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Status <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => (info.getValue() === '1' ? 'Tidak Aktif' : 'Aktif'),
            },
            {
                id: 'actions',
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
                    placeholder="Cari warga..."
                    className="rounded border p-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div>
                    <Button onClick={() => openModal(null)} className="bg-indigo-600 text-white hover:bg-indigo-700">
                        + Tambah Warga
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
                        <TableCell colSpan={columns.length} className="text-center text-gray-500">
                            Total Warga: {filteredData.length}
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
                    <Dialog.Title className="mb-4 text-lg font-bold">{currentWarga ? 'Edit' : 'Tambah'} Warga</Dialog.Title>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nama"
                            value={formData.nama}
                            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="no_kk"
                            value={formData.no_kk}
                            onChange={(e) => setFormData({ ...formData, no_kk: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="no_ktp"
                            value={formData.no_ktp}
                            onChange={(e) => setFormData({ ...formData, no_ktp: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Alamat"
                            value={formData.alamat}
                            onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="RT/RW"
                            value={formData.rt_rw}
                            onChange={(e) => setFormData({ ...formData, rt_rw: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="No HP"
                            value={formData.no_hp}
                            onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        >
                            <option value="">Pilih Status</option>
                            <option value="Aktif">Aktif</option>
                            <option value="Tidak Aktif">Tidak Aktif</option>
                        </select>
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
                    <p>Apakah Anda yakin ingin menghapus data warga ini?</p>
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
