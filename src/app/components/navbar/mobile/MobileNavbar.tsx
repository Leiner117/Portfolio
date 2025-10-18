"use client";
import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import List from "@/app/components/list/List";
import { useMobileNavbarViewModel } from "./useMobileNavbarViewModel";

const MobileNavbar = ({ onToggleTheme, theme, isScrolled }: { onToggleTheme?: () => void; theme?: 'light' | 'dark'; isScrolled?: boolean }) => {
  const { navigationListItems, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, language, toggleLanguage } = useMobileNavbarViewModel();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const renderNavItem = (data: { id: string; label: string }) => (
    <a
      href={`#${data.id}`}
      className="block py-3 hover:text-[var(--color-primary)] transition-colors text-left"
      onClick={closeMobileMenu}
      style={{ color: !isScrolled ? '#FFFFFF' : undefined }}
    >
      {data.label}
    </a>
  );

  return (
    <nav className="relative w-full">
      <div className="flex items-center justify-between">
          <div className="flex items-center">
          <span className="font-bold mr-3" style={{ color: !isScrolled ? '#FFFFFF' : undefined }}>Leiner Alvarado</span>
          <button 
            onClick={() => onToggleTheme && onToggleTheme()}
            className="mr-3 p-2 rounded-full transition-colors flex items-center justify-center" 
            aria-label="Toggle theme"
            style={{ 
              color: !isScrolled ? '#FFFFFF' : undefined,
              backgroundColor: 'transparent'
            }}
          >
            {mounted ? (theme === 'dark' ? <FaSun /> : <FaMoon />) : <span style={{ display: 'inline-block', width: '1em', height: '1em' }} />}
          </button>
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-full transition-colors font-semibold text-sm" 
            aria-label="Change language"
            style={{ 
              color: !isScrolled ? '#FFFFFF' : undefined,
              backgroundColor: 'transparent'
            }}
          >
            {language.toUpperCase()}
          </button>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md hover:text-[var(--color-primary)] hover:bg-[var(--color-border)] transition-colors focus:outline-none"
          style={{ color: !isScrolled ? '#FFFFFF' : undefined }}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
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
          isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ top: '64px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <List<{ id: string; label: string }>
            items={navigationListItems}
            listClassName="space-y-1 py-2"
            containerClassName=""
            itemClassName=""
            renderItem={renderNavItem}
          />
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;