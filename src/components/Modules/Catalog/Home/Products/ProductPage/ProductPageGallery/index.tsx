"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ImagePlaceholder } from "../../ProductMedia/ImagePlaceholder";
import { AMBIENT_GLOW } from "../product-page.motion";

interface ProductPageGalleryProps {
  images: string[];
  alt: string;
}

const SIZES = "(min-width: 1024px) 820px, 96vw";
const ZOOM_SCALE = 2.4;

/**
 * Galeria da página de produto. O zoom é por CLIQUE, não por hover: hover
 * ampliava sem querer só de passar o mouse a caminho de outro controle, e
 * não existe em touch. Clicou, amplia e trava; o ponteiro então passeia
 * pela imagem ampliada (transform-origin segue o cursor) e um segundo
 * clique — ou Esc — volta ao normal.
 */
export function ProductPageGallery({ images, alt }: ProductPageGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
    // Trocar de imagem sai do zoom: a ampliação era daquela foto.
    setZoomed(false);
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

  // Enquanto ampliado, o arraste do carrossel atrapalha o passeio pela
  // imagem — e Esc precisa desfazer o zoom.
  useEffect(() => {
    if (!zoomed) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomed(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomed]);

  const goTo = useCallback(
    (next: number) => emblaApi?.scrollTo(next),
    [emblaApi],
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const updateOrigin = (event: React.PointerEvent<Element>) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  if (images.length === 0) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-primary-darkest">
        <ImagePlaceholder />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse lg:items-start lg:gap-4">
      <div className="relative min-w-0 flex-1">
        {/* Halo quente atrás da moldura — respira devagar, como a brasa do hero. */}
        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? undefined : { opacity: [0.35, 0.6, 0.35] }}
          transition={AMBIENT_GLOW}
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-radial from-gold/25 via-terracotta/10 to-transparent blur-2xl"
        />

        <div
          ref={frameRef}
          onPointerMove={zoomed ? updateOrigin : undefined}
          className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-primary/10 bg-primary-darkest"
        >
          <div
            className={cn(
              "h-full overflow-hidden",
              // Com zoom ativo o embla solta o gesto: arrastar passeia pela
              // imagem em vez de trocar de foto.
              zoomed ? "touch-none" : "touch-pan-y",
            )}
            ref={emblaRef}
          >
            <div className="flex h-full">
              {images.map((src, i) => (
                <div
                  key={src}
                  className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
                >
                  <Image
                    src={src}
                    alt={i === index ? alt : ""}
                    fill
                    sizes={SIZES}
                    priority={i === 0}
                    className="object-contain transition-transform duration-500 ease-out"
                    style={
                      zoomed && i === index && !reduceMotion
                        ? {
                            transform: `scale(${ZOOM_SCALE})`,
                            transformOrigin: origin,
                          }
                        : undefined
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Camada de clique do zoom: fica acima da imagem e abaixo das
              setas, para não roubar o clique da navegação. */}
          <button
            type="button"
            onClick={() => setZoomed((previous) => !previous)}
            onPointerMove={zoomed ? updateOrigin : undefined}
            aria-label={zoomed ? "Reduzir imagem" : "Ampliar imagem"}
            aria-pressed={zoomed}
            className={cn(
              "absolute inset-0 z-10 focus-visible:outline-none",
              zoomed ? "cursor-zoom-out" : "cursor-zoom-in",
            )}
          />

          <div className="hero-grain pointer-events-none absolute inset-0" />

          <span
            className={cn(
              "pointer-events-none absolute bottom-4 left-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-primary-darkest/70 px-3 py-1.5 text-[11px] font-medium text-cream/90 backdrop-blur-md transition-opacity duration-300",
              zoomed ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            )}
          >
            {zoomed ? (
              <>
                <ZoomOut className="size-3.5" strokeWidth={2} />
                Clique para reduzir
              </>
            ) : (
              <>
                <ZoomIn className="size-3.5" strokeWidth={2} />
                Clique para ampliar
              </>
            )}
          </span>

          {images.length > 1 && !zoomed && (
            <>
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Imagem anterior"
                className="absolute top-1/2 left-3 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-cream/20 bg-primary-darkest/70 text-cream backdrop-blur-md transition duration-200 hover:scale-105 hover:border-gold hover:text-gold-light focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              >
                <ChevronLeft className="size-4.5" strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={scrollNext}
                aria-label="Próxima imagem"
                className="absolute top-1/2 right-3 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-cream/20 bg-primary-darkest/70 text-cream backdrop-blur-md transition duration-200 hover:scale-105 hover:border-gold hover:text-gold-light focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              >
                <ChevronRight className="size-4.5" strokeWidth={2} />
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className="pointer-events-none absolute right-4 bottom-4 z-20 rounded-full bg-primary-darkest/70 px-3 py-1 text-[11px] font-medium text-cream backdrop-blur-md">
              {index + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex shrink-0 gap-2.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver imagem ${i + 1} de ${images.length}`}
              aria-current={i === index}
              className={cn(
                "relative size-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 bg-primary-darkest transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:outline-none sm:size-18",
                i === index
                  ? "border-gold shadow-[0_0_0_3px_rgba(195,146,79,0.16)]"
                  : "border-primary/10 opacity-55 hover:opacity-100",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="72px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
