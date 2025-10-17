"use client";

import { useGalaxyBackgroundViewModel } from "./useGalaxyBackgroundViewModel";

export const GalaxyBackground = () => {
  const { canvasRef } = useGalaxyBackgroundViewModel()

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none", zIndex: 0 }}
    />
  )
}
