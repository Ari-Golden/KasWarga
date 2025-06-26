import AppLayoutKoordinator from '@/layouts/AppLayoutKoordinator';
import { Head, Link } from '@inertiajs/react';
import { Banknote, Home, ListChecks, Users } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
    auth: { user: { name: string } };
    wargaCount: number;
    saldoKas: number;
    saldoRukem: number;
}

const DashboardKoordinator: React.FC<Props> = ({
  auth,
  wargaCount = 0,
  saldoKas = 0,
  saldoRukem = 0,
}) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <>
            <Head title="Dashboard Koordinator" />
            <div className="relative min-h-screen bg-[#f0f4f8] p-4 pb-16 font-sans">
                {/* Header/Navbar */}
                <AppLayoutKoordinator user={auth.user}>
                    {/* Ringkasan */}
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-blue-600" />
                                <p className="text-sm text-gray-600">Jumlah Warga</p>
                            </div>
                            <p className="mt-2 text-2xl font-bold text-blue-800">{wargaCount}</p>
                        </div>
                        <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <Banknote className="h-5 w-5 text-green-600" />
                                <p className="text-sm text-gray-600">Saldo Kas</p>
                            </div>
                            <p className="mt-2 text-2xl font-bold text-green-700">Rp {typeof saldoKas === 'number' ? saldoKas.toLocaleString('id-ID') : '0'}
</p>
                        </div>
                        <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <Home className="h-5 w-5 text-purple-600" />
                                <p className="text-sm text-gray-600">Saldo Rukem</p>
                            </div>
                            <p className="mt-2 text-2xl font-bold text-purple-700">Rp {typeof saldoRukem === 'number' ? saldoRukem.toLocaleString('id-ID') : '0'}
</p>
                        </div>
                    </div>
                    {/* Menu Utama */}
                    <div className="rounded-xl bg-white p-6 shadow-md">
                        <h3 className="mb-4 text-sm font-semibold text-gray-500">Menu Utama</h3>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <Link
                                href="/dashboardkoordinator/kas-warga"
                                className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 p-4 transition hover:bg-blue-100"
                            >
                                <span className="text-sm font-medium text-blue-800">Kas Warga</span>
                                <Banknote className="h-5 w-5 text-blue-600" />
                            </Link>
                            <Link
                                href="/dashboardkoordinator/rukem-warga"
                                className="flex items-center justify-between rounded-lg border border-indigo-100 bg-indigo-50 p-4 transition hover:bg-indigo-100"
                            >
                                <span className="text-sm font-medium text-indigo-800">Kas Rukem</span>
                                <Home className="h-5 w-5 text-indigo-600" />
                            </Link>
                            <Link
                                href="/dashboardkoordinator/list-iuran-warga"
                                className="flex items-center justify-between rounded-lg border border-teal-100 bg-teal-50 p-4 transition hover:bg-teal-100"
                            >
                                <span className="text-sm font-medium text-teal-800">Data Iuran</span>
                                <ListChecks className="h-5 w-5 text-teal-600" />
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Navigation */}
                </AppLayoutKoordinator>
            </div>
        </>
    );
};
export default DashboardKoordinator;
