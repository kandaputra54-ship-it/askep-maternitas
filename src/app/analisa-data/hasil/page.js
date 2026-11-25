import AnalisaDataResult from "@/components/analisa-data/AnalisaDataResult";

export const metadata = {
  title: "Hasil Data Fokus & Analisa Data - Askep Maternitas",
};

export default function AnalisaDataHasilPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        <AnalisaDataResult />
      </div>
    </main>
  );
}