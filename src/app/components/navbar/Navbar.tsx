"use client";
import React from 'react';
import { useCheckDeviceWidth } from "@/app/utils/index";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";

const Navbar = () => {
  const { isMobile } = useCheckDeviceWidth();

  return (
    <nav className="w-full bg-[var(--color-bg-secondary)] text-[var(--color-text)] border-b border-[var(--color-border)] shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 font-bold text-[var(--color-primary)]">
            <Link href="/" className="hover:text-[var(--color-secondary)] transition-colors">
              Leiner Alvarado Rodriguez
            </Link>
          </div>
          {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
