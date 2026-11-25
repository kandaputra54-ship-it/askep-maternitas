import ImplementasiResult from "@/components/implementasi/ImplementasiResult";

export const metadata = {
  title: "Hasil Catatan Keperawatan - Askep Maternitas",
};

export default function ImplementasiHasilPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        <ImplementasiResult />
      </div>
    </main>
  );
}