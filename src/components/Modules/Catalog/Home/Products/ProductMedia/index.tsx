"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { cardGlow, cardMedia } from "../product.motion";

interface ProductMediaProps {
  src: string;
  alt: string;
  priority?: boolean;
  overlay?: ReactNode;
}

const SIZES = "(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw";

export function ProductMedia({
  src,
  alt,
  priority,
  overlay,
}: ProductMediaProps) {
  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-t-xl bg-primary-darkest">
      <motion.div variants={cardMedia} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={SIZES}
          priority={priority}
          className="object-cover"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-primary-darkest/85 via-primary-darkest/10 to-transparent"
      />

      <motion.div
        aria-hidden="true"
        variants={cardGlow}
        className="absolute inset-0 bg-linear-to-t from-terracotta/35 via-transparent to-gold/20 mix-blend-soft-light"
      />

      <div className="hero-grain absolute inset-0" />

      {overlay}
    </div>
  );
}
