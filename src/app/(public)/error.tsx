"use client";
import { RotateCw } from "lucide-react";
import { useEffect } from "react";
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main className="flex w-full flex-1 items-center justify-center bg-cream px-5 py-32">
      <div className="flex max-w-md flex-col items-center gap-5 text-center">
        <h1 className="font-display text-3xl leading-tight text-primary sm:text-4xl">
          Esta página não carregou
        </h1>
        <p className="text-sm leading-relaxed text-primary/70">
          A falha foi do nosso lado. Tente de novo — se persistir, fale com a
          gente no WhatsApp.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-cream transition-colors duration-200 hover:bg-primary-darkest focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:outline-none"
        >
          <RotateCw className="size-4" strokeWidth={2} />
          Tentar de novo
        </button>
      </div>
    </main>
  );
}
