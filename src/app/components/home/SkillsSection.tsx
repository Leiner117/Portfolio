"use client";
import React from "react";
import TechIcon from "@/app/components/techIcon/TechIcon";
import { useLanguage } from "@/app/context/LanguageContext";
import enData from "@/app/data/en.json";

type Skill = (typeof enData)["skills"][number];

const SkillsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-16 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-primary)]">
        {t.sections.skills}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {t.skills.map((skill: Skill) => (
          <div key={skill.id}
            className="bg-[var(--color-bg-secondary)] p-4 rounded-lg shadow-md text-center border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
          >
            <div className="flex flex-col items-center justify-center">
              <TechIcon
                name={skill.name}
                size={28}
                className="text-[var(--color-primary)]"
              />
              <p className="font-medium text-[var(--color-text)] mt-3">
                {skill.name}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                {skill.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
