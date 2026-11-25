import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EvaluasiForm from "@/components/evaluasi/EvaluasiForm";

export const metadata = {
  title: "Evaluasi (SOAP) - Askep Maternitas",
};

export default function EvaluasiPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Alur Askep
          </Link>
          <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
            Modul 6 • Evaluasi (Catatan Perkembangan)
          </span>
        </div>

        <EvaluasiForm />
      </div>
    </main>
  );
}