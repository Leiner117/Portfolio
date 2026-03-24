"use client";
import { useRef, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

export interface ContactSectionViewModel {
  sectionRef:  React.RefObject<HTMLElement | null>;
  beamTarget:  { x: number; y: number } | null;
  lockedId:    string | null;
  email:       string;
  linkedin:    string;
  github:      string;
  ghHandle:    string;
  liHandle:    string;
  handleHover: (id: string, rect: DOMRect) => void;
  handleLeave: () => void;
}

export const useContactSectionViewModel = (): ContactSectionViewModel => {
  const { t } = useLanguage();

  const sectionRef = useRef<HTMLElement | null>(null);
  const [beamTarget, setBeamTarget] = useState<{ x: number; y: number } | null>(null);
  const [lockedId,   setLockedId]   = useState<string | null>(null);

  const email    = t.contact.email    as string;
  const linkedin = t.contact.linkedin as string;
  const github   = t.contact.github   as string;

  const ghHandle = github.replace(/.*github\.com\//, "@");
  const liHandle = linkedin.replace(/.*linkedin\.com\/in\//, "").replace(/\/$/, "");

  const handleHover = (id: string, rect: DOMRect) => {
    const sr = sectionRef.current?.getBoundingClientRect();
    if (!sr) return;
    setLockedId(id);
    setBeamTarget({
      x: rect.left + rect.width  / 2 - sr.left,
      y: rect.top  + rect.height / 2 - sr.top,
    });
  };

  const handleLeave = () => {
    setLockedId(null);
    setBeamTarget(null);
  };

  return {
    sectionRef,
    beamTarget,
    lockedId,
    email,
    linkedin,
    github,
    ghHandle,
    liHandle,
    handleHover,
    handleLeave,
  };
};
