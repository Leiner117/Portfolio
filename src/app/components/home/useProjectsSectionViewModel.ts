"use client";
import { useState, useRef } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import enData from "@/app/data/en.json";
import { TargetRect } from "@/app/components/missions/useConstellationCanvasViewModel";

export type Project = (typeof enData)["projects"][number];

export interface ProjectsSectionViewModel {
  projects: Project[];
  selected: { project: Project; index: number } | null;
  hoveredIndex: number | null;
  targetRect: TargetRect | null;
  sectionRef: React.RefObject<HTMLElement | null>;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  handleCardEnter: (index: number) => void;
  handleCardLeave: () => void;
  handleSelect: (project: Project, index: number) => void;
  handleClose: () => void;
}

export const useProjectsSectionViewModel = (): ProjectsSectionViewModel => {
  const { t } = useLanguage();
  const projects = t.projects as Project[];

  const [selected, setSelected] = useState<{ project: Project; index: number } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  const handleCardEnter = (index: number) => {
    setHoveredIndex(index);
    const card    = cardRefs.current[index];
    const section = sectionRef.current;
    if (card && section) {
      const cr = card.getBoundingClientRect();
      const sr = section.getBoundingClientRect();
      setTargetRect({ x: cr.left - sr.left, y: cr.top - sr.top, width: cr.width, height: cr.height });
    }
  };

  const handleCardLeave = () => {
    setHoveredIndex(null);
    setTargetRect(null);
  };

  const handleSelect = (project: Project, index: number) => setSelected({ project, index });
  const handleClose  = () => setSelected(null);

  return {
    projects,
    selected,
    hoveredIndex,
    targetRect,
    sectionRef,
    cardRefs,
    handleCardEnter,
    handleCardLeave,
    handleSelect,
    handleClose,
  };
};
