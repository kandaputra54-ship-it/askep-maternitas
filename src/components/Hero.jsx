import React from "react";
import Image from "next/image";
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <>
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
                className="w-9 h-9 object-contain mix-blend-multiply"
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
    </>
  );
}