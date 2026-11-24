import React from "react";
import Hero from "@/components/Hero";
import ContactBar from "@/components/ContactBar";
import HighlightCards from "@/components/HighlightCards";
import AskepWorkflow from "@/components/AskepWorkflow";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Hero />
      <ContactBar />
      <HighlightCards />
      <AskepWorkflow />
      <Footer />
    </div>
  );
}