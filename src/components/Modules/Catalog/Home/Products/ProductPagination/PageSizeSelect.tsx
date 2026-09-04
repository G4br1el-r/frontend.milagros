"use client";

import { useId } from "react";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { PRODUCTS_PER_PAGE_OPTIONS } from "../product.constants";

export function PageSizeSelect() {
  const id = useId();
  const { pageSize, setPageSize } = useProductFiltersUrl();

  return (
    <label
      htmlFor={id}
      className="flex shrink-0 items-center gap-2 text-sm text-primary/55"
    >
      Por página
      <select
        id={id}
        value={pageSize}
        onChange={(event) => setPageSize(Number(event.target.value))}
        className="rounded-full border border-primary/15 bg-white px-3 py-1.5 text-sm text-primary focus:outline-none"
      >
        {PRODUCTS_PER_PAGE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
