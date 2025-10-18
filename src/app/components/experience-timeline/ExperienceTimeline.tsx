"use client";

import React from "react";
import useExperienceTimelineViewModel from "./useExperienceTimelineViewModel";

export const ExperienceTimeline: React.FC = () => {
  const { experiences, visibleItems, lineProgress, itemRefs, timelineRef } =
    useExperienceTimelineViewModel();

  return (
    <div ref={timelineRef} className="relative max-w-5xl mx-auto">
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.06), transparent)",
          }}
        />
      </div>

      <div
        className="absolute left-6 md:left-1/2 top-0 w-px transition-all duration-300 ease-out"
        style={{ height: `${lineProgress * 100}%` }}
      >
        <div className="absolute inset-0" style={{ background: "var(--timeline-color)" }} />
        <div
          className="absolute inset-0"
          style={{ background: "var(--timeline-color)", filter: "blur(6px)" }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{ background: "var(--timeline-color)", boxShadow: "0 0 20px rgba(0,0,0,0.2)" }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: "var(--timeline-color)", opacity: 0.12 }}
          />
        </div>
      </div>

      <div className="space-y-16">
        {experiences.map((exp, index) => {
          const isVisible = visibleItems.includes(index);
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              data-index={index}
              className={
                "relative flex items-center " +
                (isLeft ? "md:flex-row" : "md:flex-row-reverse") +
                " flex-col"
              }
            >
              <div
                className={
                  "hidden md:block absolute top-1/2 " +
                  (isLeft ? "right-1/2 mr-6" : "left-1/2 ml-6") +
                  " w-16 h-px overflow-hidden"
                }
              >
                <div
                  className={"h-full transition-all duration-700 delay-300 " + (isVisible ? "w-full" : "w-0")}
                  style={{
                    background: isLeft
                      ? 'linear-gradient(to right, transparent, var(--timeline-color))'
                      : 'linear-gradient(to right, var(--timeline-color), transparent)',
                  }}
                />
              </div>

              <div className="absolute left-6 md:left-1/2 -ml-3 md:-ml-4 z-10">
                <div
                  className={
                    "relative w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-700 " +
                    (isVisible ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-180")
                  }
                  style={{ background: 'var(--timeline-color)', boxShadow: '0 0 12px rgba(0,0,0,0.08)' }}
                >
                  <div className="absolute inset-0 rounded-full" style={{ background: 'var(--timeline-color)', opacity: 0.16 }} />
                </div>
              </div>

              <div
                className={
                  "w-full md:w-[calc(50%-4rem)] ml-20 md:ml-0 " +
                  (isLeft ? "md:pr-16" : "md:pl-16") +
                  " transition-all duration-700 delay-200 " +
                  (isVisible
                    ? "opacity-100 translate-y-0 translate-x-0"
                    : "opacity-0 translate-y-8 " + (isLeft ? "md:-translate-x-8" : "md:translate-x-8"))
                }
              >
                <div className="relative group perspective-1000">
                  <div className="relative experience-card backdrop-blur-md border rounded-xl p-6 transition-all duration-200 shadow-xl group-hover:scale-[1.02] group-hover:shadow-2xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 border rounded-full text-sm mb-4 font-medium" style={{ color: 'inherit', background: 'transparent', borderColor: 'transparent', transition: 'none' }}>
                      <div className="w-2 h-2 rounded-full timeline-marker" />
                      {exp.period}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{exp.position}</h3>
                    <p className="mb-4 font-semibold text-lg">{exp.company}</p>
                    <p className="leading-relaxed mb-6">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={
                            "px-3 py-1.5 rounded-lg text-sm cursor-default " +
                            (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")
                          }
                          style={{
                            transitionDelay: `${700 + techIndex * 100}ms`,
                            color: 'inherit',
                            background: 'transparent',
                            borderColor: 'transparent',
                            transition: 'transform 300ms, opacity 300ms'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
