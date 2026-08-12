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

      <div className="flex w-full items-stretch overflow-hidden rounded-full border border-white/15 bg-white/5">
        <input
          type="email"
          placeholder="Seu e-mail"
          className="w-full bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/40"
        />
        <button
          type="button"
          aria-label="Assinar"
          className="flex shrink-0 items-center justify-center bg-gold px-4 text-primary-dark transition-colors hover:bg-gold-light"
        >
          <ChevronRight className="size-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
