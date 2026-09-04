import { ArrowRight, Sparkle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Layout/Container";
export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-120px)] w-full flex-col items-center justify-center overflow-hidden bg-cream">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/search/background-search.png"
          alt=""
          fill
          className="object-cover opacity-20 grayscale mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-linear-to-b from-cream via-transparent to-cream" />
        <div className="absolute inset-0 bg-linear-to-r from-cream via-transparent to-cream" />
      </div>
      <Container className="relative z-10 flex w-full flex-col items-center text-center">
        <div className="mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 rounded-full border border-gold/40 bg-white/50 px-5 py-2 backdrop-blur-md">
            <Sparkle className="size-4 text-gold" strokeWidth={2} />
            <span className="text-xs font-medium tracking-[0.3em] text-primary-dark uppercase">
              Erro 404
            </span>
          </div>
          <h1 className="font-display text-5xl leading-[1.15] text-balance text-primary sm:text-6xl lg:text-7xl">
            Página não encontrada
          </h1>
          <div className="flex items-center justify-center gap-4 sm:gap-5">
            <span className="h-px w-14 bg-linear-to-r from-transparent to-primary/40 sm:w-24" />
            <span className="font-display shrink-0 text-base tracking-[0.3em] text-primary/70 italic sm:text-lg">
              via incognita
            </span>
            <span className="h-px w-14 bg-linear-to-l from-transparent to-primary/40 sm:w-24" />
          </div>
          <p className="max-w-md text-balance text-lg leading-relaxed text-primary/70 sm:text-xl">
            O caminho que você procura não existe. O catálogo completo com todos
            os nossos incensos litúrgicos continua em seu lugar.
          </p>
          <Link
            href="/"
            className="group relative mt-6 inline-flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-full bg-linear-to-b from-gold-light to-gold px-8 py-4 text-xs font-bold tracking-[0.12em] text-primary-darkest uppercase focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:outline-none"
          >
            <span className="relative z-10">Voltar ao Catálogo</span>
            <span className="relative z-10 inline-flex transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="size-4" strokeWidth={2.5} />
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/30 to-transparent opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-100"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-full w-2/3 skew-x-[-20deg] bg-white/25 blur-xl transition-[left] duration-1200 ease-in-out group-hover:left-[160%]"
            />
          </Link>
        </div>
      </Container>
    </main>
  );
}
