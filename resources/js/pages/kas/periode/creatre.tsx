import React from "react";
import { useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreatePeriodeForm: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        nama_periode: "",
        tanggal_mulai: "",
        tanggal_akhir: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as "nama_periode" | "tanggal_mulai" | "tanggal_akhir", e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("periode.store"));
    };

    return (
        <div className="flex w-full max-w-2xl items-start gap-4">
            <form
                className="flex w-full flex-wrap items-end gap-4"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="nama-periode">Nama Periode</Label>
                    <Input
                        id="nama-periode"
                        name="nama_periode"
                        placeholder="MM-YYYY"
                        type="text"
                        pattern="^(0[1-9]|1[0-2])\-\d{4}$"
                        title="Format: MM-YYYY (contoh: 06-2024)"
                        required
                        value={data.nama_periode}
                        onChange={handleChange}
                    />
                    {errors.nama_periode && (
                        <span className="text-red-500 text-xs">{errors.nama_periode}</span>
                    )}
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="tgl-mulai">Tanggal Mulai</Label>
                    <Input
                        id="tgl-mulai"
                        name="tanggal_mulai"
                        type="date"
                        required
                        value={data.tanggal_mulai}
                        onChange={handleChange}
                    />
                    {errors.tanggal_mulai && (
                        <span className="text-red-500 text-xs">{errors.tanggal_mulai}</span>
                    )}
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="tgl-akhir">Tanggal Akhir</Label>
                    <Input
                        id="tgl-akhir"
                        name="tanggal_akhir"
                        type="date"
                        required
                        value={data.tanggal_akhir}
                        onChange={handleChange}
                    />
                    {errors.tanggal_akhir && (
                        <span className="text-red-500 text-xs">{errors.tanggal_akhir}</span>
                    )}
                </div>
                <Button type="submit" className="self-end" disabled={processing}>
                    Simpan Periode
                </Button>
            </form>
        </div>
    );
};

export default CreatePeriodeForm;
