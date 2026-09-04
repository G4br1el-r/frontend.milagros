"use client";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
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
  customViewport?: any;
}
export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  distance = 30,
  once = true,
  amount = 0.2,
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
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };
  const MotionComponent = motion.create(Component as any);
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
  staggerChildren = 0.1,
  once = true,
  amount = 0.2,
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
  const MotionComponent = motion.create(Component as any);
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
  distance = 30,
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
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };
  const MotionComponent = motion.create(Component as any);
  return (
    <MotionComponent variants={itemVariants} className={cn(className)}>
      {children}
    </MotionComponent>
  );
}
