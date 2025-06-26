import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayoutWarga from '@/layouts/AppLayoutWarga';

interface Props {
  auth: { user: { name: string } };
  wargaCount: number;
  saldoKas: number;
  saldoRukem: number;
}

const DashboardWarga: React.FC<Props> = ({ auth, wargaCount, saldoKas, saldoRukem }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <Head title="Dashboard" />
      <div className="min-h-screen pb-16 bg-[#f0f4f8] p-4 font-sans relative">

        {/* Header/Navbar */}
        <AppLayoutWarga user={auth.user}>

        {/* Ringkasan */}
        <div className="mb-4 grid grid-cols-3 gap-3 rounded-xl bg-white p-4 text-center shadow-md">
          <div>
            <p className="text-xs text-gray-500">Warga</p>
            <p className="text-lg font-bold text-blue-700">{wargaCount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Kas Warga</p>
            <p className="text-lg font-bold text-green-600">
              Rp {(saldoKas ?? 0).toLocaleString('id-ID')}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Kas Rukem</p>
            <p className="text-lg font-bold text-purple-600">
              Rp {(saldoRukem ?? 0).toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Menu Utama */}
        <div className="rounded-xl bg-white p-4 shadow-md">
          <h3 className="mb-2 text-sm text-gray-500">Menu</h3>
          <div className="space-y-3">
            <Link href="dashboardwarga/kas-warga " className="flex items-center justify-between rounded-lg bg-blue-50 p-3 transition hover:bg-blue-100">
              <span className="text-sm font-medium text-blue-800">Kas Warga</span>
              <span className="text-xl">💰</span>
            </Link>
            <Link
              href="dashboardwarga/rukem-warga"
              className="flex items-center justify-between rounded-lg bg-indigo-50 p-3 transition hover:bg-indigo-100"
            >
              <span className="text-sm font-medium text-indigo-800">Kas Rukem</span>
              <span className="text-xl">🏠</span>
            </Link>
           
          </div>
        </div>

        {/* Bottom Navigation */}
       </AppLayoutWarga>
      </div>
    </>
  );
};
export default DashboardWarga;
