'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download } from 'lucide-react';
import * as React from 'react';
import * as XLSX from 'xlsx';

type LaporanKas = {
    tanggal_kas: string;
    uraian_kas: string;
    periode_bulan: string;
    uang_masuk: number;
    uang_keluar: number;
    saldo: number;
    keterangan: string;
};

const columns: ColumnDef<LaporanKas>[] = [
    {
        accessorKey: 'tanggal_kas',
        header: 'Tanggal',
    },
    {
        accessorKey: 'uraian_kas',
        header: 'Uraian Transaksi',
    },
    {
        accessorKey: 'uang_masuk',
        header: 'Pemasukan',
        cell: ({ row }) => <div className="text-right">{row.original.uang_masuk > 0 ? `Rp${row.original.uang_masuk.toLocaleString()}` : '-'}</div>,
    },
    {
        accessorKey: 'uang_keluar',
        header: 'Pengeluaran',
        cell: ({ row }) => <div className="text-right">{row.original.uang_keluar > 0 ? `Rp${row.original.uang_keluar.toLocaleString()}` : '-'}</div>,
    },
    {
        accessorKey: 'saldo',
        header: 'Saldo',
        cell: ({ row }) => <div className="text-right font-bold">{`Rp${row.original.saldo.toLocaleString()}`}</div>,
    },
];

type LaporanKasTableProps = {
    
    kasWarga?: any; // Tambahkan prop kasWarga opsional, sesuaikan tipe jika sudah diketahui
};

export default function LaporanKasTable({ kasWarga }: LaporanKasTableProps) {
    const [globalFilter, setGlobalFilter] = React.useState('');

    // Gunakan kasWarga sebagai data, fallback ke array kosong jika undefined
    const data: LaporanKas[] = kasWarga ?? [];

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

    const exportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            table.getFilteredRowModel().rows.map((r) => ({
                Tanggal: r.original.tanggal_kas,
                Uraian: r.original.uraian_kas,
                Pemasukan: r.original.uang_masuk,
                Pengeluaran: r.original.uang_keluar,
                Saldo: r.original.saldo,
            })),
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'LaporanKas');
        XLSX.writeFile(wb, 'LaporanKas.xlsx');
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Laporan Kas', 14, 10);

        autoTable(doc, {
            head: [['Tanggal', 'Uraian', 'Pemasukan', 'Pengeluaran', 'Saldo']],
            body: data.map((row) => [
                row.tanggal_kas,
                row.uraian_kas,
                `Rp${row.uang_masuk.toLocaleString()}`,
                `Rp${row.uang_keluar.toLocaleString()}`,
                `Rp${row.saldo.toLocaleString()}`,
            ]),
        });

        doc.save('LaporanKas.pdf');
    };

    return (
        <div className="container mx-auto py-10">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-bold">Laporan Kas Bulanan</h1>
                <div className="flex gap-2">
                    <Input placeholder="Cari..." value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} className="w-64" />
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
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border p-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
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
