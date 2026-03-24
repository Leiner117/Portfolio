"use client";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import TechIcon from "@/app/components/techIcon/TechIcon";
import enData from "@/app/data/en.json";
import { useMissionCardViewModel } from "./useMissionCardViewModel";
import { useMissionModalViewModel } from "./useMissionModalViewModel";

type Project = (typeof enData)["projects"][number];

interface MissionModalProps {
  project: Project;
  index: number;
  onClose: () => void;
}

const MissionModal: React.FC<MissionModalProps> = ({ project, index, onClose }) => {
  const { t } = useLanguage();
  const { missionNumber, statusLabel, statusColor } = useMissionCardViewModel(project, index);
  useMissionModalViewModel(onClose);

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const missions = t.missions;
  const images: string[] = project.images ?? [];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{
          background: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border)",
          animation: "modal-enter 0.2s ease-out both",
        }}
        onClick={stopPropagation}
      >
        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-6 h-px" style={{ background: "var(--color-secondary)", opacity: 0.7 }} />
        <span className="absolute top-0 left-0 w-px h-6" style={{ background: "var(--color-secondary)", opacity: 0.7 }} />
        <span className="absolute bottom-0 right-0 w-6 h-px" style={{ background: "var(--color-secondary)", opacity: 0.7 }} />
        <span className="absolute bottom-0 right-0 w-px h-6" style={{ background: "var(--color-secondary)", opacity: 0.7 }} />

        {/* Header */}
        <div
          className="sticky top-0 backdrop-blur-sm px-6 py-4 flex items-center justify-between z-10"
          style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)" }}
        >
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-[11px] tracking-[0.2em]"
              style={{ color: "var(--color-secondary)", opacity: 0.7 }}
            >
              {missions.missionPrefix} {/* // */} {missionNumber}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
              <span className="font-mono text-[10px] tracking-[0.15em]" style={{ color: statusColor }}>
                {statusLabel}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-[10px] tracking-widest transition-opacity duration-200 hover:opacity-100"
            style={{ color: "var(--color-text-secondary)", opacity: 0.45 }}
          >
            [ESC]
          </button>
        </div>

        <div className="p-6">
          {/* Title */}
          <h2 className="text-xl font-semibold tracking-wide mb-1" style={{ color: "var(--color-text)" }}>
            {project.title}
          </h2>
          <div className="w-10 h-px mb-7" style={{ background: "var(--color-secondary)", opacity: 0.5 }} />

          {/* Image area */}
          <div className="mb-7">
            {images.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    className="w-full h-44 object-cover"
                    style={{ border: "1px solid var(--color-border)" }}
                  />
                ))}
              </div>
            ) : (
              <div
                className="w-full h-44 flex flex-col items-center justify-center gap-1"
                style={{ border: "1px solid var(--color-border)", background: "var(--color-bg)" }}
              >
                <span
                  className="font-mono text-[11px] tracking-[0.2em]"
                  style={{ color: "var(--color-text-secondary)", opacity: 0.3 }}
                >
                  {missions.noVisualData}
                </span>
                <span
                  className="font-mono text-[10px] tracking-[0.15em]"
                  style={{ color: "var(--color-text-secondary)", opacity: 0.2 }}
                >
                  {missions.classified}
                </span>
              </div>
            )}
          </div>

          {/* Mission brief */}
          <div className="mb-7">
            <span
              className="font-mono text-[10px] tracking-[0.15em] block mb-3"
              style={{ color: "var(--color-text-secondary)", opacity: 0.5 }}
            >
              {missions.missionBrief}
            </span>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {project.description}
            </p>
          </div>

          {/* Equipment */}
          <div className="mb-7">
            <span
              className="font-mono text-[10px] tracking-[0.15em] block mb-3"
              style={{ color: "var(--color-text-secondary)", opacity: 0.5 }}
            >
              {missions.equipment}
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-[11px] px-3 py-1.5 font-mono"
                  style={{
                    color: "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-bg)",
                  }}
                >
                  <TechIcon name={tech} size={13} />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="w-full h-px mb-5" style={{ background: "var(--color-border)" }} />
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] px-4 py-2 transition-all duration-200 tracking-[0.1em] hover:opacity-100"
              style={{ color: "var(--color-text-secondary)", border: "1px solid var(--color-border)", opacity: 0.6 }}
            >
              {missions.github} →
            </a>
            {project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] px-4 py-2 transition-all duration-200 tracking-[0.1em]"
                style={{ color: "var(--color-secondary)", border: "1px solid var(--color-secondary)", opacity: 0.7 }}
              >
                {missions.liveSite} →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionModal;
