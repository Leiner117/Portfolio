"use client"

import type React from "react"

// ...existing code...

interface MagneticButtonProps {
  href: string
  children: React.ReactNode
  variant?: "primary" | "secondary"
}

import useMagneticButtonViewModel from "./useMagneticButtonViewModel";

export const MagneticButton = ({ href, children, variant = "primary" }: MagneticButtonProps) => {
  const { buttonRef, handleMouseEnter, handleMouseLeave } = useMagneticButtonViewModel();

  const baseClasses = "px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:text-[var(--color-primary)] transition-colors"
  const variantClasses =
    variant === "primary"
      ? "bg-white text-black hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
      : "bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50"

  return (
    <a
      ref={buttonRef}
      href={href}
      className={`group ${baseClasses} ${variantClasses}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {variant === "primary" && (
        <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
      )}
    </a>
  )
}
