import React from "react";
import {
  ClipboardList,
  Activity,
  HeartPulse,
  FileText,
  Stethoscope,
  CheckSquare,
} from "lucide-react";

const workflowSteps = [
  {
    title: "1. Pengkajian",
    icon: ClipboardList,
    iconColor: "text-cyan-200",
    gradient: "from-cyan-600 to-cyan-700",
    hoverText: "hover:text-cyan-700",
    href: "#anc",
    cta: "Form Pengkajian",
    items: [
      "Identitas Pasien & Suami",
      "Riwayat Kesehatan & Obstetri (P-A)",
      "Riwayat Persalinan (Kala I-IV, APGAR)",
      "Pola Kebiasaan & Pemeriksaan Fisik",
    ],
  },
  {
    title: "2. Analisa Data",
    icon: Activity,
    iconColor: "text-sky-200",
    gradient: "from-sky-600 to-sky-700",
    hoverText: "hover:text-sky-700",
    href: "#analisa",
    cta: "Detail Analisa",
    items: [
      "Data Subjektif & Objektif (DS/DO)",
      "Identifikasi Masalah",
      "Penentuan Etiologi",
    ],
  },
  {
    title: "3. Diagnosa",
    icon: HeartPulse,
    iconColor: "text-teal-200",
    gradient: "from-teal-600 to-teal-700",
    hoverText: "hover:text-teal-700",
    href: "#diagnosa",
    cta: "Detail Diagnosa",
    items: [
      "Diagnosa Keperawatan (P&E)",
      "Tanggal Ditemukan & Teratasi",
      "Referensi SDKI/SLKI",
    ],
  },
  {
    title: "4. Rencana",
    icon: FileText,
    iconColor: "text-blue-300",
    gradient: "from-blue-700 to-blue-800",
    hoverText: "hover:text-blue-800",
    href: "#rencana",
    cta: "Detail Rencana",
    items: [
      "Tujuan & Kriteria Hasil (SLKI)",
      "Rencana Tindakan (SIKI)",
      "Intervensi Independen & Interdependen",
    ],
  },
  {
    title: "5. Implementasi",
    icon: Stethoscope,
    iconColor: "text-sky-300",
    gradient: "from-sky-800 to-indigo-900",
    hoverText: "hover:text-sky-900",
    href: "#implementasi",
    cta: "Detail Tindakan",
    items: [
      "Catatan Keperawatan Harian",
      "Tindakan & Hasil",
      "Paraf & Nama Jelas",
    ],
  },
  {
    title: "6. Evaluasi (SOAP)",
    icon: CheckSquare,
    iconColor: "text-cyan-300",
    gradient: "from-cyan-800 to-slate-800",
    hoverText: "hover:text-cyan-800",
    href: "#evaluasi",
    cta: "Detail Evaluasi",
    items: [
      "Subjektif, Objektif, Analisis, Planning",
      "Evaluasi Hasil Mengacu Tujuan",
      "Catatan Perkembangan",
    ],
  },
];

export default function AskepWorkflow() {
  return (
    <section id="pengkajian" className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-light text-sky-900">
          Alur <span className="font-semibold">Dokumentasi Keperawatan</span>
        </h2>
        <p className="text-slate-500 text-sm mt-2 max-w-2xl mx-auto">
          Proses Asuhan Keperawatan Maternitas terstruktur sesuai standar format
          dokumentasi klinis (Pasca Partum).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflowSteps.map((step) => {
          const IconComponent = step.icon;
          return (
            <div
              key={step.title}
              className={`bg-gradient-to-br ${step.gradient} p-8 rounded-xl shadow-lg text-white flex flex-col justify-between transition hover:-translate-y-1 duration-300`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <IconComponent className={`w-8 h-8 ${step.iconColor}`} />
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <ul className="text-white/90 text-sm space-y-2 leading-relaxed mb-6">
                  {step.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <a
                href={step.href}
                className={`inline-block w-max px-5 py-2 bg-white/10 border border-white/30 rounded text-xs font-semibold uppercase tracking-wider hover:bg-white ${step.hoverText} transition`}
              >
                {step.cta}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}