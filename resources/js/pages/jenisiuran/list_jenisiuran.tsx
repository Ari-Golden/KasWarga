import React from 'react';

type JenisIuran = {
    id: number;
    nama_jenis_iuran: string;
    keterangan?: string;
};

type ListJenisIuranProps = {
    data: JenisIuran[];
};

const ListJenisIuran: React.FC<ListJenisIuranProps> = ({ data }) => {
    const [filter, setFilter] = React.useState<string>('');

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Daftar Jenis Iuran</h1>
            <div className="bg-white shadow rounded-lg overflow-x-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-4">
                    <input
                        type="text"
                        placeholder="Cari jenis iuran..."
                        className="border rounded px-3 py-2 w-full sm:w-64"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    />
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm mt-2 sm:mt-0"
                        onClick={() => alert('Tambah data')}
                    >
                        + Tambah Data
                    </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Jenis Iuran</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                    Tidak ada data jenis iuran.
                                </td>
                            </tr>
                        ) : (
                            data.map((item, idx) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.nama_jenis_iuran}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.keterangan || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                                            onClick={() => alert(`Edit ${item.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                            onClick={() => alert(`Delete ${item.id}`)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListJenisIuran;