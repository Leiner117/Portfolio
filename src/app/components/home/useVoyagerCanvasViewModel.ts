"use client";
import { useRef, useEffect } from "react";

export interface Pt { x: number; y: number; }

interface Ring     { x: number; y: number; r: number; alpha: number; }
interface Star     { x: number; y: number; size: number; opacity: number; phase: number; speed: number; }
interface Packet   { t: number; }
interface Thruster { x: number; y: number; vx: number; vy: number; life: number; }

export interface VoyagerCanvasViewModel {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const useVoyagerCanvasViewModel = (targetPt: Pt | null): VoyagerCanvasViewModel => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRef = useRef(targetPt);
  useEffect(() => { targetRef.current = targetPt; }, [targetPt]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;

    const state = {
      probe:           { x: -60, y: 0, angle: 0 },
      trail:           [] as Pt[],
      rings:           [] as Ring[],
      packets:         [] as Packet[],
      thrusters:       [] as Thruster[],
      stars:           [] as Star[],
      lastRingTime:    0,
      lastPacketTime:  0,
      dashOffset:      0,
      lastTime:        0,
      reticleProgress: 0,
    };

    const initStars = (W: number, H: number) => {
      state.stars = Array.from({ length: 110 }, () => ({
        x:       Math.random() * W,
        y:       Math.random() * H,
        size:    0.5 + Math.random() * 1.6,
        opacity: 0.1 + Math.random() * 0.4,
        phase:   Math.random() * Math.PI * 2,
        speed:   0.3 + Math.random() * 1.2,
      }));
    };

    const resize = () => {
      canvas.width  = canvas.offsetWidth  || canvas.parentElement?.offsetWidth  || 800;
      canvas.height = canvas.offsetHeight || canvas.parentElement?.offsetHeight || 400;
      initStars(canvas.width, canvas.height);
      state.probe.y = canvas.height * 0.38;
    };

    requestAnimationFrame(() => { resize(); });
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now: number) => {
      const dt = Math.min((now - state.lastTime) / 1000, 0.05);
      state.lastTime = now;

      const W = canvas.width, H = canvas.height;
      if (W === 0 || H === 0) { rafId = requestAnimationFrame(draw); return; }

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const gold   = "212,175,55";
      const target = targetRef.current;

      ctx.clearRect(0, 0, W, H);

      // Probe steering
      const sineBaseY    = H * 0.38 + Math.sin(state.probe.x * 0.003) * H * 0.14;
      const nominalAngle = Math.atan2((sineBaseY - state.probe.y) * 0.4, 28);
      const rawDesired   = target
        ? Math.atan2(target.y - state.probe.y, target.x - state.probe.x)
        : nominalAngle;
      const desiredAngle = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, rawDesired));

      const prevAngle = state.probe.angle;
      const turnSpeed = target ? 2.5 : 1.2;
      state.probe.angle += (desiredAngle - state.probe.angle) * Math.min(dt * turnSpeed, 1);

      const angleDelta = Math.abs(state.probe.angle - prevAngle);
      if (angleDelta > 0.015) {
        for (let i = 0; i < 3; i++) {
          state.thrusters.push({
            x:    state.probe.x,
            y:    state.probe.y,
            vx:   -Math.cos(state.probe.angle) * 35 + (Math.random() - 0.5) * 25,
            vy:   -Math.sin(state.probe.angle) * 35 + (Math.random() - 0.5) * 25,
            life: 1,
          });
        }
      }

      const speed = 28;
      state.probe.x += Math.cos(state.probe.angle) * speed * dt;
      state.probe.y += Math.sin(state.probe.angle) * speed * dt;
      state.probe.y = Math.max(H * 0.08, Math.min(H * 0.75, state.probe.y));

      if (state.probe.x > W + 80) {
        state.probe = { x: -60, y: H * 0.38, angle: 0 };
        state.trail = [];
      }

      state.trail.push({ x: state.probe.x, y: state.probe.y });
      if (state.trail.length > 100) state.trail.shift();

      if (now - state.lastRingTime > 2800) {
        state.rings.push({ x: state.probe.x, y: state.probe.y, r: 0, alpha: 0.55 });
        state.lastRingTime = now;
      }
      state.rings.forEach(r => { r.r += dt * 50; r.alpha = Math.max(0, 0.55 * (1 - r.r / 130)); });
      state.rings = state.rings.filter(r => r.alpha > 0.01);

      if (target && now - state.lastPacketTime > 500) {
        state.packets.push({ t: 0 });
        state.lastPacketTime = now;
      }
      state.packets.forEach(p => { p.t += dt * 0.75; });
      state.packets = state.packets.filter(p => p.t < 1);

      state.thrusters.forEach(th => {
        th.x   += th.vx * dt;
        th.y   += th.vy * dt;
        th.life -= dt * 3;
      });
      state.thrusters = state.thrusters.filter(th => th.life > 0);

      state.reticleProgress += ((target ? 1 : 0) - state.reticleProgress) * Math.min(dt * 4, 1);
      state.dashOffset -= dt * 50;

      // Draw stars
      state.stars.forEach(s => {
        const pulse = Math.sin(now * 0.001 * s.speed + s.phase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(210,210,210,${s.opacity * pulse})`
          : `rgba(25,25,25,${s.opacity * pulse})`;
        ctx.fill();
      });

      // Signal rings
      state.rings.forEach(r => {
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${gold},${r.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Trail
      state.trail.forEach((pt, i) => {
        const a = (i / state.trail.length) * 0.5;
        const s = 0.4 + (i / state.trail.length) * 0.9;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${gold},${a})`;
        ctx.fill();
      });

      // Thruster particles
      state.thrusters.forEach(th => {
        ctx.beginPath();
        ctx.arc(th.x, th.y, 1.2 * th.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${gold},${th.life * 0.7})`;
        ctx.fill();
      });

      const { x: px, y: py } = state.probe;

      // Beam + data packets
      if (target && state.reticleProgress > 0.01) {
        const rp = state.reticleProgress;

        const grad = ctx.createLinearGradient(px, py, target.x, target.y);
        grad.addColorStop(0,   `rgba(${gold},${rp * 0.7})`);
        grad.addColorStop(0.6, `rgba(${gold},${rp * 0.3})`);
        grad.addColorStop(1,   `rgba(${gold},${rp * 0.1})`);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 8]);
        ctx.lineDashOffset = state.dashOffset;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.lineDashOffset = 0;

        state.packets.forEach(p => {
          const bx = px + (target.x - px) * p.t;
          const by = py + (target.y - py) * p.t;
          const pa = Math.sin(p.t * Math.PI) * rp;

          const halo = ctx.createRadialGradient(bx, by, 0, bx, by, 7);
          halo.addColorStop(0, `rgba(${gold},${pa * 0.5})`);
          halo.addColorStop(1, `rgba(${gold},0)`);
          ctx.beginPath();
          ctx.arc(bx, by, 7, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(bx, by, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${gold},${pa})`;
          ctx.fill();
        });

        // Targeting reticle
        const rSize  = 22 + (1 - rp) * 14;
        const rAlpha = rp;
        const tx = target.x, ty = target.y;

        const corners = [
          { sx: -1, sy: -1 }, { sx: 1, sy: -1 },
          { sx: -1, sy:  1 }, { sx: 1, sy:  1 },
        ];
        corners.forEach(({ sx, sy }) => {
          const ox = tx + sx * rSize, oy = ty + sy * rSize;
          ctx.strokeStyle = `rgba(${gold},${rAlpha * 0.9})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(ox, oy);
          ctx.lineTo(ox - sx * 10, oy);
          ctx.moveTo(ox, oy);
          ctx.lineTo(ox, oy - sy * 10);
          ctx.stroke();
        });

        const pulse = (Math.sin(now * 0.008) * 0.5 + 0.5) * rp;
        const dotGlow = ctx.createRadialGradient(tx, ty, 0, tx, ty, 8);
        dotGlow.addColorStop(0, `rgba(${gold},${pulse * 0.5})`);
        dotGlow.addColorStop(1, `rgba(${gold},0)`);
        ctx.beginPath();
        ctx.arc(tx, ty, 8, 0, Math.PI * 2);
        ctx.fillStyle = dotGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(tx, ty, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${gold},${rp * 0.9})`;
        ctx.fill();

        if (rp > 0.7) {
          ctx.font = `${10 * rp}px monospace`;
          ctx.fillStyle = `rgba(${gold},${(rp - 0.7) / 0.3 * 0.7})`;
          ctx.textAlign = "center";
          ctx.fillText("SIGNAL LOCKED", tx, ty - rSize - 8);
          ctx.textAlign = "start";
        }
      }

      // Probe glow
      const glow = ctx.createRadialGradient(px, py, 0, px, py, 26);
      glow.addColorStop(0, `rgba(${gold},0.35)`);
      glow.addColorStop(1, `rgba(${gold},0)`);
      ctx.beginPath();
      ctx.arc(px, py, 26, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Draw probe
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(state.probe.angle);

      ctx.strokeStyle = `rgba(${gold},0.95)`;
      ctx.lineWidth   = 1.5;
      ctx.strokeRect(-5, -3.5, 10, 7);

      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(17, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(17, 0, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${gold},0.9)`;
      ctx.fill();

      ctx.strokeStyle = `rgba(${gold},0.65)`;
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(-2, -3.5);
      ctx.lineTo(-2, -12);
      ctx.moveTo( 2, -3.5);
      ctx.lineTo( 2, -12);
      ctx.stroke();
      ctx.strokeRect(-4, -14, 8, 4);

      ctx.restore();

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, []);

  return { canvasRef };
};
