const MIN_BASE_OPACITY = 0.03;
const MAX_BASE_OPACITY = 0.07;
const FADE_IN_PROGRESS = 0.15;
const FADE_OUT_PROGRESS = 0.45;
const INITIAL_RADIUS_RATIO = 0.35;
const RADIUS_GROWTH = 2.2;
const SPAWN_BELOW_MIN_PX = 60;
const SPAWN_BELOW_MAX_PX = 140;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export interface SmokeParticle {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  opacity: number;
  baseOpacity: number;
  drift: number;
  driftPhase: number;
  speed: number;
}
interface CreateParticleOptions {
  columnWidth: number;
  originY: number;
}
function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
export function createParticle({
  columnWidth,
  originY,
}: CreateParticleOptions): SmokeParticle {
  const baseRadius = randomBetween(columnWidth * 0.05, columnWidth * 0.12);
  const baseOpacity = randomBetween(MIN_BASE_OPACITY, MAX_BASE_OPACITY);
  return {
    x: columnWidth / 2 + randomBetween(-columnWidth * 0.15, columnWidth * 0.15),
    y: originY + randomBetween(SPAWN_BELOW_MIN_PX, SPAWN_BELOW_MAX_PX),
    radius: baseRadius,
    baseRadius,
    opacity: 0,
    baseOpacity,
    drift: randomBetween(columnWidth * 0.08, columnWidth * 0.22),
    driftPhase: randomBetween(0, Math.PI * 2),
    speed: randomBetween(16, 30),
  };
}
export function stepParticle(
  particle: SmokeParticle,
  deltaSeconds: number,
  elapsedSeconds: number,
  columnWidth: number,
  columnHeight: number,
): boolean {
  particle.y -= particle.speed * deltaSeconds;
  const progress = 1 - particle.y / columnHeight;
  particle.x =
    columnWidth / 2 +
    Math.sin(elapsedSeconds * 0.6 + particle.driftPhase) *
      particle.drift *
      progress;
  particle.radius =
    particle.baseRadius * (INITIAL_RADIUS_RATIO + progress * RADIUS_GROWTH);
  const fadeIn = clamp01(progress / FADE_IN_PROGRESS);
  const fadeOut = clamp01((1 - progress) / FADE_OUT_PROGRESS);
  particle.opacity = particle.baseOpacity * fadeIn * fadeOut;
  return particle.y > -particle.radius * 2;
}
