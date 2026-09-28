import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { CategoriaFiltroDto } from "./filters.types";
import { useCategoryTree } from "./use-category-tree";

const categoriesMock = vi.hoisted(() => ({
  data: [] as CategoriaFiltroDto[],
}));
vi.mock("./use-filter-options", () => ({
  useProductCategories: () => ({
    data: categoriesMock.data,
    isLoading: false,
  }),
}));

function makeCategoria(
  overrides: Partial<CategoriaFiltroDto> = {},
): CategoriaFiltroDto {
  return {
    id: 1,
    nome: "Categoria",
    isPrincipal: true,
    categoriaPaiId: null,
    categoriaPaiNome: null,
    totalProdutos: 10,
    subcategorias: [],
    ...overrides,
  };
}

describe("useCategoryTree", () => {
  it("remove categorias principais sem produto", () => {
    categoriesMock.data = [
      makeCategoria({ id: 1, nome: "Com produto", totalProdutos: 5 }),
      makeCategoria({ id: 2, nome: "Vazia", totalProdutos: 0 }),
    ];
    const { result } = renderHook(() => useCategoryTree());
    expect(result.current.principais.map((item) => item.nome)).toEqual([
      "Com produto",
    ]);
  });

  it("mantem o pai zerado quando alguma subcategoria tem produto", () => {
    categoriesMock.data = [
      makeCategoria({
        id: 1,
        nome: "Pai zerado",
        totalProdutos: 0,
        subcategorias: [
          makeCategoria({
            id: 2,
            nome: "Filha cheia",
            isPrincipal: false,
            totalProdutos: 7,
          }),
        ],
      }),
    ];
    const { result } = renderHook(() => useCategoryTree());
    expect(result.current.principais).toHaveLength(1);
    expect(result.current.principais[0].subcategorias).toHaveLength(1);
  });

  it("remove subcategorias sem produto", () => {
    categoriesMock.data = [
      makeCategoria({
        id: 1,
        nome: "Pai",
        totalProdutos: 9,
        subcategorias: [
          makeCategoria({
            id: 2,
            nome: "Cheia",
            isPrincipal: false,
            totalProdutos: 3,
          }),
          makeCategoria({
            id: 3,
            nome: "Vazia",
            isPrincipal: false,
            totalProdutos: 0,
          }),
        ],
      }),
    ];
    const { result } = renderHook(() => useCategoryTree());
    expect(
      result.current.principais[0].subcategorias.map((item) => item.nome),
    ).toEqual(["Cheia"]);
  });

  it("ignora categorias que nao sao principais", () => {
    categoriesMock.data = [
      makeCategoria({ id: 1, nome: "Principal" }),
      makeCategoria({ id: 2, nome: "Filha solta", isPrincipal: false }),
    ];
    const { result } = renderHook(() => useCategoryTree());
    expect(result.current.principais.map((item) => item.nome)).toEqual([
      "Principal",
    ]);
  });
});
