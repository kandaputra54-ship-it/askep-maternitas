"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Save,
  FileText,
  User,
  Stethoscope,
} from "lucide-react";
import IdentitasMahasiswa from "@/components/shared/IdentitasMahasiswa";

const STORAGE_KEY = "askep_maternitas_diagnosa";

const createEmptyRow = (id, defaultDate = "") => ({
  id,
  diagnosa: "",
  tglDitemukan: defaultDate,
  tglTeratasi: "",
  namaJelas: "",
});

export default function DiagnosaForm() {
  const router = useRouter();

  const [mahasiswa, setMahasiswa] = useState({
    isMahasiswa: true,
    namaMhs: "",
    nim: "",
    ruang: "",
    tgl: "",
  });

  const [pasien, setPasien] = useState({
    namaPasien: "",
    umur: "",
    ruang: "",
    noKamar: "",
  });

  const [rows, setRows] = useState([createEmptyRow(1, "")]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.mahasiswa) {
          setMahasiswa({
            ...parsed.mahasiswa,
            tgl: parsed.mahasiswa.tgl || today,
          });
        } else {
          setMahasiswa((prev) => ({ ...prev, tgl: today }));
        }

        if (parsed.pasien) setPasien(parsed.pasien);

        if (Array.isArray(parsed.rows) && parsed.rows.length > 0) {
          setRows(parsed.rows);
        } else {
          setRows([createEmptyRow(Date.now(), today)]);
        }
      } else {
        setMahasiswa((prev) => ({ ...prev, tgl: today }));
        setRows([createEmptyRow(Date.now(), today)]);
      }
    } catch (err) {
      console.error("Gagal memuat data:", err);
      setMahasiswa((prev) => ({ ...prev, tgl: today }));
      setRows([createEmptyRow(Date.now(), today)]);
    }
  }, []);

  const handlePasienChange = (e) => {
    const { name, value } = e.target;
    setPasien((prev) => ({ ...prev, [name]: value }));
  };

  const handleRowChange = (index, field, value) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () => {
    const today = new Date().toISOString().split("T")[0];
    setRows((prev) => [
      ...prev,
      {
        ...createEmptyRow(Date.now() + Math.random(), today),
        namaJelas: mahasiswa.isMahasiswa ? mahasiswa.namaMhs : "",
      },
    ]);
  };

  const removeRow = (index) => {
    if (rows.length === 1) return;
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      mahasiswa,
      pasien,
      rows,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push("/diagnosa/hasil");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Diagnosa Keperawatan (P &amp; E)
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Asuhan Keperawatan pada Ibu Pasca Partum — Formulir Penetapan
              Diagnosa Keperawatan
            </p>
          </div>

          <Link
            href="/diagnosa/hasil"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            Lihat Hasil Tersimpan
          </Link>
        </div>
      </div>

      {/* Komponen Shared: Identitas Mahasiswa */}
      <IdentitasMahasiswa data={mahasiswa} onChange={setMahasiswa} />

      {/* Identitas Singkat Klien / Ibu Pasca Partum */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">
            Identitas Klien (Ibu Pasca Partum)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Pasien
            </label>
            <input
              type="text"
              name="namaPasien"
              value={pasien.namaPasien}
              onChange={handlePasienChange}
              placeholder="Contoh: Ny. S"
              required
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Umur
            </label>
            <input
              type="text"
              name="umur"
              value={pasien.umur}
              onChange={handlePasienChange}
              placeholder="Contoh: 27 Tahun"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ruang / Kelas
            </label>
            <input
              type="text"
              name="ruang"
              value={pasien.ruang}
              onChange={handlePasienChange}
              placeholder="Contoh: Nifas / Kelas II"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              No. Kamar / RM
            </label>
            <input
              type="text"
              name="noKamar"
              value={pasien.noKamar}
              onChange={handlePasienChange}
              placeholder="Contoh: Kamar 04"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Daftar Diagnosa Keperawatan (Repeater Rows sesuai Tabel PDF) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              Daftar Diagnosa Keperawatan (P &amp; E)
            </h2>
          </div>

          <button
            type="button"
            onClick={addRow}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Tambah Diagnosa
          </button>
        </div>

        <div className="space-y-4">
          {rows.map((row, index) => (
            <div
              key={row.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 hover:border-blue-200 transition space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-100 rounded-lg">
                  Diagnosa #{index + 1}
                </span>

                {rows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 px-2.5 py-1 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Hapus
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Diagnosa Keperawatan (Problem &amp; Etiologi / P&amp;E)
                </label>
                <textarea
                  rows={3}
                  value={row.diagnosa}
                  onChange={(e) =>
                    handleRowChange(index, "diagnosa", e.target.value)
                  }
                  placeholder="Contoh: Nyeri akut berhubungan dengan agen pencedera fisik (luka episiotomi / kontraksi uterus)..."
                  required
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tanggal Ditemukan
                  </label>
                  <input
                    type="date"
                    value={row.tglDitemukan}
                    onChange={(e) =>
                      handleRowChange(index, "tglDitemukan", e.target.value)
                    }
                    required
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tanggal Teratasi (Opsional)
                  </label>
                  <input
                    type="date"
                    value={row.tglTeratasi}
                    onChange={(e) =>
                      handleRowChange(index, "tglTeratasi", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Jelas Perawat / Mahasiswa
                  </label>
                  <input
                    type="text"
                    value={row.namaJelas}
                    onChange={(e) =>
                      handleRowChange(index, "namaJelas", e.target.value)
                    }
                    placeholder={
                      mahasiswa.namaMhs || "Nama terang penanggung jawab"
                    }
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tombol Simpan & Lanjut */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Simpan &amp; Lihat Hasil Dokumen
        </button>
      </div>
    </form>
  );
}