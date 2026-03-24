"use client";
import { useSolarSystemViewModel } from "./useSolarSystemViewModel";

interface SolarSystemProps {
  hovered: boolean;
}

const SolarSystem = ({ hovered }: SolarSystemProps) => {
  const { canvasRef } = useSolarSystemViewModel(hovered);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
};

export default SolarSystem;
