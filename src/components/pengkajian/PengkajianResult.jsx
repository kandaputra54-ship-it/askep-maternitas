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

const STORAGE_KEY = "askep_maternitas_pengkajian";

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

export default function PengkajianResult() {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setData(JSON.parse(saved));
    } catch (err) {
      console.error("Gagal membaca pengkajian:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500">
        Memuat dokumen pengkajian...
      </div>
    );
  }

  if (!data || !data.form) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
          <FileWarning className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">
          Belum Ada Data Pengkajian
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Silakan lengkapi formulir pengkajian ibu pasca partum terlebih dahulu
          untuk melihat lembar dokumen resmi dan mengirim ringkasan ke WhatsApp.
        </p>
        <Link
          href="/pengkajian"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition"
        >
          Isi Form Pengkajian
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const { mahasiswa, form } = data;

  const buildWhatsAppText = () => {
    const lines = [
      "*PENGKAJIAN ASUHAN KEPERAWATAN IBU PASCA PARTUM*",
      "",
      `*Pasien:* ${form.namaPasien || "-"} (${form.umurPasien || "-"})`,
      `*Suami:* ${form.namaSuami || "-"}`,
      `*Ruang / Kamar:* ${form.ruangKelas || "-"} / ${form.noKamar || "-"}`,
      `*Tgl Pengkajian:* ${formatTanggal(form.tglPengkajian)} (${form.jamPengkajian || "-"})`,
    ];

    if (mahasiswa?.isMahasiswa) {
      lines.push(
        `*Mahasiswa:* ${mahasiswa.namaMhs || "-"} (NIM: ${mahasiswa.nim || "-"})`
      );
    }

    lines.push(
      "",
      "*1. Keluhan Utama:*",
      form.keluhanUtama || "-",
      "",
      "*2. Riwayat Persalinan & Obstetri:*",
      `• Status Obstetri: P${form.para || "0"} A${form.abortus || "0"} (Hidup: ${form.anakHidup || "0"})`,
      `• Tipe Persalinan: ${form.tipePersalinan} (${formatTanggal(form.tglPersalinan)})`,
      `• Bayi: ${form.jkBayi}, BB ${form.bbBayi || "-"} kg, PB ${form.pbBayi || "-"} cm, APGAR ${form.apgar1 || "-"}/${form.apgar5 || "-"}`,
      "",
      "*3. Pemeriksaan Fisik Fokus Postpartum:*",
      `• TTV: TD ${form.tekananDarah || "-"} mmHg, N ${form.nadi || "-"}x/mnt, S ${form.suhu || "-"}°C, RR ${form.rr || "-"}x/mnt`,
      `• Mammae / ASI: ${form.produksiAsi} (Papila: ${form.papilaMammae})`,
      `• Abdomen: TFU ${form.tfu || "-"}, Kontraksi ${form.kontraksiUterus || "-"} (${form.konsistensiUterus})`,
      `• Anogenital: Lochea ${form.locheaJenis} (${form.locheaJumlah || "-"}), Perineum ${form.perineum}`
    );

    return lines.join("\n");
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/pengkajian"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <Edit3 className="w-4 h-4" />
            Edit Pengkajian
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

      {/* Lembar Dokumen Resmi Pengkajian sesuai PDF */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 print:border-none print:shadow-none print:p-0 text-slate-900 space-y-6 text-sm">
        <div className="text-center pb-4 border-b-2 border-slate-800">
          <h1 className="text-lg font-bold uppercase tracking-wide">
            Asuhan Keperawatan pada Ibu Pasca Partum
          </h1>
          <p className="text-sm font-bold uppercase mt-0.5">A. Pengkajian</p>
        </div>

        {/* Info Mahasiswa (Jika aktif) */}
        {mahasiswa?.isMahasiswa && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 border border-slate-800 text-xs">
            <div>
              <span className="font-bold">Nama Mhs:</span>{" "}
              {mahasiswa.namaMhs || "-"}
            </div>
            <div>
              <span className="font-bold">NIM:</span> {mahasiswa.nim || "-"}
            </div>
            <div>
              <span className="font-bold">Ruang:</span> {mahasiswa.ruang || "-"}
            </div>
            <div>
              <span className="font-bold">Tanggal:</span>{" "}
              {formatTanggal(mahasiswa.tgl)}
            </div>
          </div>
        )}

        {/* Administrasi Masuk & Pengkajian */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-slate-800 p-4">
          <div className="space-y-1">
            <p>
              <span className="font-semibold">Tanggal Masuk :</span>{" "}
              {formatTanggal(form.tglMasuk)}
            </p>
            <p>
              <span className="font-semibold">Jam Masuk :</span>{" "}
              {form.jamMasuk || "-"}
            </p>
            <p>
              <span className="font-semibold">Ruang / Kelas :</span>{" "}
              {form.ruangKelas || "-"}
            </p>
          </div>
          <div className="space-y-1">
            <p>
              <span className="font-semibold">No. Kamar :</span>{" "}
              {form.noKamar || "-"}
            </p>
            <p>
              <span className="font-semibold">Tgl. Pengkajian :</span>{" "}
              {formatTanggal(form.tglPengkajian)}
            </p>
            <p>
              <span className="font-semibold">Jam :</span>{" "}
              {form.jamPengkajian || "-"}
            </p>
          </div>
        </div>

        {/* 1. Identitas Pasien & Suami */}
        <div>
          <h2 className="font-bold uppercase mb-2">1. Identitas</h2>
          <table className="w-full border-collapse border border-slate-800 text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-800 px-3 py-2 text-left w-1/2">
                  Identitas Pasien
                </th>
                <th className="border border-slate-800 px-3 py-2 text-left w-1/2">
                  Identitas Suami
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5">
                  <span className="font-semibold">Nama Pasien:</span>{" "}
                  {form.namaPasien || "-"}
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  <span className="font-semibold">Nama Suami:</span>{" "}
                  {form.namaSuami || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5">
                  <span className="font-semibold">Umur:</span>{" "}
                  {form.umurPasien || "-"}
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  <span className="font-semibold">Umur:</span>{" "}
                  {form.umurSuami || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5">
                  <span className="font-semibold">Suku/Bangsa:</span>{" "}
                  {form.sukuPasien || "-"}
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  <span className="font-semibold">Suku/Bangsa:</span>{" "}
                  {form.sukuSuami || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5">
                  <span className="font-semibold">Agama:</span>{" "}
                  {form.agamaPasien || "-"}
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  <span className="font-semibold">Agama:</span>{" "}
                  {form.agamaSuami || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5">
                  <span className="font-semibold">Pendidikan:</span>{" "}
                  {form.pendidikanPasien || "-"}
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  <span className="font-semibold">Pendidikan:</span>{" "}
                  {form.pendidikanSuami || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5">
                  <span className="font-semibold">Pekerjaan:</span>{" "}
                  {form.pekerjaanPasien || "-"}
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  <span className="font-semibold">Pekerjaan:</span>{" "}
                  {form.pekerjaanSuami || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5">
                  <span className="font-semibold">Alamat/Telp:</span>{" "}
                  {form.alamatPasien || "-"}
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  <span className="font-semibold">Alamat/Telp:</span>{" "}
                  {form.alamatSuami || "-"}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  className="border border-slate-800 px-3 py-1.5"
                >
                  <span className="font-semibold">Status Perkawinan:</span>{" "}
                  {form.statusPerkawinan} |{" "}
                  <span className="font-semibold">Lama Perkawinan:</span>{" "}
                  {form.lamaPerkawinan || "-"} tahun |{" "}
                  <span className="font-semibold">Perkawinan ke-:</span>{" "}
                  {form.perkawinanKe || "-"} kali
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Resume */}
        <div>
          <h2 className="font-bold uppercase mb-1">Resume</h2>
          <div className="border border-slate-800 p-3 whitespace-pre-line">
            {form.resume || "-"}
          </div>
        </div>

        {/* 2. Riwayat Keperawatan & Persalinan */}
        <div className="space-y-3">
          <h2 className="font-bold uppercase">2. Riwayat Keperawatan</h2>
          <div className="border border-slate-800 p-3 space-y-2">
            <p>
              <span className="font-semibold">a. Keluhan Utama:</span>{" "}
              {form.keluhanUtama || "-"}
            </p>
            <p className="font-semibold">b. Riwayat Persalinan Sekarang:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-3 text-xs sm:text-sm">
              <p>
                • Tanggal / Jam: {formatTanggal(form.tglPersalinan)} /{" "}
                {form.jamPersalinan || "-"}
              </p>
              <p>
                • Tipe Persalinan: {form.tipePersalinan}{" "}
                {form.bantuanPersalinan ? `(${form.bantuanPersalinan})` : ""}
              </p>
              <p>
                • Lama Persalinan: Kala I ({form.kala1Jam || 0}j{" "}
                {form.kala1Menit || 0}m), Kala II ({form.kala2Jam || 0}j{" "}
                {form.kala2Menit || 0}m), Kala III ({form.kala3Jam || 0}j{" "}
                {form.kala3Menit || 0}m) — Total: {form.totalJam || 0}j{" "}
                {form.totalMenit || 0}m
              </p>
              <p>• Jumlah Perdarahan: {form.jumlahPerdarahan || "-"} cc</p>
              <p>
                • Bayi: {form.jkBayi}, BB {form.bbBayi || "-"} kg, PB{" "}
                {form.pbBayi || "-"} cm
              </p>
              <p>
                • APGAR Score: Menit I ({form.apgar1 || "-"}), Menit V (
                {form.apgar5 || "-"})
              </p>
            </div>
          </div>

          {/* Tabel Riwayat Obstetri */}
          <div>
            <p className="font-semibold mb-1.5">
              c. Riwayat Obstetri: P {form.para || "0"} A {form.abortus || "0"}{" "}
              | Anak Hidup: {form.anakHidup || "0"}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-800 text-xs">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-800 p-1.5">Hamil ke</th>
                    <th className="border border-slate-800 p-1.5">
                      Penyulit Hamil
                    </th>
                    <th className="border border-slate-800 p-1.5">
                      Jenis Persalinan
                    </th>
                    <th className="border border-slate-800 p-1.5">Penolong</th>
                    <th className="border border-slate-800 p-1.5">
                      Penyulit Persalinan
                    </th>
                    <th className="border border-slate-800 p-1.5">
                      Komplikasi Nifas
                    </th>
                    <th className="border border-slate-800 p-1.5">JK</th>
                    <th className="border border-slate-800 p-1.5">BB / PB</th>
                    <th className="border border-slate-800 p-1.5">
                      Keadaan &amp; Umur
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {form.riwayatObstetri?.map((obs) => (
                    <tr key={obs.id} className="text-center">
                      <td className="border border-slate-800 p-1.5">
                        {obs.kehamilanKe || "-"}
                      </td>
                      <td className="border border-slate-800 p-1.5">
                        {obs.penyulitHamil || "-"}
                      </td>
                      <td className="border border-slate-800 p-1.5">
                        {obs.jenisPersalinan || "-"}
                      </td>
                      <td className="border border-slate-800 p-1.5">
                        {obs.penolong || "-"}
                      </td>
                      <td className="border border-slate-800 p-1.5">
                        {obs.penyulitPersalinan || "-"}
                      </td>
                      <td className="border border-slate-800 p-1.5">
                        {obs.komplikasiNifas || "-"}
                      </td>
                      <td className="border border-slate-800 p-1.5">
                        {obs.jenisKelamin || "-"}
                      </td>
                      <td className="border border-slate-800 p-1.5">
                        {obs.bb || "-"} / {obs.pb || "-"}
                      </td>
                      <td className="border border-slate-800 p-1.5">
                        {obs.keadaanUmur || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* KB, TT, Kebiasaan & Sosial Ekonomi */}
          <div className="border border-slate-800 p-3 space-y-1.5 text-xs sm:text-sm">
            <p>
              <span className="font-semibold">d. Riwayat KB:</span>{" "}
              {form.melaksanakanKb}{" "}
              {form.jenisKb ? `(Jenis: ${form.jenisKb})` : ""} — Rencana:{" "}
              {form.rencanaKb || "-"}
            </p>
            <p>
              <span className="font-semibold">e. Imunisasi TT:</span>{" "}
              {form.imunisasiTt}{" "}
              {form.jumlahTt
                ? `(${form.jumlahTt}, usia hamil ${form.usiaHamilTt || "-"})`
                : ""}
            </p>
            <p>
              <span className="font-semibold">
                f. Riwayat Penyakit Keluarga:
              </span>{" "}
              {[...form.penyakitKeluarga, form.penyakitKeluargaLain]
                .filter(Boolean)
                .join(", ") || "Tidak ada"}
            </p>
            <p>
              <span className="font-semibold">g. Kebiasaan Sehari-hari:</span>{" "}
              Makan {form.frekMakan || "-"} ({form.nafsuMakan}), BB sebelum
              hamil {form.bbSebelumHamil || "-"} kg / BB sekarang{" "}
              {form.bbSekarang || "-"} kg, BAB {form.babFrek || "-"}, BAK{" "}
              {form.bakFrek || "-"}, AKS: {form.aks}
            </p>
            <p>
              <span className="font-semibold">
                h. Psikososial &amp; Ekonomi:
              </span>{" "}
              {form.kesiapanIbu || "-"} | Tinggal dengan:{" "}
              {form.tinggalDengan || "-"} | Penghasilan: {form.penghasilanBulan}{" "}
              | Jaminan: {form.jaminanKesehatan || "-"}
            </p>
          </div>
        </div>

        {/* 3. Pemeriksaan Fisik */}
        <div>
          <h2 className="font-bold uppercase mb-2">3. Pemeriksaan Fisik</h2>
          <table className="w-full border-collapse border border-slate-800 text-xs sm:text-sm">
            <tbody>
              <tr>
                <td className="border border-slate-800 px-3 py-2 font-semibold w-1/3">
                  a. Kardiovaskuler / Sirkulasi
                </td>
                <td className="border border-slate-800 px-3 py-2">
                  TD: {form.tekananDarah || "-"} mmHg, Nadi: {form.nadi || "-"}
                  x/mnt ({form.iramaNadi}, {form.denyutNadi}), Suhu:{" "}
                  {form.suhu || "-"}°C, CRT: {form.capillaryRefill}, Edema:{" "}
                  {form.edema}, Konjungtiva: {form.konjungtiva}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-2 font-semibold">
                  b. Sistem Pernafasan
                </td>
                <td className="border border-slate-800 px-3 py-2">
                  Jalan nafas: {form.jalanNafas}, RR: {form.rr || "-"}x/mnt,
                  Suara nafas: {form.suaraNafas}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-2 font-semibold">
                  c. Pencernaan &amp; Antropometri
                </td>
                <td className="border border-slate-800 px-3 py-2">
                  TB/LILA: {form.tb || "-"}, Mukosa: {form.membranMukosa}, Nafsu
                  makan: {form.nafsuMakanFisik}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-2 font-semibold">
                  d–h. Neurosensori, Endokrin, Urogenital, Integumen,
                  Muskuloskeletal
                </td>
                <td className="border border-slate-800 px-3 py-2">
                  Mental: {form.statusMental}, GDS: {form.gulaDarah || "-"}{" "}
                  mg/dl, BAK: {form.bakWarna}, Turgor kulit: {form.turgorKulit},
                  Tanda Homan: {form.tandaHoman}, Reflek patella:{" "}
                  {form.reflekPatella}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-2 font-semibold">
                  i. Dada dan Axilla
                </td>
                <td className="border border-slate-800 px-3 py-2">
                  Mammae membesar: {form.mammaeMembesar}, Papila:{" "}
                  {form.papilaMammae}, Produksi ASI/Kolostrum:{" "}
                  {form.produksiAsi}, Pembengkakan: {form.pembengkakanMammae}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-2 font-semibold">
                  j. Perut / Abdomen
                </td>
                <td className="border border-slate-800 px-3 py-2">
                  TFU: {form.tfu || "-"}, Kontraksi:{" "}
                  {form.kontraksiUterus || "-"}, Konsistensi uterus:{" "}
                  {form.konsistensiUterus}, Diastasis rekti:{" "}
                  {form.diastasisPanjang || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-2 font-semibold">
                  k. Anogenital &amp; REEDA
                </td>
                <td className="border border-slate-800 px-3 py-2">
                  Lochea: {form.locheaJenis} ({form.locheaWarna},{" "}
                  {form.locheaJumlah || "-"}), Perineum: {form.perineum},
                  REEDA: {form.tandaReeda}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4 & 5: Penunjang & Penatalaksanaan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h2 className="font-bold uppercase mb-1">
              4. Pemeriksaan Penunjang
            </h2>
            <div className="border border-slate-800 p-3 whitespace-pre-line min-h-[80px]">
              {form.pemeriksaanPenunjang || "-"}
            </div>
          </div>
          <div>
            <h2 className="font-bold uppercase mb-1">5. Penatalaksanaan</h2>
            <div className="border border-slate-800 p-3 whitespace-pre-line min-h-[80px]">
              {form.penatalaksanaan || "-"}
            </div>
          </div>
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
        title="Kirim Ringkasan Pengkajian ke WhatsApp"
      />
    </div>
  );
}