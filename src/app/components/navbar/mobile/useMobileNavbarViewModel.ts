"use client";
import { useCallback, useMemo, useState } from "react";
import { useNavbarViewModel, NavbarItem } from "../desktop/useDesktopNavbarViewModel";


export type MobileNavbarViewModel = {
  navigationListItems: { id: string; data: NavbarItem }[];
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  language: string;
  toggleLanguage: () => void;
};

export const useMobileNavbarViewModel = (): MobileNavbarViewModel => {
  const { navItems, language, toggleLanguage } = useNavbarViewModel();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((previousState) => !previousState), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const navigationListItems = useMemo(
    () => navItems.map((navItem) => ({ id: navItem.id, data: navItem })),
    [navItems]
  );

  return { navigationListItems, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, language, toggleLanguage };
};

export default useMobileNavbarViewModel;
