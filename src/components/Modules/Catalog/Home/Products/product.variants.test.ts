import { describe, expect, it } from "vitest";
import { makeProdutoDto, makeVariacaoDto } from "@/test/fixtures";
import { mapProdutoToProduct } from "./product.mapper";
import {
  buildProductHref,
  findVariant,
  getDefaultVariant,
  getPriceRange,
  getVariantLabel,
  hasVariants,
  mapVariants,
  toCartProduct,
} from "./product.variants";

const BARRICA_50 = makeVariacaoDto({
  id: "v50",
  codigoOmie: "BYZi05B",
  nome: "Barrica de 50g",
  preco: 36.25,
});
const BARRICA_125 = makeVariacaoDto({
  id: "v125",
  codigoOmie: "BYZi12B",
  nome: "Barrica de 125g",
  preco: 82.42,
});
const BARRICA_300 = makeVariacaoDto({
  id: "v300",
  codigoOmie: "BYZi30B",
  nome: "Barrica de 300g",
  preco: 179.77,
});

function makeParentProduct() {
  return mapProdutoToProduct(
    makeProdutoDto({ variacoes: [BARRICA_300, BARRICA_125, BARRICA_50] }),
  );
}

describe("mapVariants", () => {
  it("ordena por preco crescente usando o codigo omie como id", () => {
    expect(
      mapVariants([BARRICA_300, BARRICA_50, BARRICA_125]).map((v) => v.id),
    ).toEqual(["BYZi05B", "BYZi12B", "BYZi30B"]);
  });

  it("desempata pelo nome quando o preco e igual", () => {
    const variants = mapVariants([
      makeVariacaoDto({ codigoOmie: "M", nome: "Marrom", preco: 49.78 }),
      makeVariacaoDto({ codigoOmie: "A", nome: "Azul", preco: 49.78 }),
    ]);
    expect(variants.map((v) => v.name)).toEqual(["Azul", "Marrom"]);
  });

  it("descarta variacoes inativas ou sem preco", () => {
    const variants = mapVariants([
      BARRICA_50,
      makeVariacaoDto({ codigoOmie: "INATIVA", ativo: false }),
      makeVariacaoDto({ codigoOmie: "ZERO", preco: 0 }),
    ]);
    expect(variants.map((v) => v.id)).toEqual(["BYZi05B"]);
  });

  it("aceita lista nula", () => {
    expect(mapVariants(null)).toEqual([]);
  });

  it("so considera preco de comparacao maior que o preco", () => {
    const [cheaper, higher] = mapVariants([
      makeVariacaoDto({ codigoOmie: "A", preco: 10, precoDe: 8 }),
      makeVariacaoDto({ codigoOmie: "B", preco: 20, precoDe: 25 }),
    ]);
    expect(cheaper.compareAtPrice).toBeNull();
    expect(higher.compareAtPrice).toBe(25);
  });

  it("remove espacos do nome", () => {
    const [variant] = mapVariants([makeVariacaoDto({ nome: "  Azul " })]);
    expect(variant.name).toBe("Azul");
  });
});

describe("getVariantLabel", () => {
  it("usa Embalagem quando todas sao embalagem", () => {
    expect(getVariantLabel(mapVariants([BARRICA_50, BARRICA_300]))).toBe(
      "Embalagem",
    );
  });

  it("usa Cor quando todas sao opcao", () => {
    const variants = mapVariants([
      makeVariacaoDto({ codigoOmie: "A", nome: "Azul", tipoVariacao: "Opção" }),
      makeVariacaoDto({
        codigoOmie: "B",
        nome: "Creme",
        tipoVariacao: "Opção",
      }),
    ]);
    expect(getVariantLabel(variants)).toBe("Cor");
  });

  it("usa Opção quando os tipos se misturam", () => {
    const variants = mapVariants([
      BARRICA_50,
      makeVariacaoDto({
        codigoOmie: "K",
        nome: "Mini kit",
        tipoVariacao: "Opção",
      }),
    ]);
    expect(getVariantLabel(variants)).toBe("Opção");
  });

  it("retorna null sem variacoes", () => {
    expect(getVariantLabel([])).toBeNull();
  });
});

describe("selecao de variacao", () => {
  it("a padrao e a mais barata", () => {
    expect(getDefaultVariant(makeParentProduct())?.id).toBe("BYZi05B");
  });

  it("encontra a variacao pelo codigo", () => {
    const product = makeParentProduct();
    expect(findVariant(product, "BYZi30B")?.price).toBe(179.77);
    expect(findVariant(product, "PAI-1-GREGO-BYZANTINE-INTENSO")).toBeNull();
    expect(findVariant(product, null)).toBeNull();
  });

  it("calcula a faixa de preco", () => {
    expect(getPriceRange(makeParentProduct())).toEqual({
      min: 36.25,
      max: 179.77,
    });
  });

  it("produto sem variacao usa o proprio preco", () => {
    const product = mapProdutoToProduct(makeProdutoDto({ preco: 12 }));
    expect(hasVariants(product)).toBe(false);
    expect(getDefaultVariant(product)).toBeNull();
    expect(getPriceRange(product)).toEqual({ min: 12, max: 12 });
  });
});

describe("toCartProduct", () => {
  it("usa o codigo e o preco da variacao, guardando o pai", () => {
    const product = makeParentProduct();
    expect(toCartProduct(product, findVariant(product, "BYZi30B"))).toEqual({
      id: "BYZi30B",
      productId: "PAI-1-GREGO-BYZANTINE-INTENSO",
      name: "#1 GREGO BYZANTINE INTENSO",
      variantName: "Barrica de 300g",
      image: "https://cdn.example.com/byzantine.png",
      price: 179.77,
    });
  });

  it("produto simples continua com o proprio codigo", () => {
    const product = mapProdutoToProduct(
      makeProdutoDto({ codigoOmie: "VELA1", nome: "Vela", preco: 9.9 }),
    );
    expect(toCartProduct(product, null)).toMatchObject({
      id: "VELA1",
      productId: "VELA1",
      variantName: null,
      price: 9.9,
    });
  });
});

describe("buildProductHref", () => {
  it("monta o link do produto sem variacao", () => {
    expect(buildProductHref("Vela Azul", "VELA1")).toBe(
      "/produtos/vela-azul--VELA1",
    );
  });

  it("adiciona a variacao na query", () => {
    expect(buildProductHref("#1 GREGO", "PAI-1-GREGO", "BYZi30B")).toBe(
      "/produtos/1-grego--PAI-1-GREGO?variacao=BYZi30B",
    );
  });

  it("ignora a variacao quando ela e o proprio produto", () => {
    expect(buildProductHref("Vela", "VELA1", "VELA1")).toBe(
      "/produtos/vela--VELA1",
    );
  });
});
