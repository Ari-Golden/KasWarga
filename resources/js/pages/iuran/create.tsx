import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react"; // ✅ Ganti dari useRouter ke router
import * as z from "zod";
import { useState } from "react";

const formSchema = z.object({
  id_warga: z.string().min(1, "Pilih warga"),
  id_jenis_iuran: z.string().min(1, "Masukkan jenis iuran"),
  periode_bulan: z.string().min(1, "Masukkan periode"),
  tgl_bayar: z.string().min(1, "Masukkan tanggal"),
  jumlah: z.string().min(1, "Masukkan jumlah"),
});

export default function CreateIuran({
  wargas,
  jenisIuran,
}: {
  wargas: { id: number; nama: string }[];
  jenisIuran: { id: number; nama_jenis_iuran: string }[];
}) {
  const [selectedWarga, setSelectedWarga] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_warga: "",
      id_jenis_iuran: "",
      periode_bulan: "",
      tgl_bayar: "",
      jumlah: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    router.post(route("iuran-warga.store"), values); // ✅ Gunakan router langsung
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg space-y-6">
      <h2 className="text-xl font-semibold">Tambah Iuran Warga</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="id_warga"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Warga</FormLabel>
                <FormControl className="w-full">
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
                name="id_jenis_iuran"
                render={({ field }) => (
                  <FormItem>
                  <FormLabel>Jenis Iuran</FormLabel>
                  <FormControl>
                    <Combobox
                    className="w-full"
                    items={
                      jenisIuran?.map((j: { nama_jenis_iuran: any; id: any; }) => ({
                      label: j.nama_jenis_iuran,
                      value: String(j.id),
                      })) ?? []
                    }
                    selectedValue={field.value}
                    onSelect={field.onChange}
                    placeholder="Pilih jenis iuran"
                    />
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
                  <Input placeholder="Contoh: 2025-06" {...field} />
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

          <FormField
            control={form.control}
            name="jumlah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Contoh: 50000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Simpan
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => router.visit(route("iuran-warga.index"))}
          >
            Cancel
          </Button>
        </form>
      </Form>
    </div>
  );
}
