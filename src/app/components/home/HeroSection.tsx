"use client";
import React from "react";
import {
  GalaxyBackground,
  MagneticButton,
  SocialLinks,
} from "@/app/components/";
import { ScrollIndicator } from "@/app/components/scroll-indicator/ScrollIndicator";
import useHeroViewModel from "./useHeroViewModel";

const HeroSection = () => {
  const { nameDisplay, titleDisplay, showControls, viewProjectsLabel, contactLabel } = useHeroViewModel();

  return (
    <section className="relative w-screen h-screen text-center overflow-hidden">
      <GalaxyBackground />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-6">
          <div className="-translate-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              {nameDisplay}
            </h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto">
              {titleDisplay}
            </p>
          </div>
          <div
            className={`transition-all duration-500 ease-out transform ${
              showControls
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            {showControls && (
              <>
                <div className="flex gap-4">
                  <MagneticButton href="#projects" variant="primary">
                    {viewProjectsLabel}
                  </MagneticButton>
                  <MagneticButton href="#contact" variant="secondary">
                    {contactLabel}
                  </MagneticButton>
                </div>
                <div className="mt-5">
                  <SocialLinks />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={`transition-opacity duration-500 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default HeroSection;
