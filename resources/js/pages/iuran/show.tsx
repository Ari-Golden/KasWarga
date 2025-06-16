import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function Show({wargas}: { wargas: any },{iuran}: { iuran: any },{jenisIuran}: { jenisIuran: any }) {
    const { props } = usePage();
    const [warga, setWarga] = useState(props.warga || []);
    const [iuranData, setIuranData] = useState(props.iuran || []);
    const [jenisIuranData, setJenisIuranData] = useState(props.jenisIuran || []);
    const [loading, setLoading] = useState(true);

 

  return (
    <div>
        <h1>Profil Warga</h1>
        {loading ? (
            <p>Memuat data...</p>
        ) : (
            <div>
                <h2>Data Warga</h2>
                <pre>{JSON.stringify(warga, null, 2)}</pre>
                <h2>Data Iuran</h2>
                <pre>{JSON.stringify(iuranData, null, 2)}</pre>
                <h2>Jenis Iuran</h2>
                <pre>{JSON.stringify(jenisIuranData, null, 2)}</pre>
            </div>
        )}
    </div>
    
  );
}