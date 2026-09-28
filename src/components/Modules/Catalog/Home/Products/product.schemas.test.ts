import { describe, expect, it } from "vitest";
import { buildProductSearchQuery } from "./product.query";
import { productSearchQuerySchema } from "./product.schemas";

describe("productSearchQuerySchema", () => {
  it("preserva a subcategoria vinda da query", () => {
    const params = new URLSearchParams({ Subcategoria: "Linha CERÂMICA" });
    const parsed = productSearchQuerySchema.parse(
      Object.fromEntries(params.entries()),
    );
    expect(parsed.subcategoria).toBe("Linha CERÂMICA");
  });

  it("preserva categoria e subcategoria juntas", () => {
    const parsed = productSearchQuerySchema.parse({
      Categoria: "Incensos",
      Subcategoria: "Mirra",
    });
    expect(parsed.categoria).toBe("Incensos");
    expect(parsed.subcategoria).toBe("Mirra");
  });

  it("faz a volta completa: query montada sobrevive ao parse", () => {
    const query = buildProductSearchQuery({
      subcategoria: "Beata Nhá Chica",
      page: 2,
      pageSize: 24,
    });
    const parsed = productSearchQuerySchema.parse(
      Object.fromEntries(new URLSearchParams(query).entries()),
    );
    expect(parsed.subcategoria).toBe("Beata Nhá Chica");
    expect(buildProductSearchQuery(parsed)).toContain(
      "Subcategoria=Beata+Nh%C3%A1+Chica",
    );
  });

  it("mantem os demais filtros na volta completa", () => {
    const query = buildProductSearchQuery({
      termo: "incenso",
      letra: "I",
      categoria: "Incensos",
      precoMin: 10,
      precoMax: 90,
    });
    const parsed = productSearchQuerySchema.parse(
      Object.fromEntries(new URLSearchParams(query).entries()),
    );
    expect(parsed).toMatchObject({
      termo: "incenso",
      letra: "I",
      categoria: "Incensos",
      precoMin: 10,
      precoMax: 90,
    });
  });
});
