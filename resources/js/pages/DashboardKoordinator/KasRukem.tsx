import React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayoutKoordinator from '@/layouts/AppLayoutKoordinator';

interface KasItem {
  id: number;
  keterangan: string;
  tanggal_kas_rukem: string;
  uang_masuk_rukem: number;
  uang_keluar_rukem: number;
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

const KasRukem: React.FC<Props> = ({ auth, kas, saldoKas, selectedPeriode, periodeList }) => {
  const { data, setData } = useForm({
    periode_id: selectedPeriode ?? '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setData('periode_id', id);
    router.get('/kas-rukem', { periode_id: id }, { preserveState: true });
  };

  return (
    <AppLayoutKoordinator user={auth.user}>
      <Head title="Kas Rukem" />

      <div className="mb-4 flex justify-between items-start flex-col sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-blue-800">Riwayat Kas Rukem</h2>
          <p className="text-sm text-gray-500">
            Total Saldo:{' '}
            <span className="font-bold text-indigo-600">
              Rp {(saldoKas ?? 0).toLocaleString('id-ID')}
            </span>
          </p>
        </div>

        {/* Dropdown Pilih Periode */}
        <select
          value={data.periode_id}
          onChange={handleChange}
          className="mt-2 sm:mt-0 sm:ml-4 border rounded-md px-3 py-1 text-sm shadow-sm"
        >
          {periodeList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nama_periode}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2">Tanggal</th>
              <th className="pb-2">Keterangan</th>
              <th className="pb-2 text-right">Masuk</th>
              <th className="pb-2 text-right">Keluar</th>
            </tr>
          </thead>
          <tbody>
            {kas.map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="py-2">{item.tanggal_kas_rukem}</td>
                <td>{item.keterangan}</td>
                <td className="text-right text-green-600">
                  {item.uang_masuk_rukem
                    ? `Rp ${item.uang_masuk_rukem.toLocaleString('id-ID')}`
                    : '-'}
                </td>
                <td className="text-right text-red-500">
                  {item.uang_keluar_rukem
                    ? `Rp ${item.uang_keluar_rukem.toLocaleString('id-ID')}`
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayoutKoordinator>
  );
};

export default KasRukem;
