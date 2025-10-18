"use client";
import React from "react";
import { TechIcon } from "@/app/components/";
import { useSkillsOrbitViewModel, Skill } from "./useSkillsOrbitViewModel";

interface SkillsOrbitProps {
  skills: Skill[];
}

const SkillsOrbit: React.FC<SkillsOrbitProps> = ({ skills }) => {
  const { orbits, displayedSkill, isHovered, onEnter, onLeave } = useSkillsOrbitViewModel(skills);

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-[600px] sm:h-[750px] overflow-hidden text-black dark:text-white">
      <div className="relative w-[90vw] max-w-[500px] aspect-square flex items-center justify-center">
        <div className="absolute z-30 flex flex-col items-center justify-center transition-all duration-700">
          <div className="p-5 rounded-full border border-gray-400 dark:border-gray-600 bg-white/5 dark:bg-black/20 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-transform duration-500">
            <TechIcon
              name={displayedSkill.name}
              size={48}
              className="text-black dark:text-white transition-transform duration-500"
            />
          </div>
          <p className="text-sm mt-2 font-semibold">{displayedSkill.name}</p>
        </div>

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
                  className={`absolute pointer-events-auto cursor-pointer text-gray-800 dark:text-gray-200 transition-colors duration-300 ${
                    hovered ? "text-black dark:text-white z-50" : "opacity-90"
                  }`}
                  title={s.name}
                >
                  <TechIcon name={s.name} size={26} />
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
