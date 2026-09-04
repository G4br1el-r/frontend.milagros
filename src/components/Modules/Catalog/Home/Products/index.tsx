import { Sparkle } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/Layout/Container";
import { FadeIn } from "@/components/motion/fade-in";
import { ProductsResults } from "./ProductsResults";
export function Products() {
  return (
    <section
      id="catalog"
      className="relative z-10 w-full scroll-mt-24 bg-cream"
    >
      <div className="relative flex min-h-104 items-center overflow-hidden border-b-4 border-gold sm:min-h-0 sm:aspect-1672/941 sm:max-h-184">
        <Image
          src="/images/search/background-search.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-cream/95 via-cream/55 to-transparent" />
        <Container className="relative w-full py-20 sm:py-24">
          <FadeIn
            className="flex max-w-xl flex-col items-start gap-6 text-left sm:pl-6 lg:pl-12"
            distance={20}
          >
            <span className="flex items-center gap-2.5 text-[10px] font-medium tracking-[0.3em] text-primary-dark uppercase sm:text-[11px] sm:tracking-[0.38em]">
              <Sparkle className="size-3.5 text-gold" strokeWidth={2} />
              Catálogo
            </span>
            <h2 className="font-display text-3xl leading-tight text-balance text-primary sm:text-4xl lg:text-5xl">
              A maior variedade de incensos litúrgicos
            </h2>
            <div className="flex items-center gap-4 sm:gap-5">
              <span className="h-px w-14 bg-linear-to-r from-transparent to-primary/40 sm:w-24" />
              <span className="font-display shrink-0 text-[10px] tracking-[0.3em] text-primary/70 italic sm:text-xs">
                ad maiorem Dei gloriam
              </span>
            </div>
            <p className="max-w-md text-balance text-sm leading-relaxed text-primary/70 sm:text-base">
              Incensos de resina, carvões e acessórios religiosos, para toda
              paróquia, capela e devoto.
            </p>
          </FadeIn>
        </Container>
      </div>
      <div className="mx-auto w-full max-w-[1920px] pb-24 sm:pb-28 lg:pb-32">
        <ProductsResults />
      </div>
    </section>
  );
}
