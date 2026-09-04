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
  const baseOpacity = randomBetween(0.04, 0.09);
  return {
    x: columnWidth / 2 + randomBetween(-columnWidth * 0.15, columnWidth * 0.15),
    y: originY + randomBetween(0, 40),
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
  particle.radius = particle.baseRadius * (1 + progress * 2.2);
  const fadeIn = Math.min(1, progress / 0.1);
  const fadeOut = Math.min(1, (1 - progress) / 0.45);
  particle.opacity = particle.baseOpacity * fadeIn * fadeOut;
  return particle.y > -particle.radius * 2;
}
