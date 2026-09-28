import { describe, expect, it } from "vitest";
import { DEFAULT_PRODUCTS_PER_PAGE } from "@/components/Modules/Catalog/Home/Products/product.constants";
import {
  readProductFiltersParams,
  toProductSearchFilters,
} from "./product-filters-params";
import { DEFAULT_PAGE } from "./url-params.constants";

describe("readProductFiltersParams", () => {
  it("aplica valores padrao quando a URL nao tem filtros", () => {
    expect(readProductFiltersParams(new URLSearchParams())).toEqual({
      termo: "",
      letra: null,
      categoria: null,
      subcategoria: null,
      precoMin: undefined,
      precoMax: undefined,
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PRODUCTS_PER_PAGE,
    });
  });

  it("le todos os filtros da URL", () => {
    const params = new URLSearchParams(
      "q=vela&letra=V&categoria=Velas&precoMin=10&precoMax=99.9&pagina=3&porPagina=36",
    );
    expect(readProductFiltersParams(params)).toEqual({
      termo: "vela",
      letra: "V",
      categoria: "Velas",
      subcategoria: null,
      precoMin: 10,
      precoMax: 99.9,
      page: 3,
      pageSize: 36,
    });
  });

  it("descarta numeros invalidos e volta aos padroes de paginacao", () => {
    const params = new URLSearchParams(
      "precoMin=abc&precoMax=Infinity&pagina=xyz&porPagina=NaN",
    );
    const result = readProductFiltersParams(params);
    expect(result.precoMin).toBeUndefined();
    expect(result.precoMax).toBeUndefined();
    expect(result.page).toBe(DEFAULT_PAGE);
    expect(result.pageSize).toBe(DEFAULT_PRODUCTS_PER_PAGE);
  });
});

describe("toProductSearchFilters", () => {
  it("converte termo vazio e filtros nulos em undefined", () => {
    const params = readProductFiltersParams(new URLSearchParams());
    expect(toProductSearchFilters(params)).toEqual({
      termo: undefined,
      letra: undefined,
      categoria: undefined,
      subcategoria: undefined,
      precoMin: undefined,
      precoMax: undefined,
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PRODUCTS_PER_PAGE,
    });
  });

  it("repassa os filtros preenchidos e a pagina", () => {
    const query = "q=incenso&letra=I&categoria=Incensos&precoMin=5&pagina=2";
    const params = readProductFiltersParams(new URLSearchParams(query));
    expect(toProductSearchFilters(params)).toEqual({
      termo: "incenso",
      letra: "I",
      categoria: "Incensos",
      subcategoria: undefined,
      precoMin: 5,
      precoMax: undefined,
      page: 2,
      pageSize: DEFAULT_PRODUCTS_PER_PAGE,
    });
  });
});

describe("subcategoria", () => {
  it("le a subcategoria da URL", () => {
    const params = new URLSearchParams("subcategoria=Linha%20METAL");
    expect(readProductFiltersParams(params).subcategoria).toBe("Linha METAL");
  });

  it("repassa a subcategoria para os filtros de busca", () => {
    const params = readProductFiltersParams(
      new URLSearchParams("subcategoria=Alleluia!%20Premium"),
    );
    expect(toProductSearchFilters(params).subcategoria).toBe(
      "Alleluia! Premium",
    );
  });
});
