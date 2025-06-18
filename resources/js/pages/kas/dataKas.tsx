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
import { ArrowUpDown, Download } from 'lucide-react';

interface LaporanKas {
  id: number;
  kode: string;
  tanggal_kas: string;
  uraian_kas: string;
  periode_bulan: string;
  uang_masuk: number;
  uang_keluar: number;
  saldo?: number; // Optional, dihitung per baris
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

  const data = kasWargas ?? [];

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

  // Hitung saldo berdasarkan urutan sorting dan filter
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
    <div className="container mx-auto py-10">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Laporan Kas Bulanan</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Cari..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-64"
          />
          <Button onClick={exportExcel} variant="outline">
            <Download className="mr-2 h-4 w-4" /> Excel
          </Button>
          <Button onClick={exportPDF} variant="outline">
            <Download className="mr-2 h-4 w-4" /> PDF
          </Button>
        </div>
      </div>

      <div className="rounded-xl border shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-left font-semibold text-muted-foreground">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {sortedRowsWithSaldo.map((row, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 text-right">{row.id}</td>
                <td className="px-4 py-2 text-right">{row.kode}</td>
                <td className="px-4 py-2 text-center">{row.periode_bulan}</td>
                <td className="px-4 py-2">{formatTanggalIndo(row.tanggal_kas)}</td>
                <td className="px-4 py-2">{row.uraian_kas}</td>
                <td className="px-4 py-2 text-right text-green-600">
                  {row.uang_masuk > 0 ? formatRupiah(row.uang_masuk) : '-'}
                </td>
                <td className="px-4 py-2 text-right text-red-600">
                  {row.uang_keluar > 0 ? formatRupiah(row.uang_keluar) : '-'}
                </td>
                <td className="px-4 py-2 text-right font-bold text-blue-700">
                  {formatRupiah(row.saldo ?? 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>cl

      <div className="mt-6 flex items-center justify-between">
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} variant="outline">
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} variant="outline">
          Next
        </Button>
      </div>
    </div>
  );
}
