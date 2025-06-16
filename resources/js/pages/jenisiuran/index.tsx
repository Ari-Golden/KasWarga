import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog } from '@headlessui/react'
import { router, Head, Link } from '@inertiajs/react'
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { FormEventHandler, useEffect, useMemo, useState } from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import ListJenisIuran from './list_jenisiuran'

type JenisIuran = {
  id: number
  nama_jenis_iuran: string
  keterangan?: string
}

interface IndexProps {
  jenisIuran?: JenisIuran[]
}

export default function Index({ jenisIuran = [] }: IndexProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState<JenisIuran[]>(jenisIuran)
  const [formData, setFormData] = useState({
    nama_jenis_iuran: '',
    keterangan: '',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [currentJenis, setCurrentJenis] = useState<JenisIuran | null>(null)

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(jenisIuran)
    } else {
      const lower = searchTerm.toLowerCase()
      setFilteredData(
        jenisIuran.filter(
          (i) =>
            i.nama_jenis_iuran.toLowerCase().includes(lower) ||
            (i.keterangan?.toLowerCase().includes(lower) ?? false)
        )
      )
    }
  }, [searchTerm, jenisIuran])

  const openModal = (jenis: JenisIuran | null = null) => {
    setCurrentJenis(jenis)
    setFormData(
      jenis
        ? {
            nama_jenis_iuran: jenis.nama_jenis_iuran,
            keterangan: jenis.keterangan ?? '',
          }
        : {
            nama_jenis_iuran: '',
            keterangan: '',
          }
    )
    setIsModalOpen(true)
  }

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    const payload = {
      nama_jenis_iuran: formData.nama_jenis_iuran,
      keterangan: formData.keterangan,
    }
    if (currentJenis) {
      router.put(route('jenis-iuran.update', currentJenis.id), payload, {
        onSuccess: () => setIsModalOpen(false),
      })
    } else {
      router.post(route('jenis-iuran.store'), payload, {
        onSuccess: () => setIsModalOpen(false),
      })
    }
  }

  const confirmDelete = (jenis: JenisIuran) => {
    setCurrentJenis(jenis)
    setIsDeleteConfirmOpen(true)
  }

  const handleDelete = () => {
    if (!currentJenis) return
    router.delete(route('jenis-iuran.destroy', currentJenis.id), {
      onSuccess: () => setIsDeleteConfirmOpen(false),
    })
  }

  const columns = useMemo<ColumnDef<JenisIuran, any>[]>(
    () => [
      {
        header: 'ID',
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: 'nama_jenis_iuran',
        header: ({ column }) => (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Nama Jenis Iuran <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'keterangan',
        header: 'Keterangan',
        cell: (info) => info.getValue() || '-',
      },
      {
        header: 'Aksi',
        cell: ({ row }) => (
          <div>
            <button className="text-blue-500 hover:underline" onClick={() => openModal(row.original)}>
              Edit
            </button>
            <button className="ml-2 text-red-500 hover:underline" onClick={() => confirmDelete(row.original)}>
              Hapus
            </button>
          </div>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {},
  })

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Head title="Jenis Iuran Warga" />
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <ListJenisIuran jenisIuran={jenisIuran}/>
        
      </SidebarInset>
    </SidebarProvider>
  )
}