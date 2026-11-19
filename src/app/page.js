import React from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  HeartPulse,
  Baby,
  Stethoscope,
  Search,
  Clock,
  FileText,
  Activity,
  ClipboardList,
  CheckSquare,
  ShieldPlus,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Top Bar */}
      <div className="bg-sky-900 text-sky-100 text-xs py-2 px-6 hidden md:block border-b border-sky-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="#panduan" className="hover:text-white">
              Panduan Askep
            </a>
            <a href="#pengkajian" className="hover:text-white">
              Form Pengkajian
            </a>
            <a href="#sdki" className="hover:text-white">
              Referensi SDKI/SLKI/SIKI
            </a>
            <a href="#kontak" className="hover:text-white">
              Kontak
            </a>
          </div>
          <div>Sistem Informasi Asuhan Keperawatan Maternitas</div>
        </div>
      </div>

      {/* Hero Section & Navbar */}
      <header
        className="relative bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/hero-bg.webp')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/85 via-sky-800/70 to-teal-700/60" />

        <div className="relative z-10">
          {/* Main Navbar */}
          <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center border-b border-white/15">
            <div className="flex items-center space-x-3 text-2xl font-bold tracking-tight">
              <Image
                src="/bg-remover.png"
                alt="Logo Askep Maternitas"
                width={36}
                height={36}
                className="w-9 h-9 object-contain mix-blend-multiply" // <-- COBA INI
                priority
              />
              <span>
                Askep
                <span className="font-light text-teal-200">Maternitas</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a href="#" className="border-b-2 border-teal-300 pb-1">
                Beranda
              </a>
              <a href="#fase" className="hover:text-teal-200 transition">
                Fase Maternitas
              </a>
              <a href="#pengkajian" className="hover:text-teal-200 transition">
                Pengkajian
              </a>
              <a href="#diagnosa" className="hover:text-teal-200 transition">
                Diagnosa
              </a>
              <a href="#tim" className="hover:text-teal-200 transition">
                Tim Perawat
              </a>
              <button
                aria-label="Cari"
                className="p-2 bg-white/10 rounded hover:bg-white/20 transition"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <p className="text-teal-200 font-medium tracking-wide uppercase text-sm">
                Pendampingan Profesional Ibu & Bayi
              </p>
              <h1 className="text-4xl md:text-5xl font-light leading-tight">
                Asuhan Keperawatan Maternitas{" "}
                <span className="font-semibold block">
                  Terpadu & Terpercaya
                </span>
              </h1>
              <p className="text-sky-100 text-base max-w-lg leading-relaxed">
                Dokumentasi dan panduan klinis komprehensif mulai dari masa
                kehamilan (Antenatal), persalinan (Intranatal), nifas
                (Postnatal), hingga kesehatan reproduksi.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#pengkajian"
                  className="px-6 py-3 bg-white text-sky-900 font-semibold text-sm rounded shadow hover:bg-sky-50 transition"
                >
                  Mulai Pengkajian
                </a>
                <a
                  href="#fase"
                  className="px-6 py-3 border border-white text-white font-semibold text-sm rounded hover:bg-white/10 transition"
                >
                  Lihat Layanan Askep
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Info Bar */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4">
            <Phone className="w-7 h-7 text-sky-600 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">
                Konsultasi & Darurat Obstetri
              </p>
              <p className="font-semibold text-slate-700">
                (021) 119 - Ext. Maternitas
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="w-7 h-7 text-sky-600 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">
                Kirim Rujukan / Dokumentasi
              </p>
              <p className="font-semibold text-slate-700">
                askep-maternitas@klinik.id
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="w-7 h-7 text-sky-600 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Unit Pelayanan</p>
              <p className="font-semibold text-slate-700">
                Poli KIA & Ruang Bersalin (VK)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Highlight Cards (Overlapping style) */}
      <section id="fase" className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 shadow-lg rounded-sm overflow-hidden text-white">
          {/* Card 1 */}
          <div className="bg-cyan-600 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Antenatal Care (ANC)
              </h3>
              <p className="text-cyan-50 text-sm leading-relaxed mb-6">
                Pengkajian ibu hamil trimester I–III, pemeriksaan Leopold,
                pemantauan DJJ, serta edukasi persiapan persalinan dan nutrisi
                kehamilan.
              </p>
            </div>
            <a
              href="#anc"
              className="inline-block w-max px-5 py-2 border border-white/70 text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-cyan-700 transition"
            >
              Selengkapnya
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-sky-600 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Intranatal & Postnatal
              </h3>
              <p className="text-sky-50 text-sm leading-relaxed mb-6">
                Manajemen nyeri persalinan Kala I–IV, pemantauan partograf,
                perawatan masa nifas, involusi uteri, hingga manajemen laktasi.
              </p>
            </div>
            <a
              href="#inc-pnc"
              className="inline-block w-max px-5 py-2 border border-white/70 text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-sky-700 transition"
            >
              Selengkapnya
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-blue-800 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Jadwal Poli & Tindakan
              </h3>
              <div className="space-y-3 text-sm text-blue-100">
                <div className="flex justify-between border-b border-blue-700 pb-2">
                  <span>Poli Antenatal (ANC)</span>
                  <span>08.00 - 15.00</span>
                </div>
                <div className="flex justify-between border-b border-blue-700 pb-2">
                  <span>Klinik Laktasi & Nifas</span>
                  <span>09.00 - 14.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Kamar Bersalin (VK)</span>
                  <span className="font-semibold text-teal-300">24 Jam</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Alur Dokumentasi Askep (Sinkron dengan PDF) */}
      {/* Alur Dokumentasi Askep (6 Cards Style) */}
      <section id="pengkajian" className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-sky-900">
            Alur <span className="font-semibold">Dokumentasi Keperawatan</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl mx-auto">
            Proses Asuhan Keperawatan Maternitas terstruktur sesuai standar
            format dokumentasi klinis (Pasca Partum).
          </p>
        </div>

        {/* Grid 6 Cards dengan variasi warna palet */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Pengkajian */}
          <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-8 rounded-xl shadow-lg text-white flex flex-col justify-between transition hover:-translate-y-1 duration-300">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ClipboardList className="w-8 h-8 text-cyan-200" />
                <h3 className="text-xl font-semibold">1. Pengkajian</h3>
              </div>
              <ul className="text-cyan-50 text-sm space-y-2 leading-relaxed mb-6">
                <li>• Identitas Pasien & Suami</li>
                <li>• Riwayat Kesehatan & Obstetri (P-A)</li>
                <li>• Riwayat Persalinan (Kala I-IV, APGAR)</li>
                <li>• Pola Kebiasaan & Pemeriksaan Fisik</li>
              </ul>
            </div>
            <a
              href="#anc"
              className="inline-block w-max px-5 py-2 bg-white/10 border border-white/30 rounded text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-cyan-700 transition"
            >
              Form Pengkajian
            </a>
          </div>

          {/* Card 2: Analisa Data */}
          <div className="bg-gradient-to-br from-sky-600 to-sky-700 p-8 rounded-xl shadow-lg text-white flex flex-col justify-between transition hover:-translate-y-1 duration-300">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-8 h-8 text-sky-200" />
                <h3 className="text-xl font-semibold">2. Analisa Data</h3>
              </div>
              <ul className="text-sky-50 text-sm space-y-2 leading-relaxed mb-6">
                <li>• Data Subjektif & Objektif (DS/DO)</li>
                <li>• Identifikasi Masalah</li>
                <li>• Penentuan Etiologi</li>
              </ul>
            </div>
            <a
              href="#analisa"
              className="inline-block w-max px-5 py-2 bg-white/10 border border-white/30 rounded text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-sky-700 transition"
            >
              Detail Analisa
            </a>
          </div>

          {/* Card 3: Diagnosa Keperawatan */}
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-8 rounded-xl shadow-lg text-white flex flex-col justify-between transition hover:-translate-y-1 duration-300">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <HeartPulse className="w-8 h-8 text-teal-200" />
                <h3 className="text-xl font-semibold">3. Diagnosa</h3>
              </div>
              <ul className="text-teal-50 text-sm space-y-2 leading-relaxed mb-6">
                <li>• Diagnosa Keperawatan (P&E)</li>
                <li>• Tanggal Ditemukan & Teratasi</li>
                <li>• Referensi SDKI/SLKI</li>
              </ul>
            </div>
            <a
              href="#diagnosa"
              className="inline-block w-max px-5 py-2 bg-white/10 border border-white/30 rounded text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-teal-700 transition"
            >
              Detail Diagnosa
            </a>
          </div>

          {/* Card 4: Rencana Keperawatan */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-800 p-8 rounded-xl shadow-lg text-white flex flex-col justify-between transition hover:-translate-y-1 duration-300">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-blue-300" />
                <h3 className="text-xl font-semibold">4. Rencana</h3>
              </div>
              <ul className="text-blue-100 text-sm space-y-2 leading-relaxed mb-6">
                <li>• Tujuan & Kriteria Hasil (SLKI)</li>
                <li>• Rencana Tindakan (SIKI)</li>
                <li>• Intervensi Independen & Interdependen</li>
              </ul>
            </div>
            <a
              href="#rencana"
              className="inline-block w-max px-5 py-2 bg-white/10 border border-white/30 rounded text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-blue-800 transition"
            >
              Detail Rencana
            </a>
          </div>

          {/* Card 5: Implementasi */}
          <div className="bg-gradient-to-br from-sky-800 to-indigo-900 p-8 rounded-xl shadow-lg text-white flex flex-col justify-between transition hover:-translate-y-1 duration-300">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Stethoscope className="w-8 h-8 text-sky-300" />
                <h3 className="text-xl font-semibold">5. Implementasi</h3>
              </div>
              <ul className="text-sky-200 text-sm space-y-2 leading-relaxed mb-6">
                <li>• Catatan Keperawatan Harian</li>
                <li>• Tindakan & Hasil</li>
                <li>• Paraf & Nama Jelas</li>
              </ul>
            </div>
            <a
              href="#implementasi"
              className="inline-block w-max px-5 py-2 bg-white/10 border border-white/30 rounded text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-sky-900 transition"
            >
              Detail Tindakan
            </a>
          </div>

          {/* Card 6: Evaluasi SOAP */}
          <div className="bg-gradient-to-br from-cyan-800 to-slate-800 p-8 rounded-xl shadow-lg text-white flex flex-col justify-between transition hover:-translate-y-1 duration-300">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CheckSquare className="w-8 h-8 text-cyan-300" />
                <h3 className="text-xl font-semibold">6. Evaluasi (SOAP)</h3>
              </div>
              <ul className="text-cyan-100 text-sm space-y-2 leading-relaxed mb-6">
                <li>• Subjektif, Objektif, Analisis, Planning</li>
                <li>• Evaluasi Hasil Mengacu Tujuan</li>
                <li>• Catatan Perkembangan</li>
              </ul>
            </div>
            <a
              href="#evaluasi"
              className="inline-block w-max px-5 py-2 bg-white/10 border border-white/30 rounded text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-cyan-800 transition"
            >
              Detail Evaluasi
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6 mt-20 border-t-4 border-teal-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Deskripsi */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xl font-bold text-white tracking-tight">
              <HeartPulse className="w-7 h-7 text-teal-400" />
              <span>
                Askep
                <span className="font-light text-teal-300">Maternitas</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Sistem Informasi dan Dokumentasi Asuhan Keperawatan Maternitas
              terpadu. Mendukung tenaga medis dalam memberikan pelayanan optimal
              bagi ibu dan bayi.
            </p>
          </div>

          {/* Link Cepat */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide uppercase text-sm">
              Navigasi
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-teal-400 transition">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#fase" className="hover:text-teal-400 transition">
                  Fase Maternitas
                </a>
              </li>
              <li>
                <a
                  href="#pengkajian"
                  className="hover:text-teal-400 transition"
                >
                  Form Pengkajian
                </a>
              </li>
              <li>
                <a href="#diagnosa" className="hover:text-teal-400 transition">
                  Diagnosa & Intervensi
                </a>
              </li>
            </ul>
          </div>

          {/* Referensi Standar */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide uppercase text-sm">
              Referensi Standar
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-teal-400 transition">
                  SDKI (Diagnosa)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition">
                  SLKI (Luaran)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition">
                  SIKI (Intervensi)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition">
                  Juknis Kemenkes
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide uppercase text-sm">
              Hubungi Kami
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0" />
                <span>
                  Gedung Maternal & Anak
                  <br />
                  Jl. Kesehatan No. 123, Jakarta
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0" />
                <span>(021) 119 - Ext. Maternitas</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-teal-400 shrink-0" />
                <span>askep-maternitas@klinik.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Askep Maternitas. Hak Cipta Dilindungi.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-teal-400 transition">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-teal-400 transition">
              Syarat & Ketentuan
            </a>
            <div className="flex items-center space-x-2 text-slate-400">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>Pelayanan 24 Jam</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
