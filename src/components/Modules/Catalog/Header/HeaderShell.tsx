"use client";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { useScrolled } from "./useScrolled";
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const { scrolled, hidden } = useScrolled();
  const pathname = usePathname();
  const overDarkHero = pathname === "/";
  const solid = scrolled || !overDarkHero;
  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.9 }}
      className={cn(
        "fixed inset-x-0 top-0 z-(--z-index-overlay) w-full pt-[env(safe-area-inset-top)] transition-[background-color,border-color] duration-500",
        solid
          ? "border-b border-ouro/10 bg-nave/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {children}
    </motion.header>
  );
}
