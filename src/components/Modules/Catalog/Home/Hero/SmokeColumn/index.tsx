"use client";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import {
  createParticle,
  type SmokeParticle,
  stepParticle,
} from "./smoke-particles";

const COLUMN_WIDTH = 220;
const MAX_PARTICLES = 13;
const SPAWN_INTERVAL_SECONDS = 0.5;
const MIN_VISIBLE_INTENSITY = 0.01;
const UNIT_RADIUS = 1;
const FULL_CIRCLE_RADIANS = Math.PI * 2;
const SMOKE_COLOR_OPAQUE = "rgba(237, 231, 219, 1)";
const SMOKE_COLOR_TRANSPARENT = "rgba(237, 231, 219, 0)";
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
    const smokeGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, UNIT_RADIUS);
    smokeGradient.addColorStop(0, SMOKE_COLOR_OPAQUE);
    smokeGradient.addColorStop(1, SMOKE_COLOR_TRANSPARENT);
    const particles: SmokeParticle[] = [];
    let lastTime = performance.now();
    let spawnAccumulator = 0;
    let elapsedSeconds = 0;
    let rafId: number | null = null;
    function scrollIntensity(): number {
      const viewportHeight = window.innerHeight || 1;
      return Math.max(0, 1 - window.scrollY / viewportHeight);
    }
    function stop() {
      if (rafId === null) return;
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    function start() {
      if (rafId !== null) return;
      lastTime = performance.now();
      rafId = requestAnimationFrame(frame);
    }
    function syncWithScroll() {
      if (scrollIntensity() > MIN_VISIBLE_INTENSITY) start();
    }
    function frame(now: number) {
      rafId = requestAnimationFrame(frame);
      const deltaSeconds = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsedSeconds += deltaSeconds;
      const intensity = scrollIntensity();
      if (intensity <= MIN_VISIBLE_INTENSITY) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stop();
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
      ctx.fillStyle = smokeGradient;
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
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.scale(particle.radius, particle.radius);
        ctx.globalAlpha = particle.opacity * intensity;
        ctx.beginPath();
        ctx.arc(0, 0, UNIT_RADIUS, 0, FULL_CIRCLE_RADIANS);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    }
    syncWithScroll();
    window.addEventListener("scroll", syncWithScroll, { passive: true });
    return () => {
      stop();
      window.removeEventListener("scroll", syncWithScroll);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);
  if (reduceMotion) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      className="pointer-events-none absolute bottom-0 left-1/2 z-1 h-full -translate-x-1/2 mix-blend-screen"
      style={{ width: COLUMN_WIDTH }}
    />
  );
}
