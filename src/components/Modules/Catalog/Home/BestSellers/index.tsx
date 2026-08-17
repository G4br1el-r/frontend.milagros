import { Flame } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { BestSellerCard } from "./BestSellerCard";
import { BestSellerCarousel } from "./BestSellerCarousel";
import { BEST_SELLERS } from "./bestSellers.data";

export function BestSellers() {
  return (
    <section id="best-sellers" className="relative z-10 w-full scroll-mt-24 bg-primary-darkest">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <FadeIn className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-12" distance={20}>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-1.5">
            <Flame className="size-3 shrink-0 text-terracotta" strokeWidth={2} />
            <span className="text-[10px] font-medium tracking-[0.3em] text-cream/90 uppercase">Devoção da casa</span>
          </span>

          <h2 className="font-display text-3xl leading-tight text-balance text-cream sm:text-4xl">Mais vendidos</h2>

          <p className="max-w-lg text-balance text-sm leading-relaxed text-cream/60">
            As peças que saem primeiro das prateleiras — escolhidas por paróquias, capelas e devotos de todo o país.
          </p>
        </FadeIn>

        <FadeIn distance={24} viewportMargin="-40px">
          <BestSellerCarousel>
            {BEST_SELLERS.map((product) => (
              <div
                key={product.id}
                className="min-w-0 shrink-0 grow-0 basis-full sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)] xl:basis-[calc((100%-3.75rem)/4)]"
              >
                <BestSellerCard product={product} />
              </div>
            ))}
          </BestSellerCarousel>
        </FadeIn>
      </div>
    </section>
  );
}
