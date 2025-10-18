"use client";
import React from "react";
import TechIcon from "@/app/components/techIcon/TechIcon";
import { useLanguage } from "@/app/context/LanguageContext";
import enData from "@/app/data/en.json";
import SkillsOrbit from "@/app/components/skills-orbit/SkillsOrbit";

type Skill = (typeof enData)["skills"][number];

const SkillsSection = () => {
  const { t } = useLanguage();
  const constellationData = (t.skills as Skill[]).map((s, i) => ({
    id: s.id ?? i,
    name: s.name,
    category: s.category,
    icon: () => <TechIcon name={s.name} size={24} className="text-white" />,
  }));

  return (
    <section id="skills" className="scroll-mt-20">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] text-center">{t.sections.skills}</h2>
      <SkillsOrbit skills={constellationData} />
    </section>
  );
};

export default SkillsSection;
