"use client";
import { useRef, useCallback } from "react";
import { Nullable } from "@/app/utils";
export interface MagneticButtonViewModel {
  buttonRef: React.RefObject<Nullable<HTMLAnchorElement>>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export const useMagneticButtonViewModel = (): MagneticButtonViewModel => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const event = new CustomEvent("buttonAttraction", {
      detail: { x: centerX, y: centerY, active: true },
    });
    window.dispatchEvent(event);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const event = new CustomEvent("buttonAttraction", {
      detail: { x: 0, y: 0, active: false },
    });
    window.dispatchEvent(event);
  }, []);

  return { buttonRef, handleMouseEnter, handleMouseLeave };
};

export default useMagneticButtonViewModel;
