import { SearchX } from "lucide-react";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { appToast } from "@/lib/toast/toast";
export function ProductEmptyState() {
  const { termo, letra, categoria, precoMin, precoMax, reset } =
    useProductFiltersUrl();
  const hasPriceFilter = precoMin !== undefined || precoMax !== undefined;
  const description = termo
    ? `Nenhum resultado para "${termo}". Tente um termo mais curto ou busque por categoria.`
    : hasPriceFilter
      ? "Nenhum produto nessa faixa de preço. Limpar a faixa de preço costuma resolver."
      : letra || categoria
        ? "Nenhum produto com esses filtros. Tente outra letra ou categoria."
        : "Nenhum produto encontrado.";
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
        <p className="max-w-sm text-sm text-primary/60">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          reset();
          appToast.filtersCleared();
        }}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-cream transition-colors duration-200 hover:bg-primary-darkest focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        Limpar filtros
      </button>
    </div>
  );
}
