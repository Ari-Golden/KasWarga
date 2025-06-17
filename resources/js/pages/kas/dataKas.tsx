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
    tanggal: string;
    uraian: string;
    pemasukan: number;
    pengeluaran: number;
    saldo: number;
};

const data: LaporanKas[] = [
    {
        tanggal: '31-12-2023',
        uraian: 'Saldo Bulan Desember 2023',
        pemasukan: 8517000,
        pengeluaran: 0,
        saldo: 8517000,
    },
    {
        tanggal: '16-01-2024',
        uraian: 'Besuk Bpk Firman',
        pemasukan: 0,
        pengeluaran: 300000,
        saldo: 8217000,
    },
    {
        tanggal: '17-01-2024',
        uraian: 'Cetak Kartu Kuning',
        pemasukan: 0,
        pengeluaran: 540000,
        saldo: 7677000,
    },
    {
        tanggal: '26-01-2024',
        uraian: 'Setoran Iuran Bulanan',
        pemasukan: 4500000,
        pengeluaran: 0,
        saldo: 12177000,
    },
    {
        tanggal: '26-01-2024',
        uraian: 'Dana Taktis',
        pemasukan: 265000,
        pengeluaran: 0,
        saldo: 12442000,
    },
    {
        tanggal: '26-01-2024',
        uraian: 'Operasional Penarikan Kas',
        pemasukan: 0,
        pengeluaran: 350000,
        saldo: 12092000,
    },
];

const columns: ColumnDef<LaporanKas>[] = [
    {
        accessorKey: 'tanggal',
        header: 'Tanggal',
    },
    {
        accessorKey: 'uraian',
        header: 'Uraian Transaksi',
    },
    {
        accessorKey: 'pemasukan',
        header: 'Pemasukan',
        cell: ({ row }) => <div className="text-right">{row.original.pemasukan > 0 ? `Rp${row.original.pemasukan.toLocaleString()}` : '-'}</div>,
    },
    {
        accessorKey: 'pengeluaran',
        header: 'Pengeluaran',
        cell: ({ row }) => <div className="text-right">{row.original.pengeluaran > 0 ? `Rp${row.original.pengeluaran.toLocaleString()}` : '-'}</div>,
    },
    {
        accessorKey: 'saldo',
        header: 'Saldo',
        cell: ({ row }) => <div className="text-right font-bold">{`Rp${row.original.saldo.toLocaleString()}`}</div>,
    },
];

export default function LaporanKasTable() {
    const [globalFilter, setGlobalFilter] = React.useState('');

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
                Tanggal: r.original.tanggal,
                Uraian: r.original.uraian,
                Pemasukan: r.original.pemasukan,
                Pengeluaran: r.original.pengeluaran,
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
                row.tanggal,
                row.uraian,
                `Rp${row.pemasukan.toLocaleString()}`,
                `Rp${row.pengeluaran.toLocaleString()}`,
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
