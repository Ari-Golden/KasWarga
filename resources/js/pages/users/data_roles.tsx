import { useState, useEffect, useMemo, FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog } from '@headlessui/react';
import { Link, router } from '@inertiajs/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

type Role = {
  id: number;
  name: string;
};

interface DataRolesProps {
  roles?: Role[];
}

export default function DataRoles({ roles = [] }: DataRolesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<Role[]>(roles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFilteredData(
      roles.filter((role) => role.name.toLowerCase().includes(term))
    );
  }, [searchTerm, roles]);

  const openModal = (role: Role | null = null) => {
    setCurrentRole(role);
    setFormData({ name: role?.name || '' });
    setIsModalOpen(true);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const method = currentRole
      ? router.put
      : router.post;

    const url = currentRole
      ? route('roles.update', currentRole.id)
      : route('roles.store');

    method(url, formData, {
      onSuccess: () => setIsModalOpen(false),
    });
  };

  const confirmDelete = (role: Role) => {
    setCurrentRole(role);
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (!currentRole) return;
    router.delete(route('roles.destroy', currentRole.id), {
      onSuccess: () => setIsDeleteConfirmOpen(false),
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
        cell: (info) => (
        //   <Link href={route('roles.show', info.row.original.id)} className="text-blue-600 hover:underline">
        //     {info.getValue()}
        //   </Link>
        <span className="text-blue-600">{info.getValue()}</span>
        ),
      },
      {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => (
          <div>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => openModal(row.original)}
            >
              Edit
            </button>
            <button
              className="ml-2 text-red-500 hover:underline"
              onClick={() => confirmDelete(row.original)}
            >
              Hapus
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
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

      {/* Modal Tambah/Edit */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow">
          <Dialog.Title className="mb-4 text-lg font-bold">
            {currentRole ? 'Edit' : 'Tambah'} Role
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nama Role"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

      {/* Modal Konfirmasi Hapus */}
      <Dialog open={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
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
  );
}
