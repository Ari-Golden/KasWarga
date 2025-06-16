import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { DataTable } from "@/components/data-table"
import { Head } from '@inertiajs/react'
import ListPengeluaran from "./list_pengeluaran"


interface IndexProps {
  pengeluarans?: any[]; // opsional  
}

export default function Index({ pengeluarans = []}: IndexProps) { // default array kosong
  
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Head title="Daftar Iuran Warga" />
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <ListPengeluaran pengeluarans={pengeluarans}/>
              
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}