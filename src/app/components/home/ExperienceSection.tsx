"use client";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { ExperienceTimeline } from "@/app/components/experience-timeline/ExperienceTimeline";

const ExperienceSection = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative pt-0 pb-16 scroll-mt-20">
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-[var(--color-primary)] text-center">
          {t.sections.experience}
        </h2>
        <div className="space-y-6">
          <ExperienceTimeline />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
