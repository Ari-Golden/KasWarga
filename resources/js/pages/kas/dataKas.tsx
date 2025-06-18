'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download } from 'lucide-react';
import * as React from 'react';
import * as XLSX from 'xlsx';

type LaporanKas = {
  kode: string;
  tanggal_kas: string;
  uraian_kas: string;
  periode_bulan: string;
  uang_masuk: number;
  uang_keluar: number;
  saldo: number;
  keterangan: string;
};
const formatTanggalIndo = (tanggal: string) => {
    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(new Date(tanggal));
};

const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(angka);
};


const columns: ColumnDef<LaporanKas>[] = [
    {
        accessorKey: 'kode',
        header: 'Kode',
        cell: ({ row }) => <div className="text-right">{row.original.kode}</div>,
    },
    {
        accessorKey: 'periode_bulan',
        header: 'Periode Bulan',
        cell: ({ row }) => <div className="text-center">{row.original.periode_bulan}</div>,
    },
    {
        accessorKey: 'tanggal_kas',
        header: 'Tanggal',
        cell: ({ row }) => <div>{formatTanggalIndo(row.original.tanggal_kas)}</div>,
    },
    {
        accessorKey: 'uraian_kas',
        header: 'Uraian Transaksi',
    },
    {
        accessorKey: 'uang_masuk',
        header: 'Pemasukan',
        cell: ({ row }) => (
            <div className="text-right">
                {row.original.uang_masuk > 0 ? formatRupiah(row.original.uang_masuk) : '-'}
            </div>
        ),
    },
    {
        accessorKey: 'uang_keluar',
        header: 'Pengeluaran',
        cell: ({ row }) => (
            <div className="text-right">
                {row.original.uang_keluar > 0 ? formatRupiah(row.original.uang_keluar) : '-'}
            </div>
        ),
    },
    {
        accessorKey: 'saldo',
        header: 'Saldo',
        cell: ({ row }) => (
            <div className="text-right font-bold">
                {formatRupiah(row.original.saldo)}
            </div>
        ),
    },
];


type LaporanKasTableProps = {
  kasWargas?: LaporanKas[];
};

export default function LaporanKasTable({ kasWargas }: LaporanKasTableProps) {
  const [globalFilter, setGlobalFilter] = React.useState('');

  const data: LaporanKas[] = kasWargas ?? [];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // 💡 Hitung saldo realtime berdasarkan hasil filter
  const dataWithSaldo = React.useMemo(() => {
    let saldo = 0;
    return table.getFilteredRowModel().rows.map((row) => {
      const item = row.original;
      saldo += (item.uang_masuk || 0) - (item.uang_keluar || 0);
      return { ...item, saldo };
    });
  }, [table.getFilteredRowModel().rows]);

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      dataWithSaldo.map((r) => ({
        Tanggal: r.tanggal_kas,
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

    // Gunakan data hasil filter dan sorting
    const rows = table.getFilteredRowModel().rows;

    // Ambil periode dari data pertama yang tampil
    const periode = rows[0]?.original.periode_bulan ?? 'Semua Periode';

    // Judul
    doc.setFontSize(14);
    doc.text(`Laporan Kas Bulanan - ${periode}`, 14, 15);

    autoTable(doc, {
        startY: 20,
        head: [['Tanggal', 'Uraian', 'Pemasukan', 'Pengeluaran', 'Saldo']],
        body: rows.map((row) => [
            row.original.tanggal_kas,
            row.original.uraian_kas,
            row.original.uang_masuk > 0 ? formatRupiah(row.original.uang_masuk) : '-',
            row.original.uang_keluar > 0 ? `Rp${row.original.uang_keluar.toLocaleString()}` : '-',
            `Rp${row.original.saldo.toLocaleString()}`,
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
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-64"
          />
          <Button onClick={exportExcel}>
            <Download className="mr-2 h-4 w-4" /> Excel
          </Button>
          <Button onClick={exportPDF}>
            <Download className="mr-2 h-4 w-4" /> PDF
          </Button>
        </div>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2 text-left">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {dataWithSaldo.map((row, index) => (
            <tr key={index}>
              <td className="border p-2 text-right">{row.kode}</td>
              <td className="border p-2 text-center">{row.periode_bulan}</td>
              <td className="border p-2">{row.tanggal_kas}</td>
              <td className="border p-2">{row.uraian_kas}</td>
              <td className="border p-2 text-right text-green-600">
                {row.uang_masuk > 0 ? `Rp${row.uang_masuk.toLocaleString()}` : '-'}
              </td>
              <td className="border p-2 text-right text-red-600">
                {row.uang_keluar > 0 ? `Rp${row.uang_keluar.toLocaleString()}` : '-'}
              </td>
              <td className="border p-2 text-right font-bold text-blue-700">
                Rp{row.saldo.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between">
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
