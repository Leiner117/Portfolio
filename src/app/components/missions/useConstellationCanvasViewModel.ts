"use client";
import { useRef, useEffect } from "react";

interface StarPoint {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  litProgress: number;
  isWaypoint: boolean;
  waypointT: number;
}

interface Pt { x: number; y: number; }

interface Route {
  points: Pt[];
  segLengths: number[];
  totalLength: number;
  waypointStarIndices: number[];
}

export interface TargetRect {
  x: number; y: number;
  width: number; height: number;
}

export interface ConstellationCanvasViewModel {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

// ── Geometry helpers ──────────────────────────────────────────────────────────

const dist2 = (a: Pt, b: Pt) => Math.hypot(b.x - a.x, b.y - a.y);

const projectOntoLine = (px: number, py: number, ax: number, ay: number, bx: number, by: number) => {
  const dx = bx - ax, dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return 0;
  return ((px - ax) * dx + (py - ay) * dy) / lenSq;
};

const distToLine = (px: number, py: number, ax: number, ay: number, bx: number, by: number) => {
  const dx = bx - ax, dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
};

const rectEquals = (a: TargetRect | null, b: TargetRect | null) => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
};

const buildRoute = (
  stars: StarPoint[],
  from: Pt,
  to: Pt,
): { points: Pt[]; starIndices: number[] } => {
  const candidates: { index: number; proj: number }[] = [];

  stars.forEach((star, index) => {
    const proj = projectOntoLine(star.x, star.y, from.x, from.y, to.x, to.y);
    if (proj < 0.12 || proj > 0.88) return;
    const d = distToLine(star.x, star.y, from.x, from.y, to.x, to.y);
    if (d > 90) return;
    candidates.push({ index, proj });
  });

  candidates.sort((a, b) => a.proj - b.proj);

  const selected: typeof candidates = [];
  for (const c of candidates) {
    if (selected.length === 0 || c.proj - selected[selected.length - 1].proj > 0.2) {
      selected.push(c);
    }
    if (selected.length >= 3) break;
  }

  if (selected.length > 0) {
    return {
      points: [from, ...selected.map(c => ({ x: stars[c.index].x, y: stars[c.index].y })), to],
      starIndices: selected.map(c => c.index),
    };
  }

  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const len = dist2(from, to);
  const perpX = -(to.y - from.y) / len;
  const perpY =  (to.x - from.x) / len;
  const offset = (Math.random() - 0.5) * 80;
  return {
    points: [from, { x: mx + perpX * offset, y: my + perpY * offset }, to],
    starIndices: [],
  };
}

// ── ViewModel ─────────────────────────────────────────────────────────────────

export const useConstellationCanvasViewModel = (targetRect: TargetRect | null): ConstellationCanvasViewModel => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRef = useRef(targetRect);
  const stateRef  = useRef<{
    stars: StarPoint[];
    progress: number;
    lastTime: number;
    routes: Route[] | null;
    prevTarget: TargetRect | null;
  }>({ stars: [], progress: 0, lastTime: 0, routes: null, prevTarget: null });

  useEffect(() => { targetRef.current = targetRect; }, [targetRect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;

    const initStars = () => {
      const W = canvas.width, H = canvas.height;
      stateRef.current.stars = Array.from({ length: 110 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: 0.7 + Math.random() * 1.8,
        baseOpacity: 0.12 + Math.random() * 0.4,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.3 + Math.random() * 1.4,
        litProgress: 0,
        isWaypoint: false,
        waypointT: 0,
      }));
      stateRef.current.routes = null;
      stateRef.current.prevTarget = null;
    };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStars();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now: number) => {
      const s  = stateRef.current;
      const dt = Math.min((now - s.lastTime) / 1000, 0.05);
      s.lastTime = now;
      const target = targetRef.current;
      const { width: W, height: H } = canvas;

      if (!rectEquals(target, s.prevTarget)) {
        s.prevTarget = target;
        s.stars.forEach(star => { star.isWaypoint = false; star.waypointT = 0; });

        if (target) {
          const cardCorners: Pt[] = [
            { x: target.x,                y: target.y },
            { x: target.x + target.width, y: target.y },
            { x: target.x,                y: target.y + target.height },
            { x: target.x + target.width, y: target.y + target.height },
          ];
          const canvasCorners: Pt[] = [
            { x: 0, y: 0 }, { x: W, y: 0 },
            { x: 0, y: H }, { x: W, y: H },
          ];

          s.routes = canvasCorners.map((corner, i) => {
            const { points, starIndices } = buildRoute(s.stars, corner, cardCorners[i]);
            const segLengths = points.slice(1).map((p, j) => dist2(points[j], p));
            const total = segLengths.reduce((a, b) => a + b, 0);

            let acc = 0;
            starIndices.forEach((si, wi) => {
              acc += segLengths[wi];
              s.stars[si].isWaypoint = true;
              s.stars[si].waypointT  = Math.min(acc / total, 1);
            });

            return { points, segLengths, totalLength: total, waypointStarIndices: starIndices };
          });
        } else {
          s.routes = null;
        }

        s.progress = 0;
      }

      const targetP = target ? 1 : 0;
      s.progress += (targetP - s.progress) * Math.min(dt * 2.2, 1);
      const t = s.progress;

      ctx.clearRect(0, 0, W, H);

      s.stars.forEach(star => {
        const shouldLit = star.isWaypoint && t >= star.waypointT - 0.05;
        star.litProgress += ((shouldLit ? 1 : 0) - star.litProgress) * Math.min(dt * 5, 1);
      });

      if (s.routes && t > 0.01) {
        s.routes.forEach(route => {
          const targetDist = t * route.totalLength;
          let acc = 0;

          const partial: Pt[] = [route.points[0]];
          for (let i = 0; i < route.segLengths.length; i++) {
            if (acc + route.segLengths[i] <= targetDist) {
              partial.push(route.points[i + 1]);
              acc += route.segLengths[i];
            } else {
              const localT = (targetDist - acc) / route.segLengths[i];
              partial.push({
                x: route.points[i].x + (route.points[i + 1].x - route.points[i].x) * localT,
                y: route.points[i].y + (route.points[i + 1].y - route.points[i].y) * localT,
              });
              break;
            }
          }

          const tip   = partial[partial.length - 1];
          const start = partial[0];

          const grad = ctx.createLinearGradient(start.x, start.y, tip.x, tip.y);
          grad.addColorStop(0,   `rgba(212,175,55,0)`);
          grad.addColorStop(0.3, `rgba(212,175,55,${t * 0.15})`);
          grad.addColorStop(1,   `rgba(212,175,55,${t * 0.55})`);

          ctx.beginPath();
          ctx.moveTo(partial[0].x, partial[0].y);
          for (let i = 1; i < partial.length; i++) ctx.lineTo(partial[i].x, partial[i].y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.9;
          ctx.setLineDash([4, 7]);
          ctx.stroke();
          ctx.setLineDash([]);

          const glow = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 14);
          glow.addColorStop(0, `rgba(212,175,55,${t * 0.35})`);
          glow.addColorStop(1, `rgba(212,175,55,0)`);
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, 14, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(tip.x, tip.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212,175,55,${t * 0.95})`;
          ctx.fill();
        });
      }

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const [br, bg, bb] = isDark ? [220, 220, 220] : [40, 40, 40];

      s.stars.forEach(star => {
        const pulse = Math.sin(now * 0.001 * star.pulseSpeed + star.pulsePhase) * 0.35 + 0.65;
        const lit   = star.litProgress;
        const alpha = Math.min(1, star.baseOpacity * pulse + lit * 0.85);
        const size  = star.size + lit * 3.5;

        if (lit > 0.05) {
          const halo = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, size * 6);
          halo.addColorStop(0, `rgba(212,175,55,${lit * 0.45})`);
          halo.addColorStop(1, `rgba(212,175,55,0)`);
          ctx.beginPath();
          ctx.arc(star.x, star.y, size * 6, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();
        }

        const r = Math.round(br + (212 - br) * lit);
        const g = Math.round(bg + (175 - bg) * lit);
        const b = Math.round(bb + ( 55 - bb) * lit);
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, []);

  return { canvasRef };
};
