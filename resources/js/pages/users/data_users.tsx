import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog } from '@headlessui/react';
import { Link, router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { can } from '@/lib/can';

type Role = {
    id: number;
    name: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    roles: {
        id: number;
        name: string;
    }[];
};

interface DataUsersProps {
    users: User[];
    roles: Role[];
}

export default function DataUsers({ users = [], roles = [] }: DataUsersProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState<User[]>(users || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        roles: [] as number[], // role id
    });

    useEffect(() => {
        if (!searchTerm) {
            setFilteredData(users);
        } else {
            setFilteredData(
                users.filter((u) => {
                    const lower = searchTerm.toLowerCase();
                    return u.name.toLowerCase().includes(lower) || u.email.toLowerCase().includes(lower);
                }),
            );
        }
    }, [searchTerm, users]);

    const openModal = (user: User | null = null) => {
        setCurrentUser(user);
        setFormData(
            user
                ? {
                      name: user.name,
                      email: user.email,
                      password: '',
                      roles: user.roles.map((r) => r.id), // isi role ID saat edit
                  }
                : {
                      name: '',
                      email: '',
                      password: '',
                      roles: [],
                  },
        );

        setIsModalOpen(true);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (currentUser) {
            router.put(route('users.update', currentUser.id), formData, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            router.post(route('users.store'), formData, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const confirmDelete = (u: User) => {
        setCurrentUser(u);
        setIsDeleteConfirmOpen(true);
    };

    const handleDelete = () => {
        if (!currentUser) return;
        router.delete(route('users.destroy', currentUser.id), {
            onSuccess: () => setIsDeleteConfirmOpen(false),
        });
    };

    const columns = useMemo<ColumnDef<User, any>[]>(
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
                        ID <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'name',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Nama <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => (
                    <Link className="text-blue-500 hover:underline" href={route('users.show', info.row.original.id)}>
                        {info.getValue()}
                    </Link>
                ),
            },
            {
                accessorKey: 'email',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Email <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'roles',
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Role <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ getValue }) => {
                    const roles = getValue() as { id: number; name: string }[];
                    return (
                        <div className="flex flex-wrap gap-1">
                            {roles.map((role) => (
                                <span key={role.id} className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                    {role.name}
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
                       {can('user.edit')&& <button className="text-blue-500 hover:underline" onClick={() => openModal(row.original)}>
                            Edit
                        </button>}
                        {can('user.delete')&&<button className="ml-2 text-red-500 hover:underline" onClick={() => confirmDelete(row.original)}>
                            Hapus
                        </button>}
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
                    placeholder="Cari user..."
                    className="rounded border p-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div>
                    {can('user.create')&&<Button onClick={() => openModal(null)} className="bg-indigo-600 text-white hover:bg-indigo-700">
                        + Tambah User
                    </Button>}
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
                            Total User: {filteredData.length}
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

            {/* Modal Tambah/Edit */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
                <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow">
                    <Dialog.Title className="mb-4 text-lg font-bold">{currentUser ? 'Edit' : 'Tambah'} User</Dialog.Title>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nama"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded border p-2"
                            required
                        />
                        <input
                            type="password"
                            placeholder={currentUser ? 'Kosongkan jika tidak ingin mengubah' : 'Password'}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full rounded border p-2"
                            required={!currentUser}
                        />
                        <div>
                            <label className="mb-1 block text-sm font-medium">Pilih Role</label>
                            <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto rounded border p-2">
                                {roles.map((role) => (
                                    <label key={role.id} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={formData.roles.includes(role.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setFormData({ ...formData, roles: [...formData.roles, role.id] });
                                                } else {
                                                    setFormData({
                                                        ...formData,
                                                        roles: formData.roles.filter((id) => id !== role.id),
                                                    });
                                                }
                                            }}
                                        />
                                        {role.name}
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
                    <p>Apakah Anda yakin ingin menghapus data user ini?</p>
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
