import React from "react";

export default function HighlightCards() {
  return (
    <section id="fase" className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 shadow-lg rounded-sm overflow-hidden text-white">
        {/* Card 1 */}
        <div className="bg-cyan-600 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Format Pengkajian Data
            </h3>
            <p className="text-cyan-50 text-sm leading-relaxed mb-6">
              Template isian identitas, riwayat obstetri, pola kebiasaan, hingga
              pemeriksaan fisik maternitas. Dibuat terstruktur sesuai standar
              praktikum.
            </p>
          </div>
          <a
            href="#pengkajian"
            className="inline-block w-max px-5 py-2 border border-white/70 text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-cyan-700 transition"
          >
            Mulai Pengkajian
          </a>
        </div>

        {/* Card 2 */}
        <div className="bg-sky-600 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Analisa Data & Diagnosa (SDKI)
            </h3>
            <p className="text-sky-50 text-sm leading-relaxed mb-6">
              Panduan menyusun data subjektif-objektif menjadi analisa data yang
              tepat, serta menentukan diagnosa keperawatan maternitas sesuai
              standar SDKI/PPNI.
            </p>
          </div>
          <a
            href="#diagnosa"
            className="inline-block w-max px-5 py-2 border border-white/70 text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-sky-700 transition"
          >
            Susun Diagnosa
          </a>
        </div>

        {/* Card 3 */}
        <div className="bg-blue-800 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Rencana & Evaluasi SOAP
            </h3>
            <div className="space-y-3 text-sm text-blue-100">
              <p className="leading-relaxed">
                Susun intervensi, catat implementasi tindakan, dan buat evaluasi
                perkembangan pasien (SOAP) untuk menyelesaikan tugas askep.
              </p>
              <div className="pt-2 border-t border-blue-700">
                <span className="block font-semibold text-teal-300">
                  Fitur Pendukung:
                </span>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Auto-format SOAP</li>
                  <li>Referensi Intervensi (SIKI)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}