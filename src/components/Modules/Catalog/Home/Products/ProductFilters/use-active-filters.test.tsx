import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  useActiveFilterCount,
  useRefinementFilterCount,
} from "./use-active-filters";

const navigation = vi.hoisted(() => ({ pathname: "/", search: "" }));
vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
  useSearchParams: () => new URLSearchParams(navigation.search),
}));

function countFor(search: string): number {
  navigation.search = search;
  return renderHook(() => useActiveFilterCount()).result.current;
}

describe("useActiveFilterCount", () => {
  beforeEach(() => {
    navigation.search = "";
  });

  it("nao conta nada sem filtros", () => {
    expect(countFor("")).toBe(0);
  });

  it("ignora paginacao e itens por pagina", () => {
    expect(countFor("pagina=3&porPagina=36")).toBe(0);
  });

  it("conta cada filtro ativo", () => {
    expect(countFor("q=incenso")).toBe(1);
    expect(countFor("letra=B")).toBe(1);
    expect(countFor("categoria=Incensos")).toBe(1);
    expect(countFor("subcategoria=Mirra")).toBe(1);
  });

  it("conta a faixa de preco como um filtro so", () => {
    expect(countFor("precoMin=10&precoMax=90")).toBe(1);
    expect(countFor("precoMin=10")).toBe(1);
    expect(countFor("precoMax=90")).toBe(1);
  });

  it("soma filtros combinados", () => {
    expect(countFor("q=incenso&letra=I&subcategoria=Mirra&precoMin=10")).toBe(
      4,
    );
  });
});

describe("useRefinementFilterCount", () => {
  beforeEach(() => {
    navigation.search = "";
  });

  function refinementCountFor(search: string): number {
    navigation.search = search;
    return renderHook(() => useRefinementFilterCount()).result.current;
  }

  it("ignora categoria e subcategoria", () => {
    expect(refinementCountFor("categoria=Incensos&subcategoria=Mirra")).toBe(0);
  });

  it("conta apenas letra e faixa de preco", () => {
    expect(refinementCountFor("letra=B&precoMin=10&precoMax=90")).toBe(2);
  });
});
