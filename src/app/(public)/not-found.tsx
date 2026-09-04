import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex w-full flex-1 items-center justify-center bg-cream px-5 py-32">
      <div className="flex max-w-md flex-col items-center gap-5 text-center">
        <span className="font-display text-[10px] tracking-[0.3em] text-primary-dark uppercase">
          Erro 404
        </span>

        <h1 className="font-display text-3xl leading-tight text-primary sm:text-4xl">
          Esta página não existe
        </h1>

        <p className="text-sm leading-relaxed text-primary/70">
          O endereço pode ter mudado. O catálogo completo continua no lugar de
          sempre.
        </p>

        <Link
          href="/"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-cream transition-colors duration-200 hover:bg-primary-darkest focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:outline-none"
        >
          Ver o catálogo
        </Link>
      </div>
    </main>
  );
}
