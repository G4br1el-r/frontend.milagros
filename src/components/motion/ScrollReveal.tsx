"use client";
import type { Variants, ViewportOptions } from "motion/react";
import type { ReactNode } from "react";
import { resolveMotionTag } from "@/components/motion/resolve-motion-tag";
import {
  SCROLL_REVEAL_DISTANCE_PX,
  SCROLL_REVEAL_DURATION_SECONDS,
  SCROLL_REVEAL_EASE,
  SCROLL_REVEAL_VIEWPORT_AMOUNT,
  STAGGER_ITEM_SPRING_DAMPING,
  STAGGER_ITEM_SPRING_STIFFNESS,
  STAGGER_REVEAL_CHILDREN_INTERVAL_SECONDS,
} from "@/components/motion/scroll-reveal.constants";
import { cn } from "@/lib/utils/cn";

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: "some" | "all" | number;
  direction?: "up" | "down" | "left" | "right";
  as?: React.ElementType;
  customViewport?: ViewportOptions;
}
export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = SCROLL_REVEAL_DURATION_SECONDS,
  distance = SCROLL_REVEAL_DISTANCE_PX,
  once = true,
  amount = SCROLL_REVEAL_VIEWPORT_AMOUNT,
  direction = "up",
  as: Component = "div",
}: ScrollRevealProps) {
  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return { y: distance };
    }
  };
  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: SCROLL_REVEAL_EASE,
      },
    },
  };
  const MotionComponent = resolveMotionTag(Component);
  return (
    <MotionComponent
      variants={variants}
      initial="hidden"
      animate="visible"
      className={cn(className)}
    >
      {children}
    </MotionComponent>
  );
}
export function StaggerReveal({
  children,
  className,
  delay = 0,
  staggerChildren = STAGGER_REVEAL_CHILDREN_INTERVAL_SECONDS,
  once = true,
  amount = SCROLL_REVEAL_VIEWPORT_AMOUNT,
  as: Component = "div",
  customViewport,
}: Omit<ScrollRevealProps, "duration" | "distance" | "direction"> & {
  staggerChildren?: number;
}) {
  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren,
      },
    },
  };
  const MotionComponent = resolveMotionTag(Component);
  return (
    <MotionComponent
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={customViewport || { once, amount }}
      className={cn(className)}
    >
      {children}
    </MotionComponent>
  );
}
export function StaggerItem({
  children,
  className,
  distance = SCROLL_REVEAL_DISTANCE_PX,
  direction = "up",
  as: Component = "div",
}: Pick<
  ScrollRevealProps,
  "children" | "className" | "distance" | "direction" | "as"
>) {
  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return { y: distance };
    }
  };
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: STAGGER_ITEM_SPRING_STIFFNESS,
        damping: STAGGER_ITEM_SPRING_DAMPING,
      },
    },
  };
  const MotionComponent = resolveMotionTag(Component);
  return (
    <MotionComponent variants={itemVariants} className={cn(className)}>
      {children}
    </MotionComponent>
  );
}
