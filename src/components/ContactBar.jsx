import React from "react";
import { Phone, Globe, MapPin } from "lucide-react";

export default function ContactBar() {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-4">
          <Phone className="w-7 h-7 text-sky-600 shrink-0" />
          <div>
            <p className="text-xs text-slate-400">
              Layanan Informasi & Akademik
            </p>
            <p className="font-semibold text-slate-700">021-845290</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Globe className="w-7 h-7 text-sky-600 shrink-0" />
          <div>
            <p className="text-xs text-slate-400">Portal Resmi Kampus</p>
            <p className="font-semibold text-slate-700">
              www.akperberkala.ac.id
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MapPin className="w-7 h-7 text-sky-600 shrink-0" />
          <div>
            <p className="text-xs text-slate-400">Lokasi Kampus</p>
            <p className="font-semibold text-slate-700">
              Kampus B : JL.Alternatif Cibubur KM.1
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}