"use client";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import TechIcon from "@/app/components/techIcon/TechIcon";
import enData from "@/app/data/en.json";
import { useMissionCardViewModel } from "./useMissionCardViewModel";

type Project = (typeof enData)["projects"][number];

interface MissionCardProps {
  project: Project;
  index: number;
  connected?: boolean;
  onClick: () => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ project, index, connected = false, onClick }) => {
  const { t } = useLanguage();
  const { missionNumber, statusLabel, statusColor } = useMissionCardViewModel(project, index);
  const missions = t.missions;

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <button onClick={onClick} className="w-full text-left group">
      <div
        className="relative p-6 transition-all duration-500"
        style={{
          border: `1px solid ${connected ? "rgba(212,175,55,0.6)" : "var(--color-border)"}`,
          background: "var(--color-bg-secondary)",
          boxShadow: connected
            ? "0 0 24px rgba(212,175,55,0.12), 0 0 8px rgba(212,175,55,0.08)"
            : "none",
        }}
      >
        {/* Corner accents */}
        <span
          className="absolute top-0 left-0 w-4 h-px group-hover:w-8 transition-all duration-300"
          style={{ background: "var(--color-secondary)", opacity: 0.5 }}
        />
        <span
          className="absolute top-0 left-0 w-px h-4 group-hover:h-8 transition-all duration-300"
          style={{ background: "var(--color-secondary)", opacity: 0.5 }}
        />
        <span
          className="absolute bottom-0 right-0 w-4 h-px group-hover:w-8 transition-all duration-300"
          style={{ background: "var(--color-secondary)", opacity: 0.5 }}
        />
        <span
          className="absolute bottom-0 right-0 w-px h-4 group-hover:h-8 transition-all duration-300"
          style={{ background: "var(--color-secondary)", opacity: 0.5 }}
        />

        {/* Top row */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="font-mono text-[11px] tracking-[0.2em]"
            style={{ color: "var(--color-secondary)", opacity: 0.7 }}
          >
            {missions.missionPrefix} {"//"} {missionNumber}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
            <span className="font-mono text-[10px] tracking-[0.15em]" style={{ color: statusColor }}>
              {statusLabel}
            </span>
          </div>
        </div>

        <div className="w-full h-px mb-5" style={{ background: "var(--color-border)" }} />

        {/* Title */}
        <h3
          className="font-semibold text-base mb-3 tracking-wide transition-colors duration-300"
          style={{ color: "var(--color-text)" }}
        >
          <span className="group-hover:text-[var(--color-secondary)] transition-colors duration-300">
            {project.title}
          </span>
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-text-secondary)" }}>
          {project.description}
        </p>

        {/* Equipment */}
        <div className="mb-6">
          <span
            className="font-mono text-[10px] tracking-[0.15em] block mb-2"
            style={{ color: "var(--color-text-secondary)", opacity: 0.6 }}
          >
            {missions.equipment}
          </span>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 text-[11px] font-mono"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <TechIcon name={tech} size={11} />
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full h-px mb-4" style={{ background: "var(--color-border)" }} />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={stopPropagation}
            className="font-mono text-[10px] tracking-[0.12em] transition-colors duration-200 hover:opacity-100"
            style={{ color: "var(--color-text-secondary)", opacity: 0.5 }}
          >
            {missions.github}
          </a>
          <span
            className="font-mono text-[11px] tracking-[0.12em] flex items-center gap-1.5 transition-colors duration-300"
            style={{ color: "var(--color-text-secondary)", opacity: 0.5 }}
          >
            <span className="group-hover:text-[var(--color-secondary)] group-hover:opacity-100 transition-all duration-300">
              {missions.viewFiles}
            </span>
            <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block group-hover:text-[var(--color-secondary)]">
              →
            </span>
          </span>
        </div>
      </div>
    </button>
  );
};

export default MissionCard;
