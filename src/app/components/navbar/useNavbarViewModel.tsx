"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useCheckDeviceWidth } from "@/app/utils/index";
import { useLanguage } from "@/app/context/LanguageContext";
import { THEME_STORAGE_KEY, DATA_THEME_ATTRIBUTE, DEFAULT_THEME, DARK_THEME, ThemeMode } from "@/app/utils/constants";

export type NavbarViewModel = {
  isMobile: boolean;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  language: string;
  toggleLanguage: () => void;
  mounted: boolean;
  isScrolled: boolean;
  navRef: React.RefObject<HTMLElement | null>;
};

export const useNavbarViewModel = (): NavbarViewModel => {
  const { isMobile } = useCheckDeviceWidth();
  const isMobileFlag = !!isMobile;
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    return (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode) || DEFAULT_THEME;
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === DARK_THEME) document.documentElement.setAttribute(DATA_THEME_ATTRIBUTE, DARK_THEME);
      else document.documentElement.removeAttribute(DATA_THEME_ATTRIBUTE);
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((theme) => (theme === DEFAULT_THEME ? DARK_THEME : DEFAULT_THEME)), []);
  const toggleLanguage = useCallback(() => setLanguage(language === "en" ? "es" : "en"), [language, setLanguage]);

  return { isMobile: isMobileFlag, theme, setTheme, toggleTheme, language, toggleLanguage, mounted, isScrolled, navRef };
};

export default useNavbarViewModel;
