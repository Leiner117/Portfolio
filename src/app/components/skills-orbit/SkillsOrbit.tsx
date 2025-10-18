"use client";
import React from "react";
import { TechIcon } from "@/app/components/";
import { useSkillsOrbitViewModel, Skill } from "./useSkillsOrbitViewModel";

interface SkillsOrbitProps {
  skills: Skill[];
}

const SkillsOrbit: React.FC<SkillsOrbitProps> = ({ skills }) => {
  const { orbits, displayedSkill, isHovered, onEnter, onLeave } =
    useSkillsOrbitViewModel(skills);

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-[500px] sm:h-[600px] overflow-hidden text-black dark:text-white">
      <div className="relative w-[90vw] max-w-[500px] aspect-square flex items-center justify-center">
        {/* Ícono central */}
        <div className="absolute z-30 flex flex-col items-center justify-center transition-all duration-700">
          <div
            className="p-5 rounded-full border border-gray-400 dark:border-gray-600 transition-transform duration-500"
            style={{
              background: "var(--orbit-center-bg)",
              boxShadow: "0 0 20px var(--orbit-center-shadow)",
            }}
          >
            <TechIcon
              name={displayedSkill.name}
              size={48}
              className="text-black dark:text-white transition-transform duration-500"
            />
          </div>
          <p
            className="text-sm mt-2 font-semibold transition-colors duration-500"
            style={{ color: "var(--orbit-text-color)" }}
          >
            {displayedSkill.name}
          </p>
        </div>

        {/* Órbitas */}
        {orbits.map((orbit, orbitIndex) => (
          <div
            key={orbitIndex}
            style={{ width: orbit.radius * 2, height: orbit.radius * 2 }}
            className={`absolute ${orbit.anim} rounded-full pointer-events-none`}
          >
            {orbit.group.map((s: Skill, i: number) => {
              const angle = (i / orbit.group.length) * 2 * Math.PI;
              const x = Math.cos(angle) * orbit.radius;
              const y = Math.sin(angle) * orbit.radius;
              const hovered = isHovered(s.id);

              return (
                <div
                  key={`${s.id}-${orbitIndex}-${i}`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    top: "50%",
                    left: "50%",
                    animationPlayState: hovered ? "paused" : "running",
                  }}
                  onMouseEnter={() => onEnter(s)}
                  onMouseLeave={onLeave}
                  className={`absolute pointer-events-auto cursor-pointer transition-colors duration-300 ${
                    hovered ? "z-50 scale-105" : "opacity-90"
                  }`}
                  title={s.name}
                >
                  <TechIcon
                    name={s.name}
                    size={26}
                    className="text-black dark:text-white transition-colors duration-300"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsOrbit;
