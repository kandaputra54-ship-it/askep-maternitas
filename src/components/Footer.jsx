import React from "react";
import Image from "next/image";
import { MapPin, Phone, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="kontak"
      className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-slate-800 mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Kolom 1: Brand & Deskripsi */}
          <div className="space-y-4 lg:col-span-5 pr-0 lg:pr-8">
            <div className="flex items-center gap-3 font-bold text-lg">
              <Image
                src="/bg-remover.png"
                alt="Logo Askep Maternitas"
                width={36}
                height={36}
                className="h-9 w-auto object-contain"
              />
              <span className="text-white tracking-tight">
                Askep
                <span className="font-light text-teal-300"> Maternitas</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Sistem informasi dan panduan dokumentasi asuhan keperawatan
              maternitas terpadu. Meliputi fase antenatal, intranatal, dan
              postnatal dengan acuan format pengkajian, SDKI/SLKI/SIKI, serta
              evaluasi SOAP.
            </p>
          </div>

          {/* Kolom 2: Navigasi Utama */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Navigasi
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#fase"
                  className="hover:text-teal-400 transition-colors"
                >
                  Fase Maternitas
                </a>
              </li>
              <li>
                <a
                  href="#pengkajian"
                  className="hover:text-teal-400 transition-colors"
                >
                  Form Pengkajian
                </a>
              </li>
              <li>
                <a
                  href="#diagnosa"
                  className="hover:text-teal-400 transition-colors"
                >
                  Diagnosa & Intervensi
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Referensi Standar */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Referensi Standar
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  SDKI (Diagnosa)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  SLKI (Luaran)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  SIKI (Intervensi)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Juknis Kemenkes
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span>Kampus B : JL.Alternatif Cibubur KM.1</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>021-845290</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-teal-400 shrink-0" />
                <span>www.akperberkala.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Garis Pemisah & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <p>© 2026 Askep Maternitas. Hak Cipta Dilindungi.</p>
            <span className="hidden md:block text-slate-700">|</span>
            <p className="text-slate-500 font-medium">AKPER BWH 2026</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-400 transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-teal-400 transition-colors">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
