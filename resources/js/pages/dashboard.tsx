
import { AppSidebar } from '@/components/app-sidebar';
import { ChartAreaInteractive } from '@/pages/kas/chart-area-interactive';
import { SectionCards } from '@/pages/kas/section-cards';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import ListIuran from '@/pages/kas/list_iuran';

// Define specific types for props
interface Kas {
  id: number;
  keterangan: string;
  tanggal_kas: string;
  uang_masuk: number;
  uang_keluar: number;
}

interface Warga {
  id: number;
  nama: string;
}

interface JenisIuran {
  id: number;
  nama_jenis_iuran: string;
}

interface Iuran {
  id: number;
  id_warga: number;
  warga: Warga;
  id_jenis_iuran: number;
  jenis_iuran: {
    id: number;
    nama_jenis_iuran: string;
  };
  periode_bulan: string;
  tgl_bayar: string;
  jumlah: number;
  status: string;
  keterangan: string;
}

interface PageProps {
  kas?: Kas[];
  warga?: Warga[];
  iuran?: Iuran[];
  jenisIuran?: JenisIuran[];
  wargaCount?: number;
  iuranTotal?: number;
  iuranKasWarga?: number;
  iuranRukem?: number;
  danaTaktis?: number;
  pengeluaranTotal?: number;
  saldoKas?: number;
  saldoRukem?: number;
  iuranCount?: number;
}

export default function Page({
  wargaCount = 0,
  pengeluaranTotal = 0,
  saldoKas = 0,
  saldoRukem = 0,
  iuranKasWarga = 0,
  iuranRukem = 0,
  iuranTotal = 0,
  danaTaktis = 0,
  kas = [],
  warga = [],
  iuran = [],
  jenisIuran = [],
}: PageProps) {
  return (
    <>
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards
                  wargaCount={wargaCount}
                  totalPengeluaran={pengeluaranTotal}
                  totalKas={saldoKas}
                  totalRukem={saldoRukem}
                  iuranKasWarga={iuranKasWarga}
                  iuranRukem={iuranRukem}
                  danaTaktis={danaTaktis}
                  iuranTotal={iuranTotal}
                />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive kas={kas} />
                </div>
                <ListIuran
                  iurans={iuran}
                  wargas={warga}
                  jenisIuran={jenisIuran}
                />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
