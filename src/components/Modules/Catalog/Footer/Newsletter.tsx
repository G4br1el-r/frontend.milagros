import { iconMap } from "@/lib/utils/iconsMap";

const ChevronRight = iconMap.chevronRight;

export function Newsletter() {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-semibold tracking-wide text-white uppercase">
        Receba Novidades
      </span>
      <p className="text-sm text-white/60">
        Devoções, lançamentos e ofertas direto no seu e-mail.
      </p>

      <form className="flex w-full items-stretch overflow-hidden rounded-full border border-white/15 bg-white/5 focus-within:border-gold-light/50">
        <label htmlFor="newsletter-email" className="sr-only">
          Seu e-mail
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Seu e-mail"
          // text-base (16px) evita o zoom automático do Safari iOS ao focar.
          className="w-full bg-transparent px-4 py-3 text-base text-white outline-none placeholder:text-white/40 sm:py-2.5 sm:text-sm"
        />
        <button
          type="submit"
          aria-label="Assinar newsletter"
          className="flex w-12 shrink-0 items-center justify-center bg-gold text-primary-darkest transition-colors hover:bg-gold-light focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-inset focus-visible:outline-none"
        >
          <ChevronRight className="size-5" strokeWidth={2} />
        </button>
      </form>
    </div>
  );
}
