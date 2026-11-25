import PengkajianResult from "@/components/pengkajian/PengkajianResult";

export const metadata = {
  title: "Hasil Pengkajian Ibu Pasca Partum - Askep Maternitas",
};

export default function PengkajianHasilPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        <PengkajianResult />
      </div>
    </main>
  );
}