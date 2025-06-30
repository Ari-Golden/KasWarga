import AppLayout from "@/layouts/app-layout";
import { Head } from '@inertiajs/react';
import ListPengeluaran from "./list_pengeluaran";

interface IndexProps {
  pengeluarans?: any[];
}

export default function Index({ pengeluarans = [] }: IndexProps) {
  return (
    <AppLayout>
      <Head title="Daftar Pengeluaran" />
      <ListPengeluaran pengeluarans={pengeluarans} />
    </AppLayout>
  );
}