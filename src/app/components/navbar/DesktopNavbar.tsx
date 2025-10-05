"use client";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const DesktopNavbar = () => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center space-x-8">
      <ul className="flex space-x-6">
        <li>
          <a
            href="#projects"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            {t.navbar.projects}
          </a>
        </li>
        <li>
          <a
            href="#experience"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            {t.navbar.experience}
          </a>
        </li>
        <li>
          <a
            href="#skills"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            {t.navbar.skills}
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            {t.navbar.contact}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DesktopNavbar;