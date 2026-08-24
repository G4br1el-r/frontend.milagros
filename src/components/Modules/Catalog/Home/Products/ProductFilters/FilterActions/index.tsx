export function FilterActions() {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <button
        type="button"
        className="min-h-11 flex-1 cursor-pointer rounded-full border border-primary/15 bg-white px-3 py-2.5 text-xs font-semibold tracking-[0.06em] text-primary uppercase transition-colors duration-300 hover:border-primary/30 sm:whitespace-nowrap"
      >
        Limpar tudo
      </button>
      <button
        type="button"
        className="min-h-11 flex-1 cursor-pointer rounded-full bg-linear-to-b from-gold-light to-gold px-3 py-2.5 text-xs font-bold tracking-[0.06em] text-primary-darkest uppercase transition-opacity duration-300 hover:opacity-90 sm:whitespace-nowrap"
      >
        Aplicar filtros
      </button>
    </div>
  );
}
