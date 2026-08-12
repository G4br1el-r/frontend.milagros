import { Search } from "lucide-react";

export function CatalogHeader() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pt-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:pt-12">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display text-3xl font-medium text-text sm:text-4xl">
          Catálogo de Produtos
        </h2>
        <p className="text-sm text-text-muted">
          Explore nossa linha completa de incensos e kits
        </p>
      </div>

      <div className="flex w-full items-stretch overflow-hidden rounded-full border border-border bg-surface sm:w-80">
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="w-full bg-transparent px-5 py-3 text-sm text-text outline-none placeholder:text-text-muted"
        />
        <button
          type="button"
          aria-label="Buscar"
          className="flex shrink-0 items-center justify-center bg-primary px-4 py-3 text-background transition-colors hover:bg-primary-light"
        >
          <Search className="size-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
