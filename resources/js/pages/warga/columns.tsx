"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Warga = {
    nama: string
    no_kk: string
    no_ktp: string
    alamat: string
    rt_rw: string
    no_hp: string
    status_aktif: boolean
}

export const columns: ColumnDef<Warga>[] = [
    {
        accessorKey: "nama",
        header: "Nama",
    },
    {
        accessorKey: "no_kk",
        header: "No KK",
    },
    {
        accessorKey: "no_ktp",
        header: "No KTP",
    },
    {
        accessorKey: "alamat",
        header: "Alamat",
    },
    {
        accessorKey: "rt_rw",
        header: "RT/RW",
    },
    {
        accessorKey: "no_hp",
        header: "No HP",
    },
    {
        accessorKey: "status_aktif",
        header: "Status Aktif",
        cell: ({ getValue }) => (getValue() ? "Aktif" : "Tidak Aktif"),
    },
]