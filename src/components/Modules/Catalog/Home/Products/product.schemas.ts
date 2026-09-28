import { z } from "zod";
import type { ProductSearchFilters } from "./ProductFilters/filters.types";
import { MAX_PRODUCTS_PER_PAGE } from "./product.constants";

const optionalQueryText = z.string().optional();
const optionalQueryPrice = z.coerce.number().nonnegative().optional();
export const productSearchQuerySchema = z
  .object({
    Termo: optionalQueryText,
    Letra: optionalQueryText,
    Categoria: optionalQueryText,
    Subcategoria: optionalQueryText,
    PrecoMin: optionalQueryPrice,
    PrecoMax: optionalQueryPrice,
    Page: z.coerce.number().int().positive().optional(),
    PageSize: z.coerce
      .number()
      .int()
      .positive()
      .transform((value) => Math.min(value, MAX_PRODUCTS_PER_PAGE))
      .optional(),
  })
  .transform(
    (query): ProductSearchFilters => ({
      termo: query.Termo,
      letra: query.Letra,
      categoria: query.Categoria,
      subcategoria: query.Subcategoria,
      precoMin: query.PrecoMin,
      precoMax: query.PrecoMax,
      page: query.Page,
      pageSize: query.PageSize,
    }),
  );
