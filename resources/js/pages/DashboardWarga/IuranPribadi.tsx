import React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayoutWarga from '@/layouts/AppLayoutWarga';

interface IuranItem {
  id: number;
  tgl_bayar: string;
  jumlah: number;
  jenis_iuran?: {
    nama_jenis_iuran: string;
  };
}

interface Props {
  auth: {
    user: { name: string };
  };
  iuran: IuranItem[];
  total: number;
}

const IuranPribadi: React.FC<Props> = ({ auth, iuran, total }) => {
  const { data, setData } = useForm({
    dari: '',
    sampai: '',
  });

  const handleFilterTanggal = () => {
    router.get('/dashboardwarga/iuran-pribadi', {
      dari: data.dari,
      sampai: data.sampai,
    }, { preserveState: true });
  };

  function formatTanggal(tanggalStr: string): string {
    const tanggal = new Date(tanggalStr);
    return tanggal.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  return (
    <AppLayoutWarga user={auth.user}>
      <Head title="Iuran Saya" />

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-blue-800">Iuran Saya</h2>
        <p className="text-sm text-gray-500">
          Total Iuran:{' '}
          <span className="font-bold text-green-600">
            Rp {total.toLocaleString('id-ID')}
          </span>
        </p>
      </div>

      {/* Filter tanggal */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="date"
          value={data.dari}
          onChange={(e) => setData('dari', e.target.value)}
          className="rounded-md border px-3 py-1 text-sm"
        />
        <input
          type="date"
          value={data.sampai}
          onChange={(e) => setData('sampai', e.target.value)}
          className="rounded-md border px-3 py-1 text-sm"
        />
        <button
          onClick={handleFilterTanggal}
          className="rounded-md bg-blue-600 px-4 py-1 text-sm text-white"
        >
          Filter
        </button>
      </div>

      {/* Tabel iuran */}
      <div className="rounded-xl bg-white p-4 shadow">
        {iuran.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada catatan iuran.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-2">Tanggal</th>
                <th className="pb-2">Jenis</th>
                <th className="pb-2 text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {iuran.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="py-2">{formatTanggal(item.tgl_bayar)}</td>
                  <td>{item.jenis_iuran?.nama_jenis_iuran ?? '-'}</td>
                  <td className="text-right text-blue-700">
                    Rp {item.jumlah.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppLayoutWarga>
  );
};

export default IuranPribadi;
