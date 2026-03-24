"use client";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import MissionCard from "@/app/components/missions/MissionCard";
import MissionModal from "@/app/components/missions/MissionModal";
import ConstellationCanvas from "@/app/components/missions/ConstellationCanvas";
import { useProjectsSectionViewModel, Project } from "./useProjectsSectionViewModel";

const ProjectsSection = () => {
  const { t } = useLanguage();
  const {
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
  } = useProjectsSectionViewModel();

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };
  const handleEnter  = (index: number) => () => handleCardEnter(index);
  const handleClick  = (project: Project, index: number) => () => handleSelect(project, index);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-24 scroll-mt-20"
      style={{ background: "var(--color-bg)" }}
    >
      <ConstellationCanvas targetRect={targetRect} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <span
            className="font-mono text-[11px] tracking-[0.25em] block mb-3"
            style={{ color: "var(--color-secondary)", opacity: 0.6 }}
          >
            &gt; {t.missions.missionLogs}
          </span>
          <h2
            className="text-3xl font-bold tracking-wide"
            style={{ color: "var(--color-primary)" }}
          >
            {t.sections.projects}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={setCardRef(index)}
              onMouseEnter={handleEnter(index)}
              onMouseLeave={handleCardLeave}
            >
              <MissionCard
                project={project}
                index={index}
                connected={hoveredIndex === index}
                onClick={handleClick(project, index)}
              />
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <MissionModal
          project={selected.project}
          index={selected.index}
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
