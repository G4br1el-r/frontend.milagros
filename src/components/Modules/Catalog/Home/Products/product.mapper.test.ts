import { describe, expect, it } from "vitest";
import { makeProdutoDto, makeVariacaoDto } from "@/test/fixtures";
import { mapProdutoToProduct } from "./product.mapper";

describe("mapProdutoToProduct", () => {
  it("produto sem variacao mantem preco e precoDe do DTO", () => {
    const product = mapProdutoToProduct(
      makeProdutoDto({ codigoOmie: "VELA1", preco: 10, precoDe: 12 }),
    );
    expect(product.id).toBe("VELA1");
    expect(product.price).toBe(10);
    expect(product.compareAtPrice).toBe(12);
    expect(product.variants).toEqual([]);
    expect(product.variantLabel).toBeNull();
  });

  it("aceita variacoes nulas", () => {
    const product = mapProdutoToProduct(makeProdutoDto({ variacoes: null }));
    expect(product.variants).toEqual([]);
  });

  it("produto pai usa o preco da variacao mais barata", () => {
    const product = mapProdutoToProduct(
      makeProdutoDto({
        preco: 99,
        precoDe: 150,
        variacoes: [
          makeVariacaoDto({ codigoOmie: "G", nome: "300g", preco: 135.15 }),
          makeVariacaoDto({
            codigoOmie: "P",
            nome: "50g",
            preco: 29.68,
            precoDe: 35,
          }),
        ],
      }),
    );
    expect(product.price).toBe(29.68);
    expect(product.compareAtPrice).toBe(35);
    expect(product.variantLabel).toBe("Embalagem");
    expect(product.variants.map((variant) => variant.id)).toEqual(["P", "G"]);
  });
});
