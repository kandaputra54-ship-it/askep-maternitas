"use client";

import React from "react";
import { GraduationCap } from "lucide-react";

export default function IdentitasMahasiswa({ data, onChange }) {
  const handleToggle = (checked) => {
    onChange({
      ...data,
      isMahasiswa: checked,
    });
  };

  const handleFieldChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-5 w-5 text-slate-600" strokeWidth={1.8} />
          <div>
            <h3 className="text-[15px] font-semibold tracking-tight text-slate-900">
              Identitas Mahasiswa / Praktikan
            </h3>
            <p className="mt-0.5 text-[13px] leading-5 text-slate-500">
              Opsional — aktifkan jika pengisian dilakukan oleh mahasiswa praktik
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <label className="inline-flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={data.isMahasiswa}
            onChange={(e) => handleToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ms-2.5 text-[13px] font-medium text-slate-700">
            {data.isMahasiswa ? "Diisi Mahasiswa" : "Tidak Diisi"}
          </span>
        </label>
      </div>

      {data.isMahasiswa && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 pt-5 border-t border-slate-100">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium uppercase tracking-wide text-slate-500">
              Nama Mahasiswa
            </label>
            <input
              type="text"
              placeholder="Contoh: Kanda Putra"
              value={data.namaMhs}
              onChange={(e) => handleFieldChange("namaMhs", e.target.value)}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[14px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium uppercase tracking-wide text-slate-500">
              NIM
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Contoh: 202201001"
              value={data.nim}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, "");
                handleFieldChange("nim", numericValue);
              }}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[14px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium uppercase tracking-wide text-slate-500">
              Ruang / Wisma
            </label>
            <input
              type="text"
              placeholder="Contoh: Wisma Melati"
              value={data.ruang}
              onChange={(e) => handleFieldChange("ruang", e.target.value)}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[14px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium uppercase tracking-wide text-slate-500">
              Tanggal Pengisian
            </label>
            <input
              type="date"
              value={data.tgl}
              onChange={(e) => handleFieldChange("tgl", e.target.value)}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[14px] text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
