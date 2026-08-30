"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ImagePlaceholder } from "../../ProductMedia/ImagePlaceholder";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

const SIZES = "(min-width: 1024px) 520px, 92vw";

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });
  const [index, setIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
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

  const goTo = useCallback(
    (next: number) => emblaApi?.scrollTo(next),
    [emblaApi],
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (images.length === 0) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-primary-darkest sm:aspect-auto sm:h-full">
        <ImagePlaceholder />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-lg sm:aspect-auto">
        <div className="h-full touch-pan-y overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {images.map((src) => (
              <div
                key={src}
                className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes={SIZES}
                  priority
                  className="object-contain p-4"
                />
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Imagem anterior"
              className="absolute top-1/2 left-3 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-cream/20 bg-primary-darkest/70 text-cream backdrop-blur-md transition duration-200 hover:scale-105 hover:border-gold hover:text-gold-light"
            >
              <ChevronLeft className="size-4" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Próxima imagem"
              className="absolute top-1/2 right-3 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-cream/20 bg-primary-darkest/70 text-cream backdrop-blur-md transition duration-200 hover:scale-105 hover:border-gold hover:text-gold-light"
            >
              <ChevronRight className="size-4" strokeWidth={2} />
            </button>

            <div className="absolute right-3 bottom-3 z-10 rounded-full bg-primary-darkest/70 px-2.5 py-1 text-[11px] font-medium text-cream backdrop-blur-md">
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver imagem ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 hover:scale-105",
                i === index
                  ? "border-gold"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
