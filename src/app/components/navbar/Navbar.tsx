"use client";
import React from 'react';
import { useNavbarViewModel } from './useNavbarViewModel';
import DesktopNavbar from "./desktop/DesktopNavbar";
import MobileNavbar from "./mobile/MobileNavbar";
import Link from "next/link";
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const { isMobile, theme, toggleTheme, language, toggleLanguage } = useNavbarViewModel();

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
