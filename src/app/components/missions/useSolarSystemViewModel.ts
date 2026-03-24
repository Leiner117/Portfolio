"use client";
import { useRef, useEffect } from "react";

const PLANETS = [
  { orbitR: 80,  size: 4.5, speed: 0.55, angle: 0.5, color: "rgba(103,232,249,0.9)"  },
  { orbitR: 130, size: 6.5, speed: 0.32, angle: 2.1, color: "rgba(252,165,165,0.9)"  },
  { orbitR: 185, size: 5.5, speed: 0.18, angle: 4.3, color: "rgba(216,180,254,0.9)"  },
  { orbitR: 245, size: 8.5, speed: 0.09, angle: 1.7, color: "rgba(253,224,71,0.85)"  },
];

export interface SolarSystemViewModel {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const useSolarSystemViewModel = (hovered: boolean): SolarSystemViewModel => {
  const canvasRef  = useRef<HTMLCanvasElement | null>(null);
  const hoveredRef = useRef(hovered);
  const stateRef   = useRef({
    planets:       PLANETS.map(p => ({ ...p })),
    hoverProgress: 0,
    lastTime:      0,
  });

  useEffect(() => { hoveredRef.current = hovered; }, [hovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now: number) => {
      const s  = stateRef.current;
      const dt = Math.min((now - s.lastTime) / 1000, 0.05);
      s.lastTime = now;

      const { width: W, height: H } = canvas;
      const cx = W / 2;
      const cy = H / 2;

      const target = hoveredRef.current ? 1 : 0;
      s.hoverProgress += (target - s.hoverProgress) * Math.min(dt * 2.8, 1);
      const t = s.hoverProgress;

      s.planets.forEach(p => {
        if (t < 0.98) p.angle += p.speed * dt * (1 - t * 0.95);
      });

      ctx.clearRect(0, 0, W, H);

      // Orbital rings
      s.planets.forEach(p => {
        ctx.beginPath();
        ctx.arc(cx, cy, p.orbitR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(160,160,160,${0.07 - t * 0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Alignment line
      if (t > 0.02) {
        const maxR = s.planets[s.planets.length - 1].orbitR + 20;
        ctx.beginPath();
        ctx.moveTo(cx - maxR, cy);
        ctx.lineTo(cx + maxR, cy);
        ctx.strokeStyle = `rgba(212,175,55,${t * 0.18})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Sun
      const sunGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
      sunGlow.addColorStop(0, "rgba(212,175,55,0.9)");
      sunGlow.addColorStop(0.4, "rgba(212,175,55,0.35)");
      sunGlow.addColorStop(1, "rgba(212,175,55,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 9, 0, Math.PI * 2);
      ctx.fillStyle = "#D4AF37";
      ctx.fill();

      // Planets
      s.planets.forEach(p => {
        const ox = cx + Math.cos(p.angle) * p.orbitR;
        const oy = cy + Math.sin(p.angle) * p.orbitR;
        const ax = cx + p.orbitR;
        const ay = cy;
        const px = ox + (ax - ox) * t;
        const py = oy + (ay - oy) * t;

        const glow = ctx.createRadialGradient(px, py, 0, px, py, p.size * 3);
        glow.addColorStop(0, p.color.replace("0.9", "0.45").replace("0.85", "0.4"));
        glow.addColorStop(1, p.color.replace(/[\d.]+\)$/, "0)"));
        ctx.beginPath();
        ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, []);

  return { canvasRef };
};
