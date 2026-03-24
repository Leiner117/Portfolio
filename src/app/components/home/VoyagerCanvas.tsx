"use client";
import { useVoyagerCanvasViewModel, Pt } from "./useVoyagerCanvasViewModel";

interface Props { targetPt: Pt | null; }

const VoyagerCanvas = ({ targetPt }: Props) => {
  const { canvasRef } = useVoyagerCanvasViewModel(targetPt);
  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
  );
};

export default VoyagerCanvas;
