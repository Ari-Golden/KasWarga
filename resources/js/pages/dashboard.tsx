
import { AppSidebar } from '@/components/app-sidebar';
import { ChartAreaInteractive } from '@/pages/kas/chart-area-interactive';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/pages/kas/section-cards';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import data from './data.json';
import ListIuran from '@/pages/kas/list_iuran';
import { Head } from '@inertiajs/react';

interface PageProps {
  kas?: any[];
  warga?: any[];
  iuran?: any[];
  jenisIuran?: any[];
  wargaCount?: number;
  iuranTotal?: number;
  pengeluaranTotal?: number;
  saldoKas?: number;
  iuranCount?: number;
}

export default function Page({
  iuranTotal = 0,
  iuranCount = 0,
  wargaCount = 0,
  pengeluaranTotal = 0,
  saldoKas = 0,
  kas = [],
  warga = [],
  iuran = [],
  jenisIuran = [],
}: PageProps) 
{
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
                iuranTotal={iuranTotal}
                iuranCount={iuranCount}
                wargaCount={wargaCount}
                totalPengeluaran={pengeluaranTotal}
                totalKas={saldoKas}
              />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive kas={kas} />
              </div>
              <ListIuran iurans={iuran} wargas={warga} jenisIuran={jenisIuran} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </>
  );
}