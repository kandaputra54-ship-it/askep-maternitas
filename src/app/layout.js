import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Askep Maternitas - Sistem Informasi Asuhan Keperawatan",
  description: "Dokumentasi dan panduan klinis asuhan keperawatan maternitas terpadu (Antenatal, Intranatal, Postnatal).",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-800 font-sans">
        {children}
      </body>
    </html>
  );
}