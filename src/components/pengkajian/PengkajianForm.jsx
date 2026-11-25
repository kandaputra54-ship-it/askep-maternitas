"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  FileText,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import IdentitasMahasiswa from "@/components/shared/IdentitasMahasiswa";

const STORAGE_KEY = "askep_maternitas_pengkajian";

const STEPS = [
  { id: 1, title: "Identitas & Resume" },
  { id: 2, title: "Persalinan & Obstetri" },
  { id: 3, title: "KB, Kebiasaan & Sosial" },
  { id: 4, title: "Pemeriksaan Fisik" },
  { id: 5, title: "Penunjang & Terapi" },
];

const emptyObstetri = () => ({
  id: Date.now() + Math.random(),
  kehamilanKe: "",
  penyulitHamil: "",
  jenisPersalinan: "",
  penolong: "",
  penyulitPersalinan: "",
  komplikasiNifas: "",
  jenisKelamin: "",
  bb: "",
  pb: "",
  keadaanUmur: "",
});

const initialData = {
  // Administrasi & Identitas (Hal 2)
  tglMasuk: "",
  jamMasuk: "",
  ruangKelas: "",
  noKamar: "",
  tglPengkajian: "",
  jamPengkajian: "",

  namaPasien: "",
  umurPasien: "",
  sukuPasien: "",
  agamaPasien: "",
  pendidikanPasien: "",
  pekerjaanPasien: "",
  alamatPasien: "",

  namaSuami: "",
  umurSuami: "",
  sukuSuami: "",
  agamaSuami: "",
  pendidikanSuami: "",
  pekerjaanSuami: "",
  alamatSuami: "",

  statusPerkawinan: "Kawin",
  lamaPerkawinan: "",
  perkawinanKe: "1",
  resume: "",

  // Riwayat Keperawatan & Persalinan (Hal 2-3)
  keluhanUtama: "",
  tglPersalinan: "",
  jamPersalinan: "",
  tipePersalinan: "Spontan",
  bantuanPersalinan: "",
  kala1Jam: "",
  kala1Menit: "",
  kala2Jam: "",
  kala2Menit: "",
  kala3Jam: "",
  kala3Menit: "",
  totalJam: "",
  totalMenit: "",
  jumlahPerdarahan: "",
  jkBayi: "Laki-laki",
  bbBayi: "",
  pbBayi: "",
  apgar1: "",
  apgar5: "",

  // Obstetri P-A-H (Hal 3)
  para: "",
  abortus: "",
  anakHidup: "",
  riwayatObstetri: [emptyObstetri()],

  // KB, Imunisasi TT & Penyakit Keluarga (Hal 3)
  melaksanakanKb: "Tidak",
  jenisKb: "",
  jenisKbLain: "",
  sejakKb: "",
  masalahKb: "",
  rencanaKb: "",
  imunisasiTt: "Tidak",
  jumlahTt: "",
  usiaHamilTt: "",
  penyakitKeluarga: [],
  penyakitKeluargaLain: "",

  // Kebiasaan Sehari-hari (Hal 4-5)
  frekMakan: "",
  jenisMakanan: "",
  nafsuMakan: "Baik",
  alasanTidakNafsu: "",
  alergiMakanan: "Tidak ada",
  detailAlergi: "",
  bbSebelumHamil: "",
  bbSekarang: "",

  babFrek: "",
  babKarakteristik: "",
  babTerakhir: "",
  babHemoroid: "Tidak",
  babKeluhan: "",
  bakFrek: "",
  bakKarakteristik: "",
  bakKeluhan: "",

  mandiFrek: "",
  oralFrek: "",
  rambutFrek: "",

  jenisPekerjaan: "",
  waktuBekerja: "",
  lamaBekerja: "",
  hobi: "",
  pembatasanAktivitas: "",
  kegiatanLuang: "",
  keluhanAktivitas: "",
  aks: "Mandiri",
  tidurSiang: "Tidak",
  lamaTidur: "",
  masalahTidur: "",
  kebiasaanTidur: "",

  merokok: "Tidak",
  detailMerokok: "",
  miras: "Tidak",
  detailMiras: "",
  obatTerlarang: "Tidak",
  detailObat: "",

  masalahSeksual: "Tidak",
  detailSeksual: "",

  // Psikososial & Sosial Ekonomi (Hal 5)
  perencanaanHamil: "",
  perasaanKeluarga: "",
  kesiapanIbu: "",
  caraAtasiStress: "",
  tinggalDengan: "",
  peranKeluarga: "",
  pengetahuanRawatBayi: "",
  harapanPerawatan: "",
  faktorBudaya: "",
  penghasilanBulan: "> Rp 1.000.000",
  pengeluaranBulan: "",
  jaminanKesehatan: "",

  // Pemeriksaan Fisik (Hal 5-8)
  nadi: "",
  iramaNadi: "Teratur",
  denyutNadi: "Kuat",
  tekananDarah: "",
  suhu: "",
  capillaryRefill: "< 2 detik",
  edema: "Tidak",
  lokasiEdema: "",
  konjungtiva: "Ananemis",
  sklera: "Anikterik",
  riwayatHipertensi: "Tidak",
  riwayatJantung: "Tidak",
  detailJantung: "",
  keluhanKardio: "",

  jalanNafas: "Bersih",
  rr: "",
  iramaNafas: "Teratur",
  kedalamanNafas: "Normal / Dalam",
  batuk: "Tidak",
  jenisBatuk: "",
  sputumWarna: "",
  sputumKonsistensi: "",
  suaraNafas: "Vesikuler / Normal",

  gigiCaries: "Tidak",
  stomatitis: "Tidak",
  lidahKotor: "Tidak",
  gigiPalsu: "Tidak",
  bauMulut: "Tidak",
  muntah: "Tidak",
  isiMuntah: "",
  warnaMuntah: "",
  kesulitanMenelan: "Tidak",
  mual: "Tidak",
  nafsuMakanFisik: "Baik",
  nyeriPerut: "Tidak",
  rasaPenuhPerut: "Tidak",
  tb: "",
  bentukTubuh: "",
  membranMukosa: "Lembab",
  lila: "",
  babFisik: "Ya",
  warnaFeses: "Kuning",
  hemoroidFisik: "Tidak",
  keluhanPencernaan: "",

  statusMental: "Orientasi baik",
  kacamata: "Tidak",
  alatBantuDengar: "Tidak",
  gangguanBicara: "Tidak",
  sakitKepala: "Tidak",

  gulaDarah: "",

  bakPola: "",
  bakJumlah: "",
  bakKontrol: "Terkontrol",
  bakWarna: "Kuning jernih",
  bakKeluhanFisik: "",

  turgorKulit: "Baik / Elastis",
  warnaKulit: "Normal",
  keadaanKulit: "Baik",
  kebersihanKulit: "Bersih",
  keadaanRambut: "Bersih",

  kesulitanGerak: "Tidak",
  ekstremitasSimetris: "Simetris",
  tandaHoman: "Negatif (-)",
  oedemaEkstremitas: "Tidak",
  varices: "Tidak",
  reflekPatella: "Positif (+/+)",

  mammaeMembesar: "Ya",
  areolaMammae: "Hiperpigmentasi",
  papilaMammae: "Exverted (Menonjol)",
  kolostrum: "Ya",
  produksiAsi: "Ya",
  sumbatanAsi: "Tidak",
  pemberianAsi: "Ya",
  jamPemberianAsi: "",
  pembengkakanMammae: "Tidak",
  nyeriMammae: "Tidak",

  tfu: "",
  kontraksiUterus: "",
  konsistensiUterus: "Keras",
  lukaOperasi: "Tidak ada",
  tandaInfeksiAbdomen: "Tidak ada",
  diastasisPanjang: "",
  diastasisLebar: "",

  locheaJenis: "Rubra",
  locheaWarna: "Merah segar",
  locheaJumlah: "",
  locheaBau: "Amis khas (normal)",
  perineum: "Utuh",
  episiotomiJenis: "",
  tandaReeda:
    "Tidak ada tanda REEDA (Redness, Edema, Ecchymosis, Discharge, Approximation baik)",

  // Penunjang & Penatalaksanaan (Hal 8)
  pemeriksaanPenunjang: "",
  penatalaksanaan: "",
};

export default function PengkajianForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [mahasiswa, setMahasiswa] = useState({
    isMahasiswa: true,
    namaMhs: "",
    nim: "",
    ruang: "",
    tgl: "",
  });

  const [form, setForm] = useState(initialData);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.mahasiswa) {
          setMahasiswa({
            ...parsed.mahasiswa,
            tgl: parsed.mahasiswa.tgl || today,
          });
        } else {
          setMahasiswa((prev) => ({ ...prev, tgl: today }));
        }
        if (parsed.form) {
          setForm((prev) => ({
            ...prev,
            ...parsed.form,
            tglPengkajian: parsed.form.tglPengkajian || today,
          }));
        }
      } else {
        setMahasiswa((prev) => ({ ...prev, tgl: today }));
        setForm((prev) => ({ ...prev, tglPengkajian: today }));
      }
    } catch (err) {
      console.error("Gagal memuat pengkajian:", err);
      setMahasiswa((prev) => ({ ...prev, tgl: today }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePenyakitKeluarga = (item) => {
    setForm((prev) => {
      const exists = prev.penyakitKeluarga.includes(item);
      return {
        ...prev,
        penyakitKeluarga: exists
          ? prev.penyakitKeluarga.filter((x) => x !== item)
          : [...prev.penyakitKeluarga, item],
      };
    });
  };

  const handleObstetriChange = (idx, field, value) => {
    setForm((prev) => ({
      ...prev,
      riwayatObstetri: prev.riwayatObstetri.map((row, i) =>
        i === idx ? { ...row, [field]: value } : row,
      ),
    }));
  };

  const addObstetri = () => {
    setForm((prev) => ({
      ...prev,
      riwayatObstetri: [...prev.riwayatObstetri, emptyObstetri()],
    }));
  };

  const removeObstetri = (idx) => {
    if (form.riwayatObstetri.length === 1) return;
    setForm((prev) => ({
      ...prev,
      riwayatObstetri: prev.riwayatObstetri.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      mahasiswa,
      form,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push("/pengkajian/hasil");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Pengkajian Ibu Pasca Partum
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Asuhan Keperawatan Maternitas — Formulir Pengkajian Lengkap (5
              Tahap)
            </p>
          </div>
          <Link
            href="/pengkajian/hasil"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            Lihat Hasil Tersimpan
          </Link>
        </div>

        {/* Stepper Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 pt-6 border-t border-slate-100">
          {STEPS.map((s) => {
            const active = step === s.id;
            const passed = step > s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  active
                    ? "border-blue-600 bg-blue-50/70 text-blue-700"
                    : passed
                      ? "border-emerald-200 bg-emerald-50/40 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                    active
                      ? "bg-blue-600 text-white"
                      : passed
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {passed ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                </span>
                <span className="text-xs font-semibold leading-tight">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Komponen Shared: Identitas Mahasiswa */}
      <IdentitasMahasiswa data={mahasiswa} onChange={setMahasiswa} />

      {/* ===================================================================== */}
      {/* STEP 1: IDENTITAS PASIEN, SUAMI & RESUME                              */}
      {/* ===================================================================== */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              A. Data Masuk &amp; Waktu Pengkajian
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tanggal Masuk RS
                </label>
                <input
                  type="date"
                  name="tglMasuk"
                  value={form.tglMasuk}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jam Masuk
                </label>
                <input
                  type="time"
                  name="jamMasuk"
                  value={form.jamMasuk}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ruang / Kelas
                </label>
                <input
                  type="text"
                  name="ruangKelas"
                  value={form.ruangKelas}
                  onChange={handleChange}
                  placeholder="Contoh: Nifas / Kelas II"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  No. Kamar
                </label>
                <input
                  type="text"
                  name="noKamar"
                  value={form.noKamar}
                  onChange={handleChange}
                  placeholder="Contoh: 04"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tanggal Pengkajian
                </label>
                <input
                  type="date"
                  name="tglPengkajian"
                  value={form.tglPengkajian}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jam Pengkajian
                </label>
                <input
                  type="time"
                  name="jamPengkajian"
                  value={form.jamPengkajian}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              1. Identitas Pasien &amp; Suami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kolom Pasien */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                <p className="text-xs font-bold uppercase text-blue-700">
                  Identitas Pasien (Ibu)
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Pasien
                  </label>
                  <input
                    type="text"
                    name="namaPasien"
                    value={form.namaPasien}
                    onChange={handleChange}
                    required
                    placeholder="Ny. ..."
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Umur
                    </label>
                    <input
                      type="text"
                      name="umurPasien"
                      value={form.umurPasien}
                      onChange={handleChange}
                      placeholder="27 th"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Suku / Bangsa
                    </label>
                    <input
                      type="text"
                      name="sukuPasien"
                      value={form.sukuPasien}
                      onChange={handleChange}
                      placeholder="Jawa / Indonesia"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Agama
                    </label>
                    <input
                      type="text"
                      name="agamaPasien"
                      value={form.agamaPasien}
                      onChange={handleChange}
                      placeholder="Islam"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pendidikan
                    </label>
                    <input
                      type="text"
                      name="pendidikanPasien"
                      value={form.pendidikanPasien}
                      onChange={handleChange}
                      placeholder="SMA / S1"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pekerjaan
                  </label>
                  <input
                    type="text"
                    name="pekerjaanPasien"
                    value={form.pekerjaanPasien}
                    onChange={handleChange}
                    placeholder="Ibu Rumah Tangga / Karyawan"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Alamat / Telp
                  </label>
                  <input
                    type="text"
                    name="alamatPasien"
                    value={form.alamatPasien}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Kolom Suami */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                <p className="text-xs font-bold uppercase text-blue-700">
                  Identitas Suami
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Suami
                  </label>
                  <input
                    type="text"
                    name="namaSuami"
                    value={form.namaSuami}
                    onChange={handleChange}
                    placeholder="Tn. ..."
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Umur
                    </label>
                    <input
                      type="text"
                      name="umurSuami"
                      value={form.umurSuami}
                      onChange={handleChange}
                      placeholder="30 th"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Suku / Bangsa
                    </label>
                    <input
                      type="text"
                      name="sukuSuami"
                      value={form.sukuSuami}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Agama
                    </label>
                    <input
                      type="text"
                      name="agamaSuami"
                      value={form.agamaSuami}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pendidikan
                    </label>
                    <input
                      type="text"
                      name="pendidikanSuami"
                      value={form.pendidikanSuami}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pekerjaan
                  </label>
                  <input
                    type="text"
                    name="pekerjaanSuami"
                    value={form.pekerjaanSuami}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Alamat / Telp
                  </label>
                  <input
                    type="text"
                    name="alamatSuami"
                    value={form.alamatSuami}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status Perkawinan
                </label>
                <select
                  name="statusPerkawinan"
                  value={form.statusPerkawinan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="Kawin">Kawin</option>
                  <option value="Belum Kawin">Belum Kawin</option>
                  <option value="Janda">Janda</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lama Perkawinan (Tahun)
                </label>
                <input
                  type="text"
                  name="lamaPerkawinan"
                  value={form.lamaPerkawinan}
                  onChange={handleChange}
                  placeholder="Contoh: 2"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Perkawinan Ke- (Kali)
                </label>
                <input
                  type="text"
                  name="perkawinanKe"
                  value={form.perkawinanKe}
                  onChange={handleChange}
                  placeholder="1"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Resume (Sejak masuk RS s/d sebelum pengkajian: data fokus,
                masalah, tindakan mandiri/kolaborasi &amp; evaluasi umum)
              </label>
              <textarea
                rows={4}
                name="resume"
                value={form.resume}
                onChange={handleChange}
                placeholder="Tuliskan ringkasan kondisi klien sejak masuk RS hingga saat pengkajian dilakukan..."
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* STEP 2: RIWAYAT PERSALINAN SEKARANG & RIWAYAT OBSTETRI (P-A-H)        */}
      {/* ===================================================================== */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              2. Riwayat Keperawatan &amp; Persalinan Sekarang
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                a. Keluhan Utama (Saat Ini)
              </label>
              <textarea
                rows={2}
                name="keluhanUtama"
                value={form.keluhanUtama}
                onChange={handleChange}
                placeholder="Contoh: Klien mengeluh nyeri pada luka jahitan perineum dan mules pada perut bagian bawah..."
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tanggal Persalinan
                </label>
                <input
                  type="date"
                  name="tglPersalinan"
                  value={form.tglPersalinan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jam Persalinan
                </label>
                <input
                  type="time"
                  name="jamPersalinan"
                  value={form.jamPersalinan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tipe Persalinan
                </label>
                <select
                  name="tipePersalinan"
                  value={form.tipePersalinan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="Spontan">Spontan</option>
                  <option value="Bantuan">Bantuan (Vakum / Forsep / SC)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jenis Bantuan (Jika bantuan)
                </label>
                <input
                  type="text"
                  name="bantuanPersalinan"
                  value={form.bantuanPersalinan}
                  onChange={handleChange}
                  placeholder="Contoh: Vakum / Induksi"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Lama Persalinan Kala I, II, III, Jumlah */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50/70 border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kala I (Jam / Menit)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="kala1Jam"
                    value={form.kala1Jam}
                    onChange={handleChange}
                    placeholder="Jam"
                    className="w-1/2 px-2.5 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                  />
                  <input
                    type="text"
                    name="kala1Menit"
                    value={form.kala1Menit}
                    onChange={handleChange}
                    placeholder="Mnt"
                    className="w-1/2 px-2.5 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kala II (Jam / Menit)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="kala2Jam"
                    value={form.kala2Jam}
                    onChange={handleChange}
                    placeholder="Jam"
                    className="w-1/2 px-2.5 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                  />
                  <input
                    type="text"
                    name="kala2Menit"
                    value={form.kala2Menit}
                    onChange={handleChange}
                    placeholder="Mnt"
                    className="w-1/2 px-2.5 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kala III (Jam / Menit)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="kala3Jam"
                    value={form.kala3Jam}
                    onChange={handleChange}
                    placeholder="Jam"
                    className="w-1/2 px-2.5 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                  />
                  <input
                    type="text"
                    name="kala3Menit"
                    value={form.kala3Menit}
                    onChange={handleChange}
                    placeholder="Mnt"
                    className="w-1/2 px-2.5 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Lama (Jam / Menit)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="totalJam"
                    value={form.totalJam}
                    onChange={handleChange}
                    placeholder="Jam"
                    className="w-1/2 px-2.5 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                  />
                  <input
                    type="text"
                    name="totalMenit"
                    value={form.totalMenit}
                    onChange={handleChange}
                    placeholder="Mnt"
                    className="w-1/2 px-2.5 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Data Bayi & Perdarahan */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Perdarahan (cc)
                </label>
                <input
                  type="text"
                  name="jumlahPerdarahan"
                  value={form.jumlahPerdarahan}
                  onChange={handleChange}
                  placeholder="250"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  JK Bayi
                </label>
                <select
                  name="jkBayi"
                  value={form.jkBayi}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  BB Bayi (kg)
                </label>
                <input
                  type="text"
                  name="bbBayi"
                  value={form.bbBayi}
                  onChange={handleChange}
                  placeholder="3.2"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  PB Bayi (cm)
                </label>
                <input
                  type="text"
                  name="pbBayi"
                  value={form.pbBayi}
                  onChange={handleChange}
                  placeholder="49"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  APGAR Menit I
                </label>
                <input
                  type="text"
                  name="apgar1"
                  value={form.apgar1}
                  onChange={handleChange}
                  placeholder="8"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  APGAR Menit V
                </label>
                <input
                  type="text"
                  name="apgar5"
                  value={form.apgar5}
                  onChange={handleChange}
                  placeholder="10"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* c. Riwayat Obstetri (P - A - Anak Hidup) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  c. Riwayat Obstetri (P - A - Anak Hidup)
                </h2>
                <p className="text-xs text-slate-500">
                  Riwayat kehamilan, persalinan, nifas, dan kondisi anak
                </p>
              </div>
              <button
                type="button"
                onClick={addObstetri}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Tambah Riwayat Kehamilan
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Para (P)
                </label>
                <input
                  type="text"
                  name="para"
                  value={form.para}
                  onChange={handleChange}
                  placeholder="1"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Abortus (A)
                </label>
                <input
                  type="text"
                  name="abortus"
                  value={form.abortus}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Anak Hidup
                </label>
                <input
                  type="text"
                  name="anakHidup"
                  value={form.anakHidup}
                  onChange={handleChange}
                  placeholder="1"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-4">
              {form.riwayatObstetri.map((obs, idx) => (
                <div
                  key={obs.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700">
                      Kehamilan #{idx + 1}
                    </span>
                    {form.riwayatObstetri.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeObstetri(idx)}
                        className="text-xs text-rose-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Hapus
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <input
                      type="text"
                      value={obs.kehamilanKe}
                      onChange={(e) =>
                        handleObstetriChange(idx, "kehamilanKe", e.target.value)
                      }
                      placeholder="Hamil ke- (1)"
                      className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={obs.penyulitHamil}
                      onChange={(e) =>
                        handleObstetriChange(
                          idx,
                          "penyulitHamil",
                          e.target.value,
                        )
                      }
                      placeholder="Penyulit Hamil"
                      className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={obs.jenisPersalinan}
                      onChange={(e) =>
                        handleObstetriChange(
                          idx,
                          "jenisPersalinan",
                          e.target.value,
                        )
                      }
                      placeholder="Jenis Persalinan"
                      className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={obs.penolong}
                      onChange={(e) =>
                        handleObstetriChange(idx, "penolong", e.target.value)
                      }
                      placeholder="Penolong (Bidan/Dr)"
                      className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={obs.penyulitPersalinan}
                      onChange={(e) =>
                        handleObstetriChange(
                          idx,
                          "penyulitPersalinan",
                          e.target.value,
                        )
                      }
                      placeholder="Penyulit Persalinan"
                      className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={obs.komplikasiNifas}
                      onChange={(e) =>
                        handleObstetriChange(
                          idx,
                          "komplikasiNifas",
                          e.target.value,
                        )
                      }
                      placeholder="Komplikasi Nifas"
                      className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={obs.jenisKelamin}
                      onChange={(e) =>
                        handleObstetriChange(
                          idx,
                          "jenisKelamin",
                          e.target.value,
                        )
                      }
                      placeholder="JK Anak (L/P)"
                      className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={obs.bb}
                      onChange={(e) =>
                        handleObstetriChange(idx, "bb", e.target.value)
                      }
                      placeholder="BB (gr/kg)"
                      className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={obs.pb}
                      onChange={(e) =>
                        handleObstetriChange(idx, "pb", e.target.value)
                      }
                      placeholder="PB (cm)"
                      className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={obs.keadaanUmur}
                      onChange={(e) =>
                        handleObstetriChange(idx, "keadaanUmur", e.target.value)
                      }
                      placeholder="Keadaan & Umur Skrg"
                      className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* STEP 3: KB, IMUNISASI TT, KEBIASAAN SEHARI-HARI & PSIKOSOSIAL         */}
      {/* ===================================================================== */}
      {step === 3 && (
        <div className="space-y-6">
          {/* d, e, f: KB, TT, Penyakit Keluarga */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              d. Riwayat KB, Imunisasi TT &amp; Penyakit Keluarga
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Melaksanakan KB
                </label>
                <select
                  name="melaksanakanKb"
                  value={form.melaksanakanKb}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Tidak">Tidak</option>
                  <option value="Ya">Ya</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jenis Kontrasepsi
                </label>
                <select
                  name="jenisKb"
                  value={form.jenisKb}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="">- Pilih -</option>
                  <option value="IUD">IUD</option>
                  <option value="Pil">Pil</option>
                  <option value="Suntik">Suntik</option>
                  <option value="Implant">Implant</option>
                  <option value="Lain-lain">Lain-lain</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sejak Kapan / Rencana KB
                </label>
                <input
                  type="text"
                  name="rencanaKb"
                  value={form.rencanaKb}
                  onChange={handleChange}
                  placeholder="Sejak ... / Rencana ..."
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Riwayat Imunisasi TT
                </label>
                <select
                  name="imunisasiTt"
                  value={form.imunisasiTt}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Tidak">Tidak</option>
                  <option value="Ya">Ya</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Berapa Kali Diberikan
                </label>
                <input
                  type="text"
                  name="jumlahTt"
                  value={form.jumlahTt}
                  onChange={handleChange}
                  placeholder="Contoh: 2 kali"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Usia Kehamilan Pemberian
                </label>
                <input
                  type="text"
                  name="usiaHamilTt"
                  value={form.usiaHamilTt}
                  onChange={handleChange}
                  placeholder="Contoh: 20 minggu"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Riwayat Penyakit Keluarga
              </label>
              <div className="flex flex-wrap gap-3">
                {["Diabetes mellitus", "Hipertensi", "Jantung"].map((item) => (
                  <label
                    key={item}
                    className="inline-flex items-center gap-2 text-sm text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form.penyakitKeluarga.includes(item)}
                      onChange={() => togglePenyakitKeluarga(item)}
                    />
                    {item}
                  </label>
                ))}
                <input
                  type="text"
                  name="penyakitKeluargaLain"
                  value={form.penyakitKeluargaLain}
                  onChange={handleChange}
                  placeholder="Lain-lain, sebutkan..."
                  className="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* g. Kebiasaan Sehari-hari */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              g. Riwayat Kebiasaan Sehari-hari Sebelum Dirawat
            </h2>

            {/* Nutrisi & Cairan */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Frekuensi Makan (x/hari)
                </label>
                <input
                  type="text"
                  name="frekMakan"
                  value={form.frekMakan}
                  onChange={handleChange}
                  placeholder="3x/hari"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nafsu Makan
                </label>
                <select
                  name="nafsuMakan"
                  value={form.nafsuMakan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Baik">Baik</option>
                  <option value="Tidak nafsu makan">Tidak nafsu makan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  BB Sebelum Hamil (kg)
                </label>
                <input
                  type="text"
                  name="bbSebelumHamil"
                  value={form.bbSebelumHamil}
                  onChange={handleChange}
                  placeholder="52"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  BB Sekarang (kg)
                </label>
                <input
                  type="text"
                  name="bbSekarang"
                  value={form.bbSekarang}
                  onChange={handleChange}
                  placeholder="60"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            {/* Eliminasi & Personal Hygiene */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  BAB (x/hari &amp; Karakteristik)
                </label>
                <input
                  type="text"
                  name="babFrek"
                  value={form.babFrek}
                  onChange={handleChange}
                  placeholder="1x/hari, lunak"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  BAK (x/hari &amp; Karakteristik)
                </label>
                <input
                  type="text"
                  name="bakFrek"
                  value={form.bakFrek}
                  onChange={handleChange}
                  placeholder="5-6x/hari, kuning jernih"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mandi / Oral Hygiene (x/hr)
                </label>
                <input
                  type="text"
                  name="mandiFrek"
                  value={form.mandiFrek}
                  onChange={handleChange}
                  placeholder="Mandi 2x, Gosok gigi 2x"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Aktivitas Kehidupan Sehari-hari
                </label>
                <select
                  name="aks"
                  value={form.aks}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Mandiri">Mandiri</option>
                  <option value="Tergantung">Tergantung / Dibantu</option>
                </select>
              </div>
            </div>

            {/* Psikososial & Sosial Ekonomi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Perencanaan Kehamilan &amp; Kesiapan Menjadi Ibu
                </label>
                <input
                  type="text"
                  name="kesiapanIbu"
                  value={form.kesiapanIbu}
                  onChange={handleChange}
                  placeholder="Kehamilan direncanakan, klien siap merawat bayi"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tinggal Dengan &amp; Peran Keluarga
                </label>
                <input
                  type="text"
                  name="tinggalDengan"
                  value={form.tinggalDengan}
                  onChange={handleChange}
                  placeholder="Suami dan orang tua"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Penghasilan Per Bulan
                </label>
                <select
                  name="penghasilanBulan"
                  value={form.penghasilanBulan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Rp 250.000 - Rp 500.000">
                    Rp 250.000 - Rp 500.000
                  </option>
                  <option value="Rp 500.000 - Rp 750.000">
                    Rp 500.000 - Rp 750.000
                  </option>
                  <option value="Rp 750.000 - Rp 1.000.000">
                    Rp 750.000 - Rp 1.000.000
                  </option>
                  <option value="> Rp 1.000.000">&gt; Rp 1.000.000</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jaminan Kesehatan
                </label>
                <input
                  type="text"
                  name="jaminanKesehatan"
                  value={form.jaminanKesehatan}
                  onChange={handleChange}
                  placeholder="BPJS Kesehatan / Umum / Asuransi"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* STEP 4: PEMERIKSAAN FISIK (a s/d k: Kardiovaskuler s/d Anogenital)   */}
      {/* ===================================================================== */}
      {step === 4 && (
        <div className="space-y-6">
          {/* a & b: Kardiovaskuler & Pernafasan */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              3. Pemeriksaan Fisik — Kardiovaskuler &amp; Pernafasan
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tekanan Darah (mmHg)
                </label>
                <input
                  type="text"
                  name="tekananDarah"
                  value={form.tekananDarah}
                  onChange={handleChange}
                  placeholder="120/80"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nadi (x/menit)
                </label>
                <input
                  type="text"
                  name="nadi"
                  value={form.nadi}
                  onChange={handleChange}
                  placeholder="84"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Suhu (°C)
                </label>
                <input
                  type="text"
                  name="suhu"
                  value={form.suhu}
                  onChange={handleChange}
                  placeholder="36.7"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Frekuensi Nafas (x/menit)
                </label>
                <input
                  type="text"
                  name="rr"
                  value={form.rr}
                  onChange={handleChange}
                  placeholder="20"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Konjungtiva / Sklera
                </label>
                <input
                  type="text"
                  name="konjungtiva"
                  value={form.konjungtiva}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Edema
                </label>
                <select
                  name="edema"
                  value={form.edema}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Tidak">Tidak ada</option>
                  <option value="Ya - Tungkai bawah">Ya (Tungkai bawah)</option>
                  <option value="Ya - Muka/Periorbita">
                    Ya (Muka/Periorbita)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jalan Nafas
                </label>
                <select
                  name="jalanNafas"
                  value={form.jalanNafas}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Bersih">Bersih</option>
                  <option value="Sputum / Lendir">Ada Sputum / Lendir</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Suara Nafas
                </label>
                <select
                  name="suaraNafas"
                  value={form.suaraNafas}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Vesikuler / Normal">Vesikuler / Normal</option>
                  <option value="Bronkhovesikuler">Bronkhovesikuler</option>
                  <option value="Ronchi">Ronchi</option>
                  <option value="Wheezing">Wheezing</option>
                </select>
              </div>
            </div>
          </div>

          {/* c s/d h: Pencernaan, Neurosensori, Endokrin, Urogenital, Integumen, Muskuloskeletal */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Pencernaan, Neurosensori, Urogenital, Integumen &amp;
              Muskuloskeletal
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  TB (cm) / LILA (cm)
                </label>
                <input
                  type="text"
                  name="tb"
                  value={form.tb}
                  onChange={handleChange}
                  placeholder="158 cm / 25 cm"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Membran Mukosa
                </label>
                <input
                  type="text"
                  name="membranMukosa"
                  value={form.membranMukosa}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status Mental
                </label>
                <select
                  name="statusMental"
                  value={form.statusMental}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Orientasi baik">Orientasi baik</option>
                  <option value="Disorientasi">Disorientasi</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gula Darah (mg/dl)
                </label>
                <input
                  type="text"
                  name="gulaDarah"
                  value={form.gulaDarah}
                  onChange={handleChange}
                  placeholder="105"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  BAK (Kontrol &amp; Warna)
                </label>
                <input
                  type="text"
                  name="bakWarna"
                  value={form.bakWarna}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Turgor &amp; Keadaan Kulit
                </label>
                <input
                  type="text"
                  name="turgorKulit"
                  value={form.turgorKulit}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tanda Homan
                </label>
                <select
                  name="tandaHoman"
                  value={form.tandaHoman}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Negatif (-)">Negatif (-)</option>
                  <option value="Positif (+)">Positif (+)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reflek Patella
                </label>
                <input
                  type="text"
                  name="reflekPatella"
                  value={form.reflekPatella}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* i, j, k: Fokus Postpartum (Dada/ASI, Abdomen/TFU, Anogenital/Lochea/REEDA) */}
          <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-6 sm:p-8 space-y-5">
            <h2 className="text-base font-bold text-blue-900 border-b border-blue-100 pb-3">
              Fokus Obstetri Postpartum: Dada &amp; ASI, Abdomen (TFU) &amp;
              Anogenital (Lochea &amp; REEDA)
            </h2>

            {/* i. Dada & Axilla */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mammae Membesar
                </label>
                <select
                  name="mammaeMembesar"
                  value={form.mammaeMembesar}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Ya">Ya</option>
                  <option value="Tidak">Tidak</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Papila Mammae
                </label>
                <select
                  name="papilaMammae"
                  value={form.papilaMammae}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Exverted (Menonjol)">
                    Exverted (Menonjol)
                  </option>
                  <option value="Datar">Datar</option>
                  <option value="Inverted (Tenggelam)">
                    Inverted (Tenggelam)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kolostrum / Produksi ASI
                </label>
                <select
                  name="produksiAsi"
                  value={form.produksiAsi}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Ya (Keluar lancar)">Ya (Keluar lancar)</option>
                  <option value="Ya (Belum lancar)">Ya (Belum lancar)</option>
                  <option value="Tidak">Tidak / Belum keluar</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pembengkakan / Nyeri Payudara
                </label>
                <select
                  name="pembengkakanMammae"
                  value={form.pembengkakanMammae}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Tidak">Tidak</option>
                  <option value="Ya, nyeri">Ya, disertai nyeri</option>
                </select>
              </div>
            </div>

            {/* j. Perut / Abdomen */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tinggi Fundus Uteri (TFU)
                </label>
                <input
                  type="text"
                  name="tfu"
                  value={form.tfu}
                  onChange={handleChange}
                  placeholder="Contoh: 2 jari di bawah pusat"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kontraksi / After Pain
                </label>
                <input
                  type="text"
                  name="kontraksiUterus"
                  value={form.kontraksiUterus}
                  onChange={handleChange}
                  placeholder="Baik / Teraba mules"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Konsistensi Uterus
                </label>
                <select
                  name="konsistensiUterus"
                  value={form.konsistensiUterus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Keras">Keras</option>
                  <option value="Lembek">Lembek</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Diastasis Rekti Abdominis (P x L)
                </label>
                <input
                  type="text"
                  name="diastasisPanjang"
                  value={form.diastasisPanjang}
                  onChange={handleChange}
                  placeholder="Contoh: 12 cm x 2 cm"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            {/* k. Anogenital & REEDA */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jenis Lochea
                </label>
                <select
                  name="locheaJenis"
                  value={form.locheaJenis}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                >
                  <option value="Rubra">Rubra (Hari 1–3)</option>
                  <option value="Sanguinolenta">
                    Sanguinolenta (Hari 4–7)
                  </option>
                  <option value="Serosa">Serosa (Hari 7–14)</option>
                  <option value="Alba">Alba (&gt; 14 Hari)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Warna &amp; Bau Lochea
                </label>
                <input
                  type="text"
                  name="locheaWarna"
                  value={form.locheaWarna}
                  onChange={handleChange}
                  placeholder="Merah segar, amis khas"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jumlah Lochea
                </label>
                <input
                  type="text"
                  name="locheaJumlah"
                  value={form.locheaJumlah}
                  onChange={handleChange}
                  placeholder="1 pembalut penuh (±50 cc)"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Perineum &amp; Episiotomi
                </label>
                <input
                  type="text"
                  name="perineum"
                  value={form.perineum}
                  onChange={handleChange}
                  placeholder="Episiotomi mediolateral"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanda-tanda REEDA (Redness, Edema, Ecchymosis, Discharge,
                Approximation)
              </label>
              <input
                type="text"
                name="tandaReeda"
                value={form.tandaReeda}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* STEP 5: PEMERIKSAAN PENUNJANG & PENATALAKSANAAN                       */}
      {/* ===================================================================== */}
      {step === 5 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            4. Pemeriksaan Penunjang &amp; 5. Penatalaksanaan
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              4. Pemeriksaan Penunjang (Lab Darah Rutin, Hb, Leukosit, Golongan
              Darah, USG, dll)
            </label>
            <textarea
              rows={5}
              name="pemeriksaanPenunjang"
              value={form.pemeriksaanPenunjang}
              onChange={handleChange}
              placeholder="• Hemoglobin (Hb): 11,4 g/dL&#10;• Leukosit: 10.200 /µL&#10;• Trombosit: 245.000 /µL&#10;• Golongan Darah: O / Rh (+)"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              5. Penatalaksanaan (Terapi Obat Oral/Injeksi, Cairan Infus, Diet,
              Perawatan Nifas)
            </label>
            <textarea
              rows={5}
              name="penatalaksanaan"
              value={form.penatalaksanaan}
              onChange={handleChange}
              placeholder="• Asam Mefenamat 3 x 500 mg (PO)&#10;• Cefadroxil 2 x 500 mg (PO)&#10;• Tablet Tambah Darah (Fe) 1 x 1 tab (PO)&#10;• Vitamin A 200.000 IU (1x1 kapsul)&#10;• Diet TKTP & mobilisasi bertahap"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya
          </button>
        ) : (
          <div />
        )}

        {step < STEPS.length ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Simpan &amp; Lihat Dokumen Pengkajian
          </button>
        )}
      </div>
    </form>
  );
}
