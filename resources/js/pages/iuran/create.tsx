'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Combobox } from '@/components/ui/combobox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  id_warga: z.string().min(1, 'Pilih warga'),
  id_jenis_iuran: z.string().optional(),
  periode_bulan: z.string().min(1, 'Masukkan periode'),
  tgl_bayar: z.string().min(1, 'Masukkan tanggal'), 
  items: z.array(z.string()).optional(),
  dana_taktis:z.string().min(1,'Masukan jumlah'),
});

const items = [
  { id: 'iuran_kas', label: 'Iuran Kas' },
  { id: 'rukem', label: 'Rukem' },
] as const;

export default function CreateIuran({
  wargas,
  jenisIuran,
}: {
  wargas: { id: number; nama: string }[];
  jenisIuran: { id: number; nama_jenis_iuran: string }[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_warga: '',
      id_jenis_iuran: '',
      periode_bulan: '',
      tgl_bayar: '',      
      items: [],
      dana_taktis:'',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    router.post(route('iuran-warga.store'), values, {
      onSuccess: () => {
        toast.success('Data berhasil disimpan!');
        form.reset();
      },
      onError: () => {
        toast.error('Gagal menyimpan data. Periksa kembali isian.');
      },
    });
  };

  return (
    <div className="mx-auto mt-10 max-w-xl space-y-6 rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-semibold">Tambah Iuran Warga</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="id_warga"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Warga</FormLabel>
                <FormControl>
                  <Combobox
                    className="w-full"
                    items={wargas.map((w) => ({
                      label: w.nama,
                      value: String(w.id),
                    }))}
                    selectedValue={field.value}
                    onSelect={field.onChange}
                    placeholder="Pilih warga"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />         
          <FormField
            control={form.control}
            name="items"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Jenis Item Iuran</FormLabel>
                <FormDescription>Pilih item iuran yang ingin dicentang</FormDescription>
                <div className="grid gap-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value || []), item.id]
                            : (field.value || []).filter((v) => v !== item.id);
                          field.onChange(newValue);
                        }}
                      />
                      <label className="text-sm font-normal">{item.label}</label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="dana_taktis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dana Taktis</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Contoh: 50000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="periode_bulan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Periode Bulan</FormLabel>
                <FormControl>
                  <Input type="month" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tgl_bayar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Bayar</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         
          <Button type="submit" className="w-full">Simpan</Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => router.visit(route('iuran-warga.index'))}
          >
            Batal
          </Button>
        </form>
      </Form>
    </div>
  );
}
