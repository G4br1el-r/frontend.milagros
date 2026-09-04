/**
 * Esqueleto com a mesma malha da página real (galeria à esquerda, painel de
 * compra à direita) — a troca para o conteúdo não desloca nada.
 */
export default function Loading() {
  return (
    <main className="w-full flex-1 bg-cream">
      <div className="mx-auto w-full max-w-7xl px-5 pt-28 pb-24 sm:px-8 sm:pt-32 lg:px-12">
        <div className="mb-8 h-4 w-56 animate-pulse rounded-full bg-primary/10 sm:mb-10" />

        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="aspect-square w-full animate-pulse rounded-2xl bg-primary/10" />

          <div className="flex flex-col gap-6">
            <div className="h-7 w-32 animate-pulse rounded-full bg-primary/10" />
            <div className="h-12 w-full animate-pulse rounded-lg bg-primary/10" />
            <div className="h-12 w-3/4 animate-pulse rounded-lg bg-primary/10" />
            <div className="h-44 w-full animate-pulse rounded-2xl bg-primary/10" />
          </div>
        </div>
      </div>
    </main>
  );
}
