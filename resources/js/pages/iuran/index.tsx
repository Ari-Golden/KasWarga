import AppLayout from "@/layouts/app-layout";
import { Head } from '@inertiajs/react';
import ListIuran from "./list_iuran";

interface IndexProps {
  iurans?: any[];
  wargas?: any[];
  jenisIuran?: any[];
}

export default function Index({ iurans = [], wargas = [], jenisIuran = [] }: IndexProps) {
  return (
    <AppLayout>
      <Head title="Daftar Iuran Warga" />
      <ListIuran iurans={iurans} wargas={wargas} jenisIuran={jenisIuran} />
    </AppLayout>
  );
}