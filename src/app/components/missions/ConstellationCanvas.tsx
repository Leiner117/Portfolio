"use client";
import { useConstellationCanvasViewModel } from "./useConstellationCanvasViewModel";
export type { TargetRect } from "./useConstellationCanvasViewModel";

interface Props {
  targetRect: import("./useConstellationCanvasViewModel").TargetRect | null;
}

const ConstellationCanvas = ({ targetRect }: Props) => {
  const { canvasRef } = useConstellationCanvasViewModel(targetRect);
  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
  );
};

export default ConstellationCanvas;
