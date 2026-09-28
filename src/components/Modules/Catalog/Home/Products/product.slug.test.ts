import { describe, expect, it } from "vitest";
import {
  buildProductSlug,
  parseProductSlug,
  slugifyName,
} from "./product.slug";

describe("slugifyName", () => {
  it("remove acentos, simbolos e hifens nas bordas", () => {
    expect(slugifyName("  Vela Aromática & Incenso!  ")).toBe(
      "vela-aromatica-incenso",
    );
  });
});

describe("buildProductSlug", () => {
  it("junta nome e codigo com separador", () => {
    expect(buildProductSlug("Vela Aromática", "123")).toBe(
      "vela-aromatica--123",
    );
  });

  it("usa apenas o codigo quando o nome nao gera slug", () => {
    expect(buildProductSlug("!!!", "123")).toBe("123");
  });
});

describe("parseProductSlug", () => {
  it("extrai o codigo apos o ultimo separador", () => {
    expect(parseProductSlug("vela-aromatica--123")).toBe("123");
  });

  it("retorna o proprio valor quando nao ha separador", () => {
    expect(parseProductSlug("123")).toBe("123");
  });

  it("faz o caminho inverso de buildProductSlug com codigo codificado", () => {
    expect(parseProductSlug(buildProductSlug("Vela", "A/B 1"))).toBe("A/B 1");
  });

  it("retorna null para slug com codificacao malformada", () => {
    expect(parseProductSlug("vela--%E0%A4%A")).toBeNull();
    expect(parseProductSlug("%")).toBeNull();
  });
});
