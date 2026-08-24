import { SearchX } from "lucide-react";

export function ProductEmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-primary/10 bg-white/60 px-6 py-20 text-center">
      <SearchX
        className="size-10 text-primary/30"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-xl text-primary">
          Nenhum produto encontrado
        </h3>
        <p className="max-w-sm text-sm text-primary/60">
          Tente ajustar os filtros ou buscar por outro termo.
        </p>
      </div>
    </div>
  );
}
