import EvaluasiResult from "@/components/evaluasi/EvaluasiResult";

export const metadata = {
  title: "Hasil Evaluasi (SOAP) - Askep Maternitas",
};

export default function EvaluasiHasilPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        <EvaluasiResult />
      </div>
    </main>
  );
}