import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';

type Permission = {
    id: number;
    name: string;
};

type Role = {
    id: number;
    name: string;
    permissions: string[];
};

interface IndexProps {
    roles: Role[];
    permissions: string[];
}

export default function Index({ roles = [], permissions = [] }: IndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState<Role[]>(roles);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState<Role | null>(null);

    const { data, setData, post, put, reset } = useForm({
        name: '',
        permissions: [] as string[],
    });

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        setFilteredData(roles.filter((role) => role.name.toLowerCase().includes(term)));
    }, [searchTerm, roles]);

    const openModal = (role: Role | null = null) => {
        setCurrentRole(role);

        if (role) {
            setData({
                name: role.name,
                permissions: role.permissions.map((p) => p.name), // gunakan name, bukan id
            });
        }

        setIsModalOpen(true);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const onSuccess = () => setIsModalOpen(false);

        if (currentRole) {
            put(route('role.update', currentRole.id), { onSuccess });
        } else {
            post(route('role.store'), { onSuccess });
        }
    };

    const confirmDelete = (role: Role) => {
        setCurrentRole(role);
        setIsDeleteConfirmOpen(true);
    };

    const handleDelete = () => {
        if (!currentRole) return;

        router.delete(route('role.destroy', currentRole.id), {
            onSuccess: () => {
                setIsDeleteConfirmOpen(false);
                setCurrentRole(null);
            },
            onError: () => {
                alert('Gagal menghapus role.');
            },
        });
    };

    const columns = useMemo<ColumnDef<Role, any>[]>(
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
                header: 'ID',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'name',
                header: 'Nama',
                cell: (info) => <span className="text-blue-600">{info.getValue()}</span>,
            },
            {
                accessorKey: 'permissions',
                header: 'Hak Akses',
                cell: (info) => {
                    const value = info.getValue();
                    if (!Array.isArray(value)) return null;

                    return (
                        <div className="flex flex-wrap gap-1">
                            {value.map((perm: any, i: number) => (
                                <span key={i} className="inline-block rounded bg-red-100 px-2 py-1 text-xs font-medium text-gray-700">
                                    {perm.name}
                                </span>
                            ))}
                        </div>
                    );
                },
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
    });

    return (
        <SidebarProvider
            style={{ '--sidebar-width': 'calc(var(--spacing) * 72)', '--header-height': 'calc(var(--spacing) * 12)' } as React.CSSProperties}
        >
            <Head title="Daftar Role" />
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SidebarHeader />
                <div className="ml-4 flex w-full flex-1 flex-col gap-4 px-4">
                    <h1 className="text-2xl font-semibold text-gray-800">Role Management</h1>

                    <Card className="mt-4 p-4 shadow-md">
                        <Card>
                            <CardHeader>
                                <CardTitle>Data Roles</CardTitle>
                                <CardDescription>Manajemen role dan hak akses</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="p-4">
                                    <div className="mb-4 flex justify-between">
                                        <input
                                            type="text"
                                            placeholder="Cari Role..."
                                            className="w-1/3 rounded border p-2"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <Button onClick={() => openModal(null)} className="bg-primary text-white hover:bg-primary/90">
                                            + Tambah Role
                                        </Button>
                                    </div>

                                    <Table>
                                        <TableHeader>
                                            {table.getHeaderGroups().map((headerGroup) => (
                                                <TableRow key={headerGroup.id}>
                                                    {headerGroup.headers.map((header) => (
                                                        <TableHead key={header.id}>
                                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                                        </TableHead>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableHeader>
                                        <TableBody>
                                            {table.getRowModel().rows.map((row) => (
                                                <TableRow key={row.id}>
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TableCell colSpan={columns.length} className="text-center text-sm text-gray-500">
                                                    Total Role: {filteredData.length}
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
                                </div>
                            </CardContent>
                        </Card>
                    </Card>

                    {/* Modal Tambah/Edit */}
                    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
                        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow">
                            <Dialog.Title className="mb-4 text-lg font-bold">{currentRole ? 'Edit' : 'Tambah'} Role</Dialog.Title>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Nama Role"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded border p-2"
                                    required
                                />

                                <div>
                                    <p className="mb-2 text-sm font-medium">Pilih Hak Akses:</p>
                                    <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto rounded border p-2">
                                        {permissions.map((perm) => (
                                            <label key={perm} className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={data.permissions.includes(perm)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setData('permissions', [...data.permissions, perm]);
                                                        } else {
                                                            setData(
                                                                'permissions',
                                                                data.permissions.filter((name) => name !== perm),
                                                            );
                                                        }
                                                    }}
                                                />
                                                {perm}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                                        Batal
                                    </Button>
                                    <Button type="submit">Simpan</Button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </Dialog>

                    {/* Modal Konfirmasi Hapus */}
                    <Dialog
                        open={isDeleteConfirmOpen}
                        onClose={() => setIsDeleteConfirmOpen(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center"
                    >
                        <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6 shadow">
                            <Dialog.Title className="mb-4 text-lg font-bold">Konfirmasi Hapus</Dialog.Title>
                            <p>Apakah Anda yakin ingin menghapus Role ini?</p>
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
            </SidebarInset>
        </SidebarProvider>
    );
}
