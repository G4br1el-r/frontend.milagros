"use client";
import { Flame } from "lucide-react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { BrandWordmark } from "../../BrandWordmark";
import { HeroCta } from "../HeroCta";
import {
  AMBIENT_DRIFT_LOOP,
  AMBIENT_DRIFT_REST,
  FLAME_PULSE_LOOP,
  FLAME_PULSE_REST,
  hairline,
  heroRise,
  heroStage,
  taglineStage,
  taglineWord,
} from "../hero.motion";
import { useHeroVisible } from "../use-hero-visible";

const TAGLINE = "Uma chama para cada devoção, um incenso para cada santo.";
export function HeroContent() {
  const reduceMotion = useReducedMotion();
  const heroVisible = useHeroVisible();
  return (
    <m.div
      variants={heroStage}
      initial="hidden"
      animate="show"
      className="mx-auto flex w-full max-w-208 flex-col items-center gap-6 text-center sm:gap-7"
    >
      <m.div
        variants={heroRise}
        className="flex items-center gap-3 rounded-full border border-cream/30 bg-primary-dark/40 px-4 py-2 backdrop-blur-sm"
      >
        <m.span
          animate={
            reduceMotion
              ? undefined
              : heroVisible
                ? FLAME_PULSE_LOOP
                : FLAME_PULSE_REST
          }
          className="flex text-cream"
        >
          <Flame className="size-3.5 shrink-0" strokeWidth={2} />
        </m.span>
        <span className="text-[10px] font-medium tracking-[0.3em] text-cream uppercase sm:text-[11px] sm:tracking-[0.38em]">
          Catálogo Litúrgico
        </span>
      </m.div>
      <m.div
        className="w-full"
        animate={
          reduceMotion
            ? undefined
            : heroVisible
              ? AMBIENT_DRIFT_LOOP
              : AMBIENT_DRIFT_REST
        }
      >
        <BrandWordmark />
      </m.div>
      <m.div
        variants={heroRise}
        className="flex items-center justify-center gap-4 sm:gap-5"
      >
        <m.span
          variants={hairline}
          className="h-px w-14 origin-right bg-linear-to-r from-transparent to-cream/70 sm:w-24 lg:w-32"
        />
        <span className="font-brand shrink-0 text-[10px] tracking-[0.3em] text-cream/85 italic sm:text-xs">
          duc in altum
        </span>
        <m.span
          variants={hairline}
          className="h-px w-14 origin-left bg-linear-to-l from-transparent to-cream/70 sm:w-24 lg:w-32"
        />
      </m.div>
      <m.p
        variants={taglineStage}
        className="mx-auto max-w-md text-balance text-base leading-relaxed font-light tracking-wide text-cream sm:max-w-xl sm:text-lg lg:text-xl"
      >
        {TAGLINE.split(" ").map((word, index) => (
          <m.span
            // biome-ignore lint/suspicious/noArrayIndexKey: static word sequence
            key={`${word}-${index}`}
            variants={reduceMotion ? undefined : taglineWord}
            className="inline-block whitespace-pre"
          >
            {word}{" "}
          </m.span>
        ))}
      </m.p>
      <HeroCta />
    </m.div>
  );
}
