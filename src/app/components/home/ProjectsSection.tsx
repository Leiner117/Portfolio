"use client";
import React from "react";
import TechIcon from "@/app/components/techIcon/TechIcon";
import { useLanguage } from "@/app/context/LanguageContext";
import enData from "@/app/data/en.json";

type Project = (typeof enData)["projects"][number];

const ProjectsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-16 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-primary)]">
        {t.sections.projects}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {t.projects.map((project: Project) => (
          <div
            key={project.id}
            className="bg-[var(--color-bg-secondary)] p-6 rounded-lg shadow-md border border-[var(--color-border)] hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2 text-[var(--color-text)]">
              {project.title}
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="flex items-center text-xs bg-[var(--color-primary)] text-[var(--color-bg)] px-2 py-1 rounded space-x-2"
                >
                  <TechIcon name={tech} className="text-[var(--color-bg)]" />
                  <span className="ml-1">{tech}</span>
                </span>
              ))}
            </div>
            <div className="flex space-x-4">
              <a
                href={project.link}
                className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
              >
                View
              </a>
              <a
                href={project.github}
                className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
