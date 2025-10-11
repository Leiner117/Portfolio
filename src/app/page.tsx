"use client";
import useHomeViewModel from "./components/home/useHomeViewModel";
import HeroSection from "./components/home/HeroSection";
import ExperienceSection from "./components/home/ExperienceSection";
// import ProjectsSection from "./components/home/ProjectsSection"; // temporarily disabled
import SkillsSection from "./components/home/SkillsSection";
import ContactSection from "./components/home/ContactSection";

const Home = () => {
  useHomeViewModel();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
  <HeroSection />
  <ExperienceSection />
  {/* <ProjectsSection /> */}
  <SkillsSection />
  <ContactSection />
    </div>
  );
};

export default Home;
