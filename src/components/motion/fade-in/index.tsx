"use client";
import type { ElementType, ReactNode } from "react";
import { resolveMotionTag } from "@/components/motion/resolve-motion-tag";
import {
  buildFadeVariants,
  DEFAULT_EASE,
  DEFAULT_VIEWPORT,
  type FadeDirection,
} from "@/components/motion/variants";

interface FadeInProps {
  children: ReactNode;
  direction?: FadeDirection;
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
  as?: ElementType;
  fromScale?: number;
  onMount?: boolean;
  viewportMargin?: string;
}
export function FadeIn({
  children,
  direction = "up",
  duration = 0.5,
  delay = 0,
  distance = 16,
  className,
  as = "div",
  fromScale,
  onMount = false,
  viewportMargin,
}: FadeInProps) {
  const MotionTag = resolveMotionTag(as);
  const variants = buildFadeVariants(direction, distance, fromScale);
  const trigger = {
    animate: "visible" as const,
  };
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      transition={{ duration, delay, ease: DEFAULT_EASE }}
      {...trigger}
    >
      {children}
    </MotionTag>
  );
}
