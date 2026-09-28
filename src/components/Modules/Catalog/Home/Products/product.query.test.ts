import { describe, expect, it } from "vitest";
import {
  buildProductSearchQuery,
  productSearchHasTerms,
} from "./product.query";

describe("buildProductSearchQuery", () => {
  it("envia a categoria como parametro Categoria", () => {
    const query = buildProductSearchQuery({ categoria: "Incensos" });
    expect(new URLSearchParams(query).get("Categoria")).toBe("Incensos");
  });

  it("envia a subcategoria como parametro Subcategoria", () => {
    const query = buildProductSearchQuery({ subcategoria: "Linha METAL" });
    const params = new URLSearchParams(query);
    expect(params.get("Subcategoria")).toBe("Linha METAL");
    expect(params.get("Categoria")).toBeNull();
  });

  it("omite filtros vazios", () => {
    expect(buildProductSearchQuery({})).toBe("");
  });
});

describe("productSearchHasTerms", () => {
  it("considera a subcategoria como filtro ativo", () => {
    expect(productSearchHasTerms({ subcategoria: "Linha BOWL" })).toBe(true);
  });

  it("retorna falso sem nenhum filtro", () => {
    expect(productSearchHasTerms({})).toBe(false);
  });
});
