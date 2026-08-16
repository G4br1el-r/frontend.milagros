export function FilterActions() {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="flex-1 cursor-pointer rounded-full border border-primary/15 bg-white px-3 py-2.5 text-xs font-semibold whitespace-nowrap tracking-[0.06em] text-primary uppercase transition-colors duration-300 hover:border-primary/30"
      >
        Limpar tudo
      </button>
      <button
        type="button"
        className="flex-1 cursor-pointer rounded-full bg-linear-to-b from-gold-light to-gold px-3 py-2.5 text-xs font-bold whitespace-nowrap tracking-[0.06em] text-primary-darkest uppercase transition-transform duration-300 hover:-translate-y-0.5"
      >
        Aplicar filtros
      </button>
    </div>
  );
}
