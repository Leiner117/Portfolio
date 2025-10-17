"use client";
import React from 'react';
import { useNavbarViewModel } from './useNavbarViewModel';
import DesktopNavbar from "./desktop/DesktopNavbar";
import MobileNavbar from "./mobile/MobileNavbar";
import Link from "next/link";
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const { isMobile, theme, toggleTheme, language, toggleLanguage, mounted, isScrolled, navRef } = useNavbarViewModel();

  return (
  <nav ref={navRef} className={`w-full text-[var(--color-text)] border-b border-[var(--color-border)] fixed top-0 z-50 transition-colors ${isScrolled ? 'bg-[var(--color-bg-secondary)] shadow-sm' : 'bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16">
          {!isMobile && (
            <div className="flex-1 items-center">
              <Link href="/" className="font-bold hover:text-[var(--color-text-secondary)] transition-colors" style={{ color: !isScrolled ? '#FFFFFF' : undefined }}>
                Leiner Alvarado Rodriguez
              </Link>
            </div>
          )}

          <div className="absolute left-1/2 transform -translate-x-1/2">
            {!isMobile && <DesktopNavbar isScrolled={isScrolled} />}
          </div>

          <div className="flex flex-1 justify-end items-center space-x-2">
            {isMobile ? (
              <MobileNavbar onToggleTheme={toggleTheme} theme={theme} isScrolled={isScrolled} />
            ) : (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleTheme} 
                  className="p-2 rounded-full transition-colors" 
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
