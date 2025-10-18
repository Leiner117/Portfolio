"use client";
import { useEffect, useState, useMemo, useCallback } from "react";

export interface Skill {
  id: number;
  name: string;
  category: string;
}

export interface Orbit {
  group: Skill[];
  radius: number;
  anim: string;
}

export interface SkillsOrbitViewModel {
  orbits: Orbit[];
  displayedSkill: Skill;
  hoveredSkill: Skill | null;
  isHovered: (id: number) => boolean;
  onEnter: (s: Skill) => void;
  onLeave: () => void;
}

export const useSkillsOrbitViewModel = (skills: Skill[]): SkillsOrbitViewModel => {
  const grouped = useMemo(() => {
    return {
      Frontend: skills.filter((s) => s.category.includes("Frontend")),
      Backend: skills.filter((s) => s.category.includes("Backend")),
      Data: skills.filter((s) => s.category.includes("Data")),
      Tools: skills.filter((s) => s.category.includes("Tools")),
    };
  }, [skills]);

  const allSkills = useMemo(() => [...skills], [skills]);

  const [coreSkill, setCoreSkill] = useState<Skill>(allSkills[0]);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  // orbits descriptor
  const orbits: Orbit[] = useMemo(() => {
    return [
      { group: grouped.Frontend, radius: 110, anim: "animate-spin-slow" },
      { group: grouped.Backend, radius: 160, anim: "animate-spin-slower" },
      { group: grouped.Data.concat(grouped.Tools), radius: 210, anim: "animate-spin-slowest" },
    ];
  }, [grouped]);

  // rotation interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (hoveredSkill) return;
      setTimeout(() => {
        setCoreSkill((prev) => {
          const currentIndex = allSkills.findIndex((s) => s.id === prev.id);
          return allSkills[(currentIndex + 1) % allSkills.length];
        });
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, [hoveredSkill, allSkills]);

  const onEnter = useCallback((s: Skill) => setHoveredSkill(s), []);
  const onLeave = useCallback(() => setHoveredSkill(null), []);

  const isHovered = useCallback((id: number) => hoveredSkill?.id === id, [hoveredSkill]);

  const displayedSkill = hoveredSkill || coreSkill;

  return {
    orbits,
    displayedSkill,
    hoveredSkill,
    isHovered,
    onEnter,
    onLeave,
  };
}
