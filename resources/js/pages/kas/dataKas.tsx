'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as React from 'react';
import * as XLSX from 'xlsx';
import { ArrowUpDown, Download, Plus, Edit, Trash } from 'lucide-react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { can } from '@/lib/can';

interface LaporanKas {
  id: number;
  kode: string;
  tanggal_kas: string;
  uraian_kas: string;
  periode_bulan: string;
  uang_masuk: number;
  uang_keluar: number;
  saldo?: number;
}

const formatTanggalIndo = (tanggal: string) =>
  new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(tanggal));

const formatRupiah = (angka: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);

interface LaporanKasTableProps {
  kasWargas?: LaporanKas[];
}

export default function LaporanKasTable({ kasWargas }: LaporanKasTableProps) {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    id: 0,
    kode: '',
    tanggal_kas: '',
    uraian_kas: '',
    periode_bulan: '',
    uang_masuk: 0,
    uang_keluar: 0,
  });
  const [isEdit, setIsEdit] = React.useState(false);

  const data = kasWargas ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      kode: formData.kode,
      nama_periode: formData.periode_bulan,
      uraian_kas: formData.uraian_kas,
      tanggal_kas: formData.tanggal_kas,
      periode_bulan: formData.periode_bulan,
      uang_masuk: formData.uang_masuk,
      uang_keluar: formData.uang_keluar,
    };

    if (isEdit && formData.id) {
      router.put(route('kas.update', formData.id), payload, {
        onSuccess: () => setIsModalOpen(false),
      });
    } else {
      router.post(route('kas.storeIncomeLain'), payload, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  const handleEdit = (kas: LaporanKas) => {
    setFormData({ ...kas });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      router.delete(route('kas.destroy', id));
    }
  };

  const columns = React.useMemo<ColumnDef<LaporanKas>[]>(
    () => [
      {
        accessorKey: 'id',
        header: ({ column }) => (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            ID <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div className="text-right">{row.original.id}</div>,
      },
      {
        accessorKey: 'kode',
        header: 'Kode',
        cell: ({ row }) => <div className="text-right">{row.original.kode}</div>,
      },
      {
        accessorKey: 'periode_bulan',
        header: ({ column }) => (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Periode Bulan <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div className="text-center">{row.original.periode_bulan}</div>,
      },
      {
        accessorKey: 'tanggal_kas',
        header: ({ column }) => (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Tanggal <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{formatTanggalIndo(row.original.tanggal_kas)}</div>,
      },
      {
        accessorKey: 'uraian_kas',
        header: 'Uraian Transaksi',
      },
      {
        accessorKey: 'uang_masuk',
        header: ({ column }) => (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Pemasukan <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-right text-green-600">
            {row.original.uang_masuk > 0 ? formatRupiah(row.original.uang_masuk) : '-'}
          </div>
        ),
      },
      {
        accessorKey: 'uang_keluar',
        header: ({ column }) => (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Pengeluaran <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-right text-red-600">
            {row.original.uang_keluar > 0 ? formatRupiah(row.original.uang_keluar) : '-'}
          </div>
        ),
      },
      {
        accessorKey: 'saldo',
        header: 'Saldo',
        cell: ({ row }) => {
          const saldo = row.original.saldo ?? 0;
          return (
            <div className="text-right font-bold text-blue-700">{formatRupiah(saldo)}</div>
          );
        },
      },
      {
        header: 'Aksi',
        cell: ({ row }) => (
          <div className="flex gap-2">
            {can('kas.edit')&&<Button variant="outline" size="icon" onClick={() => handleEdit(row.original)}><Edit className="w-4 h-4" /></Button>}
            {can('kas.delete')&&<Button variant="destructive" size="icon" onClick={() => handleDelete(row.original.id)}><Trash className="w-4 h-4" /></Button>}
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const sortedRowsWithSaldo = React.useMemo(() => {
    let saldo = 0;
    return table.getSortedRowModel().rows.map((row) => {
      saldo += (row.original.uang_masuk || 0) - (row.original.uang_keluar || 0);
      return {
        ...row.original,
        saldo,
      };
    });
  }, [table.getSortedRowModel().rows]);

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      sortedRowsWithSaldo.map((r) => ({
        Tanggal: formatTanggalIndo(r.tanggal_kas),
        Uraian: r.uraian_kas,
        Pemasukan: r.uang_masuk,
        Pengeluaran: r.uang_keluar,
        Saldo: r.saldo,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'LaporanKas');
    XLSX.writeFile(wb, 'LaporanKas.xlsx');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const periode = sortedRowsWithSaldo[0]?.periode_bulan ?? 'Semua Periode';

    doc.setFontSize(14);
    doc.text(`Laporan Kas Bulanan - ${periode}`, 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [['Tanggal', 'Uraian', 'Pemasukan', 'Pengeluaran', 'Saldo']],
      body: sortedRowsWithSaldo.map((row) => [
        formatTanggalIndo(row.tanggal_kas),
        row.uraian_kas,
        row.uang_masuk > 0 ? formatRupiah(row.uang_masuk) : '-',
        row.uang_keluar > 0 ? formatRupiah(row.uang_keluar) : '-',
        formatRupiah(row.saldo ?? 0),
      ]),
    });

    doc.save(`LaporanKas-${periode}.pdf`);
  };

  return (
    <div className="container mx-auto px-2 md:px-6 py-6">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Laporan Kas Bulanan</h1>
        <div className="flex gap-2">
          <Input placeholder="Cari..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} className="w-64" />
          <Button onClick={exportExcel}><Download className="mr-2 h-4 w-4" /> Excel</Button>
          <Button onClick={exportPDF}><Download className="mr-2 h-4 w-4" /> PDF</Button>
          {can('kas.create')&&<Button onClick={() => { setIsEdit(false); setFormData({ id: 0, kode: '', tanggal_kas: '', uraian_kas: '', periode_bulan: '', uang_masuk: 0, uang_keluar: 0 });
           setIsModalOpen(true); }}><Plus className="mr-2 h-4 w-4" /> Tambah</Button>}
        </div>
      </div>

      <div className="rounded-xl border shadow-sm overflow-x-auto">
        <table className="min-w-full text-xs md:text-sm">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 md:px-4 md:py-2 text-left font-semibold text-muted-foreground">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {sortedRowsWithSaldo.map((row, index) => (
              <tr key={index} className="border-t">
                <td className="px-2 py-1 md:px-4 md:py-2 text-right">{row.id}</td>
                <td className="px-2 py-1 md:px-4 md:py-2 text-right">{row.kode}</td>
                <td className="px-4 py-2 md:px-4 md:py-2 text-center">{row.periode_bulan}</td>
                <td className="px-4 py-2 md:px-4 md:py-2">{formatTanggalIndo(row.tanggal_kas)}</td>
                <td className="px-4 py-2 md:px-4 md:py-2">{row.uraian_kas}</td>
                <td className="px-4 py-2 md:px-4 md:py-2 text-right text-green-600">
                  {row.uang_masuk > 0 ? formatRupiah(row.uang_masuk) : '-'}
                </td>
                <td className="px-4 py-2 md:px-4 md:py-2 text-right text-red-600">
                  {row.uang_keluar > 0 ? formatRupiah(row.uang_keluar) : '-'}
                </td>
                <td className="px-4 py-2 md:px-4 md:py-2text-right font-bold text-blue-700">
                  {formatRupiah(row.saldo ?? 0)}
                </td>
                <td className="px-4 py-2 md:px-4 md:py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <Button size="icon" variant="outline" onClick={() => handleEdit(row)}><Edit className="w-4 h-4" /></Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(row.id)}><Trash className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} variant="outline">Previous</Button>
        <span className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} variant="outline">Next</Button>
      </div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <DialogPanel className="w-full max-w-md rounded bg-white p-6 shadow">
          <DialogTitle className="mb-4 text-lg font-bold">{isEdit ? 'Edit Data Kas' : 'Tambah Data Kas'}</DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Kode</label>
              <Input placeholder="Kode" value={formData.kode} onChange={(e) => setFormData({ ...formData, kode: e.target.value })} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tanggal Kas</label>
              <Input type="date" value={formData.tanggal_kas} onChange={(e) => setFormData({ ...formData, tanggal_kas: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Uraian</label>
              <Input placeholder="Uraian" value={formData.uraian_kas} onChange={(e) => setFormData({ ...formData, uraian_kas: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Periode Bulan</label>
              <Input type="month" value={formData.periode_bulan} onChange={(e) => setFormData({ ...formData, periode_bulan: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Uang Masuk</label>
              <Input type="number" value={formData.uang_masuk} onChange={(e) => setFormData({ ...formData, uang_masuk: +e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Uang Keluar</label>
              <Input type="number" value={formData.uang_keluar} onChange={(e) => setFormData({ ...formData, uang_keluar: +e.target.value })} />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
