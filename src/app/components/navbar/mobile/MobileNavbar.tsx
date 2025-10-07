"use client";
import { FaMoon, FaSun } from 'react-icons/fa';
import List from "@/app/components/list/List";
import { useMobileNavbarViewModel } from "./useMobileNavbarViewModel";

const MobileNavbar = ({ onToggleTheme, theme }: { onToggleTheme?: () => void; theme?: 'light' | 'dark' }) => {
  const { navigationListItems, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, language, toggleLanguage } = useMobileNavbarViewModel();

  const renderNavItem = (data: { id: string; label: string }) => (
    <a
      href={`#${data.id}`}
      className="block py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors text-left"
      onClick={closeMobileMenu}
    >
      {data.label}
    </a>
  );

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
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-border)] transition-colors focus:outline-none"
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