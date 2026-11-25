"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Edit3,
  Home,
  Printer,
  MessageCircle,
  FileWarning,
  ArrowRight,
} from "lucide-react";
import WhatsAppModal from "@/components/shared/WhatsAppModal";

const STORAGE_KEY = "askep_maternitas_implementasi";

function formatTanggal(dateStr) {
  if (!dateStr) return "-";
  try {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function ImplementasiResult() {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Gagal membaca data:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500">
        Memuat dokumen...
      </div>
    );
  }

  if (!data || !data.rows || data.rows.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
          <FileWarning className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">
          Belum Ada Data Catatan Keperawatan
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Silakan isi formulir catatan keperawatan (implementasi) terlebih
          dahulu untuk melihat pratinjau dokumen cetak dan mengirim ke WhatsApp.
        </p>
        <Link
          href="/implementasi"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition"
        >
          Isi Form Catatan Keperawatan
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const { mahasiswa, pasien, rows } = data;

  const buildWhatsAppText = () => {
    const lines = [
      "*CATATAN KEPERAWATAN / IMPLEMENTASI*",
      "_Asuhan Keperawatan pada Ibu Pasca Partum_",
      "",
      `*Pasien:* ${pasien?.namaPasien || "-"} (${pasien?.umur || "-"})`,
      `*Ruang / Kamar:* ${pasien?.ruang || "-"} / ${pasien?.noKamar || "-"}`,
    ];

    if (mahasiswa?.isMahasiswa) {
      lines.push(
        `*Mahasiswa:* ${mahasiswa.namaMhs || "-"} (NIM: ${mahasiswa.nim || "-"})`
      );
    }

    lines.push("", "*Tindakan Keperawatan & Hasil:*");

    rows.forEach((row) => {
      lines.push(
        `• *[DK ${row.noDk}] ${formatTanggal(row.tanggal)} (${row.waktu || "-"})*`,
        `  _Tindakan:_ ${row.tindakan}`,
        `  _Hasil:_ ${row.hasil}`,
        ""
      );
    });

    return lines.join("\n").trim();
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/implementasi"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <Edit3 className="w-4 h-4" />
            Edit Form
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition"
          >
            <Home className="w-4 h-4" />
            Alur Askep
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsWaModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            Kirim ke WhatsApp
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print / Simpan PDF
          </button>
        </div>
      </div>

      {/* Lembar Dokumen Resmi sesuai Halaman 13 PDF */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 print:border-none print:shadow-none print:p-0 text-slate-900">
        <div className="text-center pb-4 mb-6 border-b-2 border-slate-800">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Asuhan Keperawatan pada Ibu Pasca Partum
          </p>
          <h1 className="text-xl font-bold uppercase tracking-wide mt-1">
            Catatan Keperawatan
          </h1>
        </div>

        {/* Grid 2 Kolom: Info Klien & Info Mahasiswa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 text-sm">
          <div className="space-y-1.5">
            <div className="grid grid-cols-3">
              <span className="font-semibold">Nama Pasien</span>
              <span className="col-span-2">: {pasien?.namaPasien || "-"}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="font-semibold">Umur</span>
              <span className="col-span-2">: {pasien?.umur || "-"}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="font-semibold">Ruang / Kelas</span>
              <span className="col-span-2">: {pasien?.ruang || "-"}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="font-semibold">No. Kamar</span>
              <span className="col-span-2">: {pasien?.noKamar || "-"}</span>
            </div>
          </div>

          {mahasiswa?.isMahasiswa && (
            <div className="space-y-1.5">
              <div className="grid grid-cols-3">
                <span className="font-semibold">Nama Mhs</span>
                <span className="col-span-2">
                  : {mahasiswa?.namaMhs || "-"}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="font-semibold">NIM</span>
                <span className="col-span-2">: {mahasiswa?.nim || "-"}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="font-semibold">Ruang Praktik</span>
                <span className="col-span-2">: {mahasiswa?.ruang || "-"}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="font-semibold">Tanggal</span>
                <span className="col-span-2">
                  : {formatTanggal(mahasiswa?.tgl)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Tabel Catatan Keperawatan sesuai Halaman 13 PDF */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-800 text-sm">
            <thead>
              <tr className="bg-slate-100 print:bg-slate-100">
                <th className="border border-slate-800 px-3 py-2.5 text-center w-36 font-bold">
                  Tanggal / Waktu
                </th>
                <th className="border border-slate-800 px-3 py-2.5 text-center w-16 font-bold">
                  No. DK.
                </th>
                <th className="border border-slate-800 px-3 py-2.5 text-left font-bold">
                  Tindakan Keperawatan dan Hasil
                </th>
                <th className="border border-slate-800 px-3 py-2.5 text-center w-40 font-bold">
                  Paraf dan Nama Jelas
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="align-top">
                  <td className="border border-slate-800 px-3 py-3 text-center">
                    <div className="font-medium">
                      {formatTanggal(row.tanggal)}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      Pukul {row.waktu || "-"}
                    </div>
                  </td>
                  <td className="border border-slate-800 px-3 py-3 text-center font-bold">
                    {row.noDk}
                  </td>
                  <td className="border border-slate-800 px-3 py-3 space-y-2">
                    <div>
                      <span className="font-semibold">Tindakan: </span>
                      <span className="whitespace-pre-line">{row.tindakan}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Hasil: </span>
                      <span className="whitespace-pre-line">{row.hasil}</span>
                    </div>
                  </td>
                  <td className="border border-slate-800 px-3 py-3 text-center">
                    <div className="h-12" />
                    <span className="text-xs font-medium underline">
                      {row.namaJelas ||
                        (mahasiswa?.isMahasiswa ? mahasiswa.namaMhs : "") ||
                        "-"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Blok Tanda Tangan Mahasiswa */}
        {mahasiswa?.isMahasiswa && (
          <div className="mt-10 flex justify-end">
            <div className="w-64 text-center text-sm">
              <p>
                {mahasiswa.ruang ? `${mahasiswa.ruang}, ` : ""}
                {formatTanggal(mahasiswa.tgl)}
              </p>
              <p className="mt-1">Mahasiswa Praktikan,</p>
              <div className="h-16" />
              <p className="font-bold underline">
                {mahasiswa.namaMhs || ".............................."}
              </p>
              <p className="text-xs mt-0.5">
                NIM. {mahasiswa.nim || "................"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Komponen Shared: WhatsApp Modal */}
      <WhatsAppModal
        isOpen={isWaModalOpen}
        onClose={() => setIsWaModalOpen(false)}
        messageText={buildWhatsAppText()}
        title="Kirim Catatan Keperawatan ke WhatsApp"
      />
    </div>
  );
}