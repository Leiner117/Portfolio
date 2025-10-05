"use client";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const DesktopNavbar = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <nav className="flex items-center space-x-8">
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
      <div className="flex items-center space-x-2">
        <button
          className="p-2 rounded-full bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors"
          aria-label="Toggle theme"
        >
          🌓
        </button>
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-full bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors font-semibold"
          aria-label="Change language"
        >
          {language.toUpperCase()}
        </button>
      </div>
    </nav>
  );
};

export default DesktopNavbar;