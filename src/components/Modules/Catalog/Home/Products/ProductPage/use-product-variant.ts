"use client";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { VARIANT_QUERY_PARAM } from "../product.constants";
import type { Product } from "../product.types";
import { findVariant, getDefaultVariant } from "../product.variants";

function syncVariantInUrl(variantId: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(VARIANT_QUERY_PARAM, variantId);
  window.history.replaceState(null, "", url);
}
export function useProductVariant(product: Product) {
  const searchParams = useSearchParams();
  const selectedVariant =
    findVariant(product, searchParams.get(VARIANT_QUERY_PARAM)) ??
    getDefaultVariant(product);
  const selectVariant = useCallback(
    (variantId: string) => {
      if (findVariant(product, variantId)) syncVariantInUrl(variantId);
    },
    [product],
  );
  return { selectedVariant, selectVariant };
}
