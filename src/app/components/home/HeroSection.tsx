"use client";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-primary)] mb-6">
        {t.hero.name}
      </h1>
      <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
        {t.hero.title}
      </p>
    </section>
  );
};

export default HeroSection;
