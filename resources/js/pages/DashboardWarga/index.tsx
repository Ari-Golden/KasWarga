import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Home, Wallet, Users, Settings } from 'lucide-react'; // Ikon elegan
import AppLayoutWarga from '@/layouts/AppLayoutWarga';

interface Props {
  auth: { user: { name: string } };
  wargaCount: number;
  saldoKas: number;
  saldoRukem: number;
}

const DashboardWarga: React.FC<Props> = ({ auth, wargaCount, saldoKas = 0, saldoRukem = 0 }) => {
  return (
    <>
      <Head title="Dashboard Warga" />
      <AppLayoutWarga user={auth.user}>
        <div className="min-h-screen bg-[#f5f7fa] p-4 font-sans">

          {/* Ringkasan */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <p className="text-sm text-gray-600">Jumlah Warga</p>
              </div>
              <p className="mt-2 text-xl font-bold text-blue-800">{wargaCount}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-600" />
                <p className="text-sm text-gray-600">Saldo Kas Warga</p>
              </div>
              <p className="mt-2 text-xl font-bold text-green-700">Rp {saldoKas.toLocaleString('id-ID')}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-purple-600" />
                <p className="text-sm text-gray-600">Saldo Rukem</p>
              </div>
              <p className="mt-2 text-xl font-bold text-purple-700">Rp {saldoRukem.toLocaleString('id-ID')}</p>
            </div>
          </div>

          {/* Menu Navigasi */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="mb-4 text-sm font-semibold text-gray-500">Menu Utama</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/dashboardwarga/kas-warga"
                className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 p-4 hover:bg-blue-100 transition"
              >
                <span className="text-sm font-medium text-blue-800">Kas Warga</span>
                <Wallet className="h-5 w-5 text-blue-600" />
              </Link>
              <Link
                href="/dashboardwarga/rukem-warga"
                className="flex items-center justify-between rounded-lg border border-indigo-100 bg-indigo-50 p-4 hover:bg-indigo-100 transition"
              >
                <span className="text-sm font-medium text-indigo-800">Kas Rukem</span>
                <Home className="h-5 w-5 text-indigo-600" />
              </Link>
            </div>
            <Link
                href="/dashboardwarga/setting-profil-user"
                className="flex items-center justify-between rounded-lg border border-indigo-100 bg-indigo-50 p-4 hover:bg-indigo-100 transition"
              >
                <span className="text-sm font-medium text-indigo-800">Setting Profile dan Password User</span>
                <Settings className="h-5 w-5 text-indigo-600" />
              </Link>
          </div>

        </div>
      </AppLayoutWarga>
    </>
  );
};

export default DashboardWarga;
