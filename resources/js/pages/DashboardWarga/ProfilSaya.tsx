import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayoutWarga from '@/layouts/AppLayoutWarga';

interface Props {
  auth: {
    user: {
      name: string;
      email: string;
    };
  };
  warga: {
    nama: string;
    no_kk: string;
    no_ktp: string;
    alamat: string;
    rt_rw: string;
    no_hp?: string;
  };
}

const ProfilSaya: React.FC<Props> = ({ auth, warga }) => {
  const { data, setData, patch, processing, errors,reset } = useForm({
    nama: warga.nama,
    no_kk: warga.no_kk,
    no_ktp: warga.no_ktp,
    alamat: warga.alamat,
    rt_rw: warga.rt_rw,
    no_hp: warga.no_hp ?? '',
  });
  const { props } = usePage();
const flash = props.flash as { success?: string; error?: string };



const submit = (e: React.FormEvent) => {
  e.preventDefault();

  patch('/dashboardwarga/update-profil-pribadi', {
    preserveScroll: true,
    onSuccess: () => {
      reset(); // reset form ke nilai awal yang dikirim
    },
  });
};


  return (
    <AppLayoutWarga user={auth.user}>
      <Head title="Profil Saya" />

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-blue-800">Ubah Profil</h2>
        <p className="text-sm text-gray-500">Edit data kependudukan Anda di bawah ini.</p>
      </div>
    {flash.success && (
  <div className="mb-4 rounded bg-green-100 px-4 py-2 text-sm text-green-700">
    {flash.success}
  </div>
)}

{flash.error && (
  <div className="mb-4 rounded bg-red-100 px-4 py-2 text-sm text-red-700">
    {flash.error}
  </div>
)}

      <form onSubmit={submit} className="bg-white rounded-xl shadow p-6 text-sm space-y-4">
        {[
          ['Nama Lengkap', 'nama'],
          ['No. KK', 'no_kk'],
          ['No. KTP', 'no_ktp'],
          ['Alamat', 'alamat'],
          ['RT/RW', 'rt_rw'],
          ['No. HP', 'no_hp'],
        ].map(([label, key]) => (
          <div key={key}>
            <label className="block text-gray-600 font-medium">{label}</label>
            <input
              type="text"
              value={data[key as keyof typeof data]}
              onChange={(e) => setData(key as keyof typeof data, e.target.value)}
              className="w-full mt-1 border rounded px-3 py-2"
            />
            {errors[key as keyof typeof errors] && (
              <p className="text-red-600 text-xs mt-1">{errors[key as keyof typeof errors]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={processing}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </AppLayoutWarga>
  );
};

export default ProfilSaya;
