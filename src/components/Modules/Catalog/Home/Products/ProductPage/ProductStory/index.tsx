"use client";
import { motion } from "motion/react";
import { PRODUCT_FALLBACK_DESCRIPTION } from "../../product.constants";
import {
  DETAIL_VIEWPORT,
  hairline,
  riseSoft,
  specStage,
} from "../product-page.motion";

interface ProductStoryProps {
  description: string | null;
  name: string;
}
export function ProductStory({ description, name }: ProductStoryProps) {
  const hasDescription =
    description && description !== PRODUCT_FALLBACK_DESCRIPTION;
  if (!hasDescription) return null;
  const paragraphs = description
    .split(/\n+/)
    .map((block) => block.trim())
    .filter(Boolean);
  return (
    <motion.section
      aria-labelledby="sobre-produto-heading"
      variants={specStage}
      initial="hidden"
      whileInView="show"
      viewport={DETAIL_VIEWPORT}
      className="flex flex-col gap-6"
    >
      <motion.h2
        variants={riseSoft}
        id="sobre-produto-heading"
        className="font-display text-2xl text-primary sm:text-3xl"
      >
        Sobre {name}
      </motion.h2>
      <motion.span
        variants={hairline}
        className="h-px w-24 origin-left bg-linear-to-r from-gold to-transparent"
      />
      <motion.div
        variants={riseSoft}
        className="flex w-full flex-col gap-5 text-base leading-[1.75] text-primary/75"
      >
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            className="text-justify [hyphens:auto] [text-wrap:pretty]"
            lang="pt-BR"
          >
            {paragraph}
          </p>
        ))}
      </motion.div>
    </motion.section>
  );
}
