import AppLayoutKoordinator from '@/layouts/AppLayoutKoordinator';
import { Head, router, useForm } from '@inertiajs/react';
import React from 'react';

interface KasItem {
    id: number;
    keterangan: string;
    tanggal: string;
    uang_masuk: number;
    uang_keluar: number;
    periode: string;
}

interface Props {
    auth: { user: { name: string } };
    kas: KasItem[];
    saldoKas: number;
    selectedPeriode: string | null;
    periodeList: {
        id: number;
        nama_periode: string;
    }[];
}

const KasWarga: React.FC<Props> = ({ auth, kas, saldoKas, periodeList }) => {
    const { data, setData } = useForm({ periodeList, periode: '' });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData('periode', e.target.value);
        router.get('/dashboardwarga/kas-warga', { periode: e.target.value }, { preserveState: true });
    };

    return (
        <AppLayoutKoordinator user={auth.user}>
            <Head title="Kas Warga" />

            <div className="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-lg font-semibold text-blue-800">Riwayat Kas Warga</h2>
                    <p className="text-sm text-gray-500">
                        Total Saldo: <span className="font-bold text-green-600">Rp {(saldoKas ?? 0).toLocaleString('id-ID')}</span>
                    </p>
                </div>

                {/* Dropdown Pilih Periode */}
                <select
                    value={data.periode}
                    onChange={(e) => {
                        setData('periode', e.target.value);
                        router.get('/kas-warga', { periode: e.target.value }, { preserveState: true });
                    }}
                    className="mt-2 rounded-md border px-3 py-1 text-sm shadow-sm sm:mt-0 sm:ml-4"
                >
                    {periodeList.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.nama_periode}
                        </option>
                    ))}
                </select>
            </div>

            <div className="rounded-xl bg-white p-4 shadow">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b text-left text-gray-500">
                            <th className="pb-2">Tanggal</th>
                            <th className="pb-2">Keterangan</th>
                            <th className="pb-2 text-right">Masuk</th>
                            <th className="pb-2 text-right">Keluar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kas.map((item) => (
                            <tr key={item.id} className="border-b last:border-0">
                                <td className="py-2">{item.tanggal}</td>
                                <td>{item.keterangan}</td>
                                <td className="text-right text-green-600">
                                    {item.uang_masuk ? `Rp ${item.uang_masuk.toLocaleString('id-ID')}` : '-'}
                                </td>
                                <td className="text-right text-red-500">
                                    {item.uang_keluar ? `Rp ${item.uang_keluar.toLocaleString('id-ID')}` : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayoutKoordinator>
    );
};

export default KasWarga;
