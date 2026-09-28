import * as m from "motion/react-m";
import type { ElementType } from "react";

type MotionTag = typeof m.div;
const motionTagCache = new Map<ElementType, MotionTag>();
export function resolveMotionTag(as: ElementType): MotionTag {
  const cached = motionTagCache.get(as);
  if (cached) return cached;
  const created = m.create(as as "div");
  motionTagCache.set(as, created);
  return created;
}
