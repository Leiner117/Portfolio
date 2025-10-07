"use client";
import { useCallback } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { HOME_SECTIONS } from "@/app/utils/constants";

export type NavbarItem = {
  id: string;
  label: string;
};

export type NavbarViewModel = {
  navItems: NavbarItem[];
  language: string;
  toggleLanguage: () => void;
};

export const useNavbarViewModel = (): NavbarViewModel => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "es" : "en");
  }, [language, setLanguage]);

  const navItems: NavbarItem[] = [
    { id: HOME_SECTIONS.projects, label: t.navbar.projects },
    { id: HOME_SECTIONS.experience, label: t.navbar.experience },
    { id: HOME_SECTIONS.skills, label: t.navbar.skills },
    { id: HOME_SECTIONS.contact, label: t.navbar.contact },
  ];

  return { navItems, language, toggleLanguage };
};

export default useNavbarViewModel;
