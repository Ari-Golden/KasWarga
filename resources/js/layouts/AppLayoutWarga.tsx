import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

interface Props {
  children: React.ReactNode;
  user: { name: string };
}

const AppLayoutWarga: React.FC<Props> = ({ children, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen pb-16 bg-[#f0f4f8] p-4 font-sans relative">
      {/* Header/Navbar */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-[15px] text-gray-500">Selamat Datang</h1>
          <h2 className="text-xl font-semibold text-blue-900">{user.name}</h2>
        </div>

        {/* Hamburger */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="rounded-full p-2 text-2xl hover:bg-blue-100 focus:outline-none"
          >
            ☰
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-32 rounded-lg bg-white shadow-lg">
              <button
                onClick={() => router.post('/logout')}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Konten Halaman */}
      {children}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow">
        <div className="flex justify-around py-2">
          <Link href="/dashboardwarga " className="flex flex-col items-center text-blue-600 text-sm">
            <span className="text-xl">🏠</span>
            <span>Beranda</span>
          </Link>
          <Link href="/iuran-report" className="flex flex-col items-center text-gray-500 text-sm hover:text-blue-600">
            <span className="text-xl">📄</span>
            <span>Iuran</span>
          </Link>
          <button
            onClick={() => router.post('/logout')}
            className="flex flex-col items-center text-gray-500 text-sm hover:text-red-600"
          >
            <span className="text-xl">🚪</span>
            <span>Keluar</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AppLayoutWarga;
