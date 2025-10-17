"use client";
import { useRef, useCallback } from "react";
import { useCheckDeviceWidth } from "@/app/utils";
import { Nullable } from "@/app/utils";
export interface MagneticButtonViewModel {
  buttonRef: React.RefObject<Nullable<HTMLAnchorElement>>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export const useMagneticButtonViewModel = (): MagneticButtonViewModel => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const { isMobile } = useCheckDeviceWidth();
  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const event = new CustomEvent("buttonAttraction", {
      detail: { x: centerX, y: centerY, active: true },
    });
    window.dispatchEvent(event);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    const event = new CustomEvent("buttonAttraction", {
      detail: { x: 0, y: 0, active: false },
    });
    window.dispatchEvent(event);
  }, [isMobile]);

  return { buttonRef, handleMouseEnter, handleMouseLeave };
};

export default useMagneticButtonViewModel;
