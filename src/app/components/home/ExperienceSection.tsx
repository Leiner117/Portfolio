"use client";
import React from "react";
import TechIcon from "@/app/components/techIcon/TechIcon";
import { useLanguage } from "@/app/context/LanguageContext";
import enData from "@/app/data/en.json";

type Experience = (typeof enData)["experience"][number];

const ExperienceSection = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-16 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-primary)]">
        {t.sections.experience}
      </h2>
      <div className="space-y-6">
  {t.experience.map((exp: Experience) => (
          <div
            key={exp.id}
            className="bg-[var(--color-bg-secondary)] p-6 rounded-lg shadow-md border border-[var(--color-border)]"
          >
            <h3 className="text-xl font-bold mb-2 text-[var(--color-text)]">
              {exp.position}
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-2">
              {exp.company} • {exp.period}
            </p>
            <p className="text-[var(--color-text)] mb-4">{exp.description}</p>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="flex items-center text-xs bg-[var(--color-secondary)] text-[var(--color-bg)] px-2 py-1 rounded space-x-2"
                >
                  <TechIcon name={tech} className="text-[var(--color-bg)]" />
                  <span className="ml-1">{tech}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
