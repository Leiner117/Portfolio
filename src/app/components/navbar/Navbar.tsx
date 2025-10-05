"use client";
import React, { useEffect, useState } from 'react';
import { useCheckDeviceWidth } from "@/app/utils/index";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import { FaMoon, FaSun } from 'react-icons/fa';
import { useLanguage } from '@/app/context/LanguageContext';

const Navbar = () => {
  const { isMobile } = useCheckDeviceWidth();
  const { language, setLanguage } = useLanguage();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <nav className="w-full bg-[var(--color-bg-secondary)] text-[var(--color-text)] border-b border-[var(--color-border)] shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16">
          {!isMobile && (
            <div className="flex-1 items-center">
              <Link href="/" className="font-bold text-[var(--color-text)] hover:text-[var(--color-text-secondary)] transition-colors">
                Leiner Alvarado Rodriguez
              </Link>
            </div>
          )}

          <div className="absolute left-1/2 transform -translate-x-1/2">
            {!isMobile && <DesktopNavbar />}
          </div>

          <div className="flex flex-1 justify-end items-center space-x-2">
            {isMobile ? (
              <MobileNavbar onToggleTheme={toggleTheme} theme={theme} />
            ) : (
              <div className="flex items-center space-x-2">
                <button onClick={toggleTheme} className="p-2 rounded-full bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors" aria-label="Toggle theme">
                  {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
                <button onClick={toggleLanguage} className="p-2 rounded-full bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors font-semibold text-sm" aria-label="Change language">
                  {language.toUpperCase()}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
