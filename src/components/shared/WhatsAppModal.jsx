"use client";
import React, { useEffect, useId, useState } from "react";
import { Send, X } from "lucide-react";

export default function WhatsAppModal({
  isOpen,
  onClose,
  messageText,
  title = "Kirim hasil ke WhatsApp",
}) {
  const [waNumber, setWaNumber] = useState("");
  const [error, setError] = useState("");
  const inputId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatPhoneNumber = (rawNumber) => {
    let number = rawNumber.replace(/\D/g, "");
    if (number.startsWith("0")) {
      number = `62${number.slice(1)}`;
    } else if (number.startsWith("8")) {
      number = `62${number}`;
    }
    return number;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedNumber = formatPhoneNumber(waNumber);
    if (!/^62\d{8,13}$/.test(formattedNumber)) {
      setError("Periksa kembali nomor WhatsApp. Gunakan nomor yang aktif.");
      return;
    }
    const waUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(
      messageText ?? ""
    )}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    onClose?.();
  };

  return (
    <div
      className="print:hidden fixed inset-0 z-[999] flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${inputId}-title`}
        className="w-full max-w-[400px] overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-xl sm:rounded-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 px-5 pt-5">
          <div className="min-w-0">
            <h2
              id={`${inputId}-title`}
              className="text-[15px] font-semibold tracking-tight text-slate-900"
            >
              {title}
            </h2>
            <p className="mt-1 text-[13px] leading-5 text-slate-500">
              Masukkan nomor tujuan untuk melanjutkan ke WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="-mr-1 -mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
          >
            <X className="h-[16px] w-[16px]" strokeWidth={2} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="px-5 pb-5 pt-5">
          <div>
            <label
              htmlFor={inputId}
              className="mb-1.5 block text-[12px] font-medium uppercase tracking-wide text-slate-500"
            >
              Nomor WhatsApp
            </label>
            <input
              id={inputId}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              autoFocus
              placeholder="08xxxxxxxxxx"
              value={waNumber}
              aria-invalid={Boolean(error)}
              aria-describedby={`${inputId}-hint`}
              onChange={(event) => {
                const filteredValue = event.target.value.replace(/\D/g, "");
                setWaNumber(filteredValue);
                if (error) setError("");
              }}
              className={`h-10 w-full rounded-lg border bg-white px-3 text-[14px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 ${
                error
                  ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10"
                  : "border-slate-200"
              }`}
            />
            <p
              id={`${inputId}-hint`}
              className={`mt-1.5 text-[12px] leading-5 ${
                error ? "text-rose-600" : "text-slate-500"
              }`}
            >
              {error ||
                "Nomor Indonesia. Awalan 08 otomatis menjadi +62."}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="h-9 rounded-lg px-3 text-[13px] font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 text-[13px] font-medium text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/20 active:bg-emerald-800"
            >
              <Send className="h-[14px] w-[14px]" strokeWidth={2} />
              Kirim ke WhatsApp
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}