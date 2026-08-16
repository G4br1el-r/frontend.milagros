"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils/cn";

interface BestSellerCarouselProps {
  children: ReactNode;
}

const AUTOPLAY_DELAY = 3800;

export function BestSellerCarousel({ children }: BestSellerCarouselProps) {
  const reduceMotion = useReducedMotion();

  const autoplay = useRef(
    Autoplay({
      delay: AUTOPLAY_DELAY,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: false,
      dragFree: false,
      loop: true,
    },
    reduceMotion ? [] : [autoplay.current],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      setSnaps(emblaApi.scrollSnapList());
      onSelect();
    };

    sync();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", sync);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4 sm:gap-5">{children}</div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Produtos anteriores"
        className="absolute top-1/2 -left-3 z-10 hidden size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-cream/20 bg-primary-darkest/85 text-cream backdrop-blur-md transition duration-300 hover:border-gold hover:text-gold-light focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none sm:grid lg:-left-5"
      >
        <ChevronLeft className="size-5" strokeWidth={2} />
      </button>

      <button
        type="button"
        onClick={scrollNext}
        aria-label="Próximos produtos"
        className="absolute top-1/2 -right-3 z-10 hidden size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-cream/20 bg-primary-darkest/85 text-cream backdrop-blur-md transition duration-300 hover:border-gold hover:text-gold-light focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none sm:grid lg:-right-5"
      >
        <ChevronRight className="size-5" strokeWidth={2} />
      </button>

      {snaps.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {snaps.map((snap, index) => (
            <button
              key={snap}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Ir para o grupo ${index + 1} de ${snaps.length}`}
              aria-current={index === selectedIndex}
              className="group/dot grid h-6 cursor-pointer place-items-center px-0.5 focus-visible:outline-none"
            >
              <span
                className={cn(
                  "h-1 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-visible/dot:ring-2 group-focus-visible/dot:ring-gold",
                  index === selectedIndex
                    ? "w-7 bg-gold"
                    : "w-2.5 bg-cream/25 group-hover/dot:bg-cream/50",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
