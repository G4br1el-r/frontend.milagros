"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { StaggerItem, StaggerReveal } from "@/components/motion/ScrollReveal";
import { ProductCard } from "../Products/ProductCard";
import type { Product } from "../Products/product.types";

interface BestSellersCarouselProps {
  products: Product[];
}
export function BestSellersCarousel({ products }: BestSellersCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);
  return (
    <>
      <StaggerReveal
        className="mb-10 flex flex-col gap-4 sm:mb-12"
        staggerChildren={0.15}
      >
        <StaggerItem distance={20} direction="down">
          <span className="flex items-center gap-2.5 text-[10px] font-medium tracking-[0.3em] text-primary-dark uppercase sm:text-[11px] sm:tracking-[0.38em]">
            <Flame className="size-3.5 text-gold" strokeWidth={2} />
            Destaques
          </span>
        </StaggerItem>
        <StaggerItem>
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <h2
                id="mais-vendidos-heading"
                className="font-display text-3xl leading-tight text-primary sm:text-4xl lg:text-5xl"
              >
                Mais vendidos
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-primary/60 sm:text-base">
                Os produtos favoritos da nossa comunidade de fiéis e paróquias.
              </p>
            </div>
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Produtos anteriores"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-primary/15 bg-white/80 text-primary/70 backdrop-blur-sm transition duration-200 hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="size-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Próximos produtos"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-primary/15 bg-white/80 text-primary/70 backdrop-blur-sm transition duration-200 hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="size-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="flex items-center gap-4 sm:gap-5">
            <span className="h-px flex-1 bg-linear-to-r from-gold/40 via-gold/20 to-transparent" />
          </div>
        </StaggerItem>
      </StaggerReveal>
      <StaggerReveal
        className="relative overflow-hidden"
        staggerChildren={0.05}
      >
        <div ref={emblaRef}>
          <div className="-ml-4 flex sm:-ml-5 lg:-ml-6">
            {products.map((product) => (
              <StaggerItem
                key={product.id}
                className="min-w-0 shrink-0 grow-0 basis-[80%] pl-4 sm:basis-[45%] sm:pl-5 lg:basis-[30%] lg:pl-6 xl:basis-[25%]"
              >
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </div>
        </div>
      </StaggerReveal>
      <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Produtos anteriores"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-primary/15 bg-white/80 text-primary/70 transition duration-200 hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="size-4.5" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Próximos produtos"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-primary/15 bg-white/80 text-primary/70 transition duration-200 hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="size-4.5" strokeWidth={2} />
        </button>
      </div>
    </>
  );
}
