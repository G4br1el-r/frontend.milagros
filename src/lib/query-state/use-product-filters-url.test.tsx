import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_PRODUCTS_PER_PAGE } from "@/components/Modules/Catalog/Home/Products/product.constants";
import { DEFAULT_PAGE } from "./url-params.constants";
import { useProductFiltersUrl } from "./use-product-filters-url";

const navigation = vi.hoisted(() => ({ pathname: "/produtos", search: "" }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
  useSearchParams: () => new URLSearchParams(navigation.search),
}));

const PATHNAME = "/produtos";

function renderFilters(search: string) {
  navigation.search = search;
  return renderHook(() => useProductFiltersUrl());
}

function pushStateSpy() {
  return vi.mocked(window.history.pushState);
}

function lastUrl(): unknown {
  return pushStateSpy().mock.lastCall?.[2];
}

describe("useProductFiltersUrl", () => {
  beforeEach(() => {
    navigation.pathname = PATHNAME;
    navigation.search = "";
    vi.spyOn(window.history, "pushState").mockImplementation(() => {});
  });

  it("le os filtros da URL", () => {
    const { result } = renderFilters("q=vela&letra=V&pagina=2");
    expect(result.current.termo).toBe("vela");
    expect(result.current.letra).toBe("V");
    expect(result.current.categoria).toBeNull();
    expect(result.current.page).toBe(2);
    expect(result.current.pageSize).toBe(DEFAULT_PRODUCTS_PER_PAGE);
  });

  it("usa pagina padrao sem parametro", () => {
    const { result } = renderFilters("");
    expect(result.current.page).toBe(DEFAULT_PAGE);
  });

  it("seleciona letra e volta para a primeira pagina", () => {
    const { result } = renderFilters("letra=A&pagina=3");
    act(() => {
      result.current.setLetra("B");
    });
    expect(pushStateSpy()).toHaveBeenCalledWith(
      null,
      "",
      `${PATHNAME}?letra=B`,
    );
  });

  it("desmarca a letra ja selecionada", () => {
    const { result } = renderFilters("letra=A");
    act(() => {
      result.current.setLetra("A");
    });
    expect(lastUrl()).toBe(PATHNAME);
  });

  it("mantem a categoria ao clicar na que ja esta ativa", () => {
    const { result } = renderFilters("categoria=Velas");
    act(() => {
      result.current.setCategoria("Velas");
    });
    expect(lastUrl()).toBe(`${PATHNAME}?categoria=Velas`);
    act(() => {
      result.current.setCategoria("Incensos");
    });
    expect(lastUrl()).toBe(`${PATHNAME}?categoria=Incensos`);
  });

  it("limpa a categoria quando recebe null", () => {
    const { result } = renderFilters("categoria=Velas");
    act(() => {
      result.current.setCategoria(null);
    });
    expect(lastUrl()).toBe(PATHNAME);
  });

  it("setTermo limpa letra, categoria, preco e pagina", () => {
    const { result } = renderFilters(
      "letra=A&categoria=Velas&precoMin=10&precoMax=50&porPagina=36&pagina=2",
    );
    act(() => {
      result.current.setTermo("vela");
    });
    expect(lastUrl()).toBe(`${PATHNAME}?porPagina=36&q=vela`);
  });

  it("setTermo vazio remove o termo", () => {
    const { result } = renderFilters("q=vela");
    act(() => {
      result.current.setTermo("");
    });
    expect(lastUrl()).toBe(PATHNAME);
  });

  it("setPage(1) remove o parametro de pagina", () => {
    const { result } = renderFilters("q=vela&pagina=3");
    act(() => {
      result.current.setPage(1);
    });
    expect(lastUrl()).toBe(`${PATHNAME}?q=vela`);
  });

  it("setPage mantem os filtros e grava a pagina", () => {
    const { result } = renderFilters("q=vela&pagina=3");
    act(() => {
      result.current.setPage(4);
    });
    expect(lastUrl()).toBe(`${PATHNAME}?q=vela&pagina=4`);
  });

  it("setPrecoRange volta para a primeira pagina", () => {
    const { result } = renderFilters("pagina=2");
    act(() => {
      result.current.setPrecoRange(10, 50);
    });
    expect(lastUrl()).toBe(`${PATHNAME}?precoMin=10&precoMax=50`);
  });

  it("setPageSize volta para a primeira pagina", () => {
    const { result } = renderFilters("q=vela&pagina=5");
    act(() => {
      result.current.setPageSize(36);
    });
    expect(lastUrl()).toBe(`${PATHNAME}?q=vela&porPagina=36`);
  });

  it("reset remove todos os parametros", () => {
    const { result } = renderFilters("q=vela&letra=A&pagina=2");
    act(() => {
      result.current.reset();
    });
    expect(pushStateSpy()).toHaveBeenCalledWith(null, "", PATHNAME);
  });

  it("mantem a subcategoria ao clicar na que ja esta ativa", () => {
    const { result } = renderFilters("subcategoria=Linha METAL");
    act(() => {
      result.current.setSubcategoria("Linha METAL");
    });
    expect(lastUrl()).toBe(`${PATHNAME}?subcategoria=Linha+METAL`);
    act(() => {
      result.current.setSubcategoria("Linha BOWL");
    });
    expect(lastUrl()).toBe(`${PATHNAME}?subcategoria=Linha+BOWL`);
  });

  it("volta do filho para o pai sem deixar subcategoria orfa", () => {
    const { result } = renderFilters("subcategoria=Linha METAL");
    act(() => {
      result.current.setCategoria("Incensarios");
    });
    const params = new URLSearchParams(String(lastUrl()).split("?")[1]);
    expect(params.get("categoria")).toBe("Incensarios");
    expect(params.get("subcategoria")).toBeNull();
  });

  it("setCategoria limpa a subcategoria selecionada", () => {
    const { result } = renderFilters("subcategoria=Linha METAL");
    act(() => {
      result.current.setCategoria("Incensos");
    });
    expect(lastUrl()).toBe(`${PATHNAME}?categoria=Incensos`);
  });

  it("setSubcategoria limpa a categoria selecionada", () => {
    const { result } = renderFilters("categoria=Incensarios");
    act(() => {
      result.current.setSubcategoria("Linha METAL");
    });
    expect(lastUrl()).toBe(`${PATHNAME}?subcategoria=Linha+METAL`);
  });

  it("preserva letra e preco ao trocar a categoria", () => {
    const { result } = renderFilters("letra=C&precoMin=10&precoMax=90");
    act(() => {
      result.current.setCategoria("Incensos");
    });
    const params = new URLSearchParams(String(lastUrl()).split("?")[1]);
    expect(params.get("letra")).toBe("C");
    expect(params.get("precoMin")).toBe("10");
    expect(params.get("categoria")).toBe("Incensos");
  });

  it("volta para a primeira pagina ao trocar de subcategoria", () => {
    const { result } = renderFilters("subcategoria=Linha BOWL&pagina=5");
    act(() => {
      result.current.setSubcategoria("Linha METAL");
    });
    const params = new URLSearchParams(String(lastUrl()).split("?")[1]);
    expect(params.get("pagina")).toBeNull();
  });

  it("setTermo limpa tambem a subcategoria", () => {
    const { result } = renderFilters("categoria=Incensos&subcategoria=Mirra");
    act(() => {
      result.current.setTermo("vela");
    });
    const params = new URLSearchParams(String(lastUrl()).split("?")[1]);
    expect(params.get("categoria")).toBeNull();
    expect(params.get("subcategoria")).toBeNull();
    expect(params.get("q")).toBe("vela");
  });

  it("trocar de pagina preserva os filtros ativos", () => {
    const { result } = renderFilters(
      "q=incenso&subcategoria=Mirra&precoMin=10",
    );
    act(() => {
      result.current.setPage(3);
    });
    const params = new URLSearchParams(String(lastUrl()).split("?")[1]);
    expect(params.get("pagina")).toBe("3");
    expect(params.get("subcategoria")).toBe("Mirra");
    expect(params.get("precoMin")).toBe("10");
  });
});
