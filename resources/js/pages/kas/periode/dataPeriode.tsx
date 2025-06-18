import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

// Modal sederhana
function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
    return (
        <Dialog open={open} onOpenChange={(val) => { if (!val) onClose(); }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Periode</DialogTitle>
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="absolute top-2 right-2 text-lg"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </DialogClose>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    );
}

type Periode = {
    id: number;
    nama_periode: string;
    tanggal_mulai: string;
    tanggal_akhir: string;
};

interface ListPeriodeProps  {
    periodes?: Periode[];
}

function DataPeriode({ periodes = [] }: ListPeriodeProps) {
    const [data, setData] = useState<Periode[]>(periodes);
    const [search, setSearch] = useState('');
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState<Periode | null>(null);

    const handleEdit = (id: number) => {
        const periode = data.find((item) => item.id === id);
        if (periode) {
            setEditData(periode);
            setEditModalOpen(true);
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editData) return;
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };


    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editData) return;
        const payload = {
            nama_periode: editData.nama_periode,
            tanggal_mulai: editData.tanggal_mulai,
            tanggal_akhir: editData.tanggal_akhir,
        };
        // Pastikan endpoint dan id benar
        router.patch(`/periode/${editData.id}`, payload, {
            onSuccess: () => {
                setData(data.map((item) => item.id === editData.id ? { ...item, ...payload } : item));
                setEditModalOpen(false);
            },
        });
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Yakin ingin menghapus periode ini?')) {
            router.delete(`/kas/periode/${id}`, {
                onSuccess: () => {
                    setData(data.filter((item) => item.id !== id));
                },
            });
        }
    };

    const filteredData = data.filter((item) => item.nama_periode.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <input
                type="text"
                placeholder="Cari periode..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 p-2 border rounded w-64" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama Periode</TableHead>
                        <TableHead>Tanggal Mulai</TableHead>
                        <TableHead>Tanggal Selesai</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                Tidak ada data
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.nama_periode}</TableCell>
                                <TableCell>{item.tanggal_mulai}</TableCell>
                                <TableCell>{item.tanggal_akhir}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(item.id)}>
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(item.id)}
                                        className="ml-2"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                <h2 className="mb-4 font-bold">Edit Periode</h2>
                {editData && (
                    <form onSubmit={handleEditSubmit} className="space-y-3">
                        <div>
                            <label className="block mb-1">Nama Periode</label>
                            <input
                                type="text"
                                name="nama_periode"
                                value={editData.nama_periode}
                                onChange={handleEditChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Tanggal Mulai</label>
                            <input
                                type="date"
                                name="tanggal_mulai"
                                value={editData.tanggal_mulai}
                                onChange={handleEditChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Tanggal Selesai</label>
                            <input
                                type="date"
                                name="tanggal_akhir"
                                value={editData.tanggal_akhir}
                                onChange={handleEditChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit">Simpan</Button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
}

export default DataPeriode;
