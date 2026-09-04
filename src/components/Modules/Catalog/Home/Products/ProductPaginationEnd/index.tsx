import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { appToast } from "@/lib/toast/toast";

/**
 * "Fim da paginação" (seção 3): na última página, sugere limpar filtro ou
 * ver categoria relacionada em vez de simplesmente parar em silêncio.
 */
export function ProductPaginationEnd() {
  const { letra, categoria, precoMin, precoMax, reset } =
    useProductFiltersUrl();

  const hasActiveFilter =
    Boolean(letra || categoria) ||
    precoMin !== undefined ||
    precoMax !== undefined;

  if (!hasActiveFilter) return null;

  return (
    <p className="mt-6 text-center text-sm text-primary/55">
      Chegou ao fim dos resultados para este filtro.{" "}
      <button
        type="button"
        onClick={() => {
          reset();
          appToast.filtersCleared();
        }}
        className="cursor-pointer font-medium text-terracotta underline underline-offset-2 hover:text-terracotta/80"
      >
        Limpar filtros
      </button>{" "}
      para ver o catálogo completo.
    </p>
  );
}
