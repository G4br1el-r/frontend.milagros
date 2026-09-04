"use client";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import {
  createParticle,
  type SmokeParticle,
  stepParticle,
} from "./smoke-particles";

const COLUMN_WIDTH = 220;
const MAX_PARTICLES = 14;
const SPAWN_INTERVAL_SECONDS = 0.45;
export function SmokeColumn() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (reduceMotion) return;
    const canvasEl = canvasRef.current;
    const context = canvasEl?.getContext("2d");
    if (!canvasEl || !context) return;
    const canvas = canvasEl;
    const ctx = context;
    let width = 0;
    let height = 0;
    let dpr = 1;
    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = COLUMN_WIDTH;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }
    resize();
    window.addEventListener("resize", resize);
    const particles: SmokeParticle[] = [];
    let lastTime = performance.now();
    let spawnAccumulator = 0;
    let elapsedSeconds = 0;
    let rafId: number;
    function scrollIntensity(): number {
      const viewportHeight = window.innerHeight || 1;
      return Math.max(0, 1 - window.scrollY / viewportHeight);
    }
    function frame(now: number) {
      rafId = requestAnimationFrame(frame);
      const deltaSeconds = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsedSeconds += deltaSeconds;
      const intensity = scrollIntensity();
      if (intensity <= 0.01) {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      spawnAccumulator += deltaSeconds;
      const spawnInterval = SPAWN_INTERVAL_SECONDS / Math.max(intensity, 0.3);
      while (
        spawnAccumulator > spawnInterval &&
        particles.length < MAX_PARTICLES
      ) {
        spawnAccumulator -= spawnInterval;
        particles.push(createParticle({ columnWidth: width, originY: height }));
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        const alive = stepParticle(
          particle,
          deltaSeconds,
          elapsedSeconds,
          width,
          height,
        );
        if (!alive) {
          particles.splice(i, 1);
          continue;
        }
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius,
        );
        const alpha = particle.opacity * intensity;
        gradient.addColorStop(0, `rgba(237, 231, 219, ${alpha})`);
        gradient.addColorStop(1, "rgba(237, 231, 219, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    rafId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);
  if (reduceMotion) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      className="pointer-events-none absolute bottom-0 left-1/2 h-full -translate-x-1/2 mix-blend-screen"
      style={{ width: COLUMN_WIDTH }}
    />
  );
}
