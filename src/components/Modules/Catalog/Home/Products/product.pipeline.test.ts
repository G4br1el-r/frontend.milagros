import { describe, expect, it } from "vitest";
import { buildProductSearchQuery } from "@/components/Modules/Catalog/Home/Products/product.query";
import { productSearchQuerySchema } from "@/components/Modules/Catalog/Home/Products/product.schemas";
import {
  readProductFiltersParams,
  toProductSearchFilters,
} from "@/lib/query-state/product-filters-params";

// simula: URL do browser -> filtros -> query do client -> schema da rota -> query upstream
function pipeline(browserSearch: string): string {
  const filters = toProductSearchFilters(
    readProductFiltersParams(new URLSearchParams(browserSearch)),
  );
  const clientQuery = buildProductSearchQuery(filters);
  const parsed = productSearchQuerySchema.parse(
    Object.fromEntries(new URLSearchParams(clientQuery).entries()),
  );
  return buildProductSearchQuery(parsed);
}

describe("pipeline completo do filtro", () => {
  it("pai: leva Categoria ate o upstream", () => {
    const up = new URLSearchParams(pipeline("categoria=Incensos"));
    expect(up.get("Categoria")).toBe("Incensos");
    expect(up.get("Subcategoria")).toBeNull();
  });

  it("filho: leva Subcategoria ate o upstream", () => {
    const up = new URLSearchParams(pipeline("subcategoria=Mirra"));
    expect(up.get("Subcategoria")).toBe("Mirra");
    expect(up.get("Categoria")).toBeNull();
  });

  it("volta ao pai: nao sobra subcategoria orfa", () => {
    const up = new URLSearchParams(pipeline("categoria=Incensos"));
    expect(up.get("Categoria")).toBe("Incensos");
    expect(up.get("Subcategoria")).toBeNull();
  });

  it("sem filtro nenhum nao inventa parametro", () => {
    const up = new URLSearchParams(pipeline(""));
    expect(up.get("Categoria")).toBeNull();
    expect(up.get("Subcategoria")).toBeNull();
  });
});
