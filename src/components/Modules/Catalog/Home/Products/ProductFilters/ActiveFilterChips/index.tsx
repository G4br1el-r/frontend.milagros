"use client";

import { X } from "lucide-react";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { formatPrice } from "../../product.types";

interface Chip {
  key: string;
  label: string;
  onRemove: () => void;
}

/**
 * Filtro aplicado tem que aparecer fora do drawer como chip removível
 * individualmente (seção 3) — sem isso, o único jeito de saber "por que
 * estou vendo esses produtos" é abrir o drawer de novo, ou limpar tudo.
 */
export function ActiveFilterChips() {
  const {
    termo,
    letra,
    categoria,
    precoMin,
    precoMax,
    setTermo,
    setLetra,
    setCategoria,
    setPrecoRange,
  } = useProductFiltersUrl();

  const chips: Chip[] = [];

  if (termo) {
    chips.push({
      key: "termo",
      label: `"${termo}"`,
      onRemove: () => setTermo(""),
    });
  }

  if (letra) {
    chips.push({
      key: "letra",
      label: `Letra ${letra}`,
      onRemove: () => setLetra(null),
    });
  }

  if (categoria) {
    chips.push({
      key: "categoria",
      label: categoria,
      onRemove: () => setCategoria(null),
    });
  }

  if (precoMin !== undefined || precoMax !== undefined) {
    const min = precoMin !== undefined ? formatPrice(precoMin) : null;
    const max = precoMax !== undefined ? formatPrice(precoMax) : null;
    const label =
      min && max ? `${min} – ${max}` : min ? `Acima de ${min}` : `Até ${max}`;

    chips.push({
      key: "preco",
      label,
      onRemove: () => setPrecoRange(undefined, undefined),
    });
  }

  if (chips.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-2 px-3 sm:px-4">
      {chips.map((chip) => (
        <li key={chip.key}>
          <button
            type="button"
            onClick={chip.onRemove}
            aria-label={`Remover filtro ${chip.label}`}
            className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-primary/15 bg-white py-1.5 pr-2.5 pl-3.5 text-xs font-medium text-primary transition-colors duration-200 hover:border-terracotta/50"
          >
            <span aria-hidden="true">{chip.label}</span>
            <X
              className="size-3.5 text-primary/40 transition-colors duration-200 group-hover:text-terracotta"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
