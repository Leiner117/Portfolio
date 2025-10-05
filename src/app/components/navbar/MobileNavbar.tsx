"use client";
import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { FaMoon, FaSun } from 'react-icons/fa';

const MobileNavbar = ({ onToggleTheme, theme }: { onToggleTheme?: () => void; theme?: 'light' | 'dark' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <nav className="relative w-full">
      <div className="flex items-center justify-between">
          <div className="flex items-center">
          <span className="font-bold text-[var(--color-text)] mr-3">Leiner Alvarado</span>
          <button 
            onClick={() => onToggleTheme && onToggleTheme()}
            className="mr-3 p-2 rounded-full bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors flex items-center justify-center" 
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-full bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors font-semibold text-sm" 
            aria-label="Change language"
          >
            {language.toUpperCase()}
          </button>
        </div>
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-border)] transition-colors focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      <div
        className={`fixed left-0 right-0 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] shadow-md w-screen transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ top: '64px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="space-y-1 py-2">
            <li>
              <a
                href="#projects"
                className="block py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.navbar.projects}
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className="block py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.navbar.experience}
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="block py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.navbar.skills}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.navbar.contact}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;