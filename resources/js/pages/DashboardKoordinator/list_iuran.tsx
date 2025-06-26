import { Button } from '@/components/ui/button';
import AppLayoutKoordinator from '@/layouts/AppLayoutKoordinator';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

type Iuran = {
    id: number;
    id_warga: number;
    warga: {
        id: number;
        nama: string;
    };
    id_jenis_iuran: number;
    jenis_iuran: {
        id: number;
        nama_jenis_iuran: string;
    };
    periode_bulan: string;
    tgl_bayar: string;
    jumlah: number;
};

interface ListIuranProps {
    iurans: Iuran[];
    wargas?: { id: number; nama: string }[]; // Optional list of warga for combobox
    jenisIuran?: { id: number; nama_jenis_iuran: string }[]; // Optional list of jenis iuran for combobox
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
}

export default function ListIuran({ iurans, wargas, jenisIuran, auth }: ListIuranProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState<Iuran[]>(iurans || []);
    const [currentIuran, setCurrentIuran] = useState<Iuran | null>(null);

   useEffect(() => {
  if (!searchTerm) {
    setFilteredData(iurans);
  } else {
    const lower = searchTerm.toLowerCase();
    setFilteredData(
      iurans.filter((i) =>
        i.warga?.nama?.toLowerCase().includes(lower) ||
        i.id_warga.toString().includes(lower) ||
        i.jenis_iuran?.nama_jenis_iuran.toLowerCase().includes(lower) ||
        i.id_jenis_iuran.toString().includes(lower) ||
        i.periode_bulan.toLowerCase().includes(lower) ||
        i.tgl_bayar.toLowerCase().includes(lower) ||
        i.jumlah.toString().includes(lower)
      )
    );
  }
}, [searchTerm, iurans]);
   

    return (
        <AppLayoutKoordinator user={auth.user}>
            <Head title="Profil Saya" />
            <div className="p-4">
                <div className="mb-4 flex justify-between">
                    <input
                        type="text"
                        placeholder="Cari..."
                        className="rounded border p-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* TAMPILAN MOBILE */}
                <div className="space-y-4 md:hidden">
                    {filteredData.map((item) => (
                        <div key={item.id} className="rounded-lg border p-4 shadow-sm">
                            <p className="text-sm font-semibold">Nama Warga: {item.warga?.nama}</p>
                            <p className="text-sm">Jenis Iuran: {item.jenis_iuran?.nama_jenis_iuran}</p>
                            <p className="text-sm">Periode: {item.periode_bulan}</p>
                            <p className="text-sm">Tgl Bayar: {formatDate(item.tgl_bayar)}</p>
                            <p className="text-sm font-bold text-green-600">Rp. {item.jumlah.toLocaleString('id-ID')}</p>
                        </div>
                    ))}

                    {/* Total di bawah */}
                    <div className="rounded-lg border p-4 text-right font-bold shadow-sm">
                        Total: Rp. {filteredData.reduce((sum, i) => sum + Number(i.jumlah), 0).toLocaleString('id-ID')}
                    </div>
                </div>
            </div>
        </AppLayoutKoordinator>
    );
}
