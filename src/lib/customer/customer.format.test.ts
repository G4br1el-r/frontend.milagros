import { describe, expect, it } from "vitest";
import { VALID_CNPJ, VALID_CPF } from "@/test/fixtures";
import { documentMaskPattern, formatDocument } from "./customer.format";

const CPF_MASK = "000.000.000-00";
const CNPJ_MASK = "00.000.000/0000-00";

describe("formatDocument", () => {
  it("formata CPF sem mascara", () => {
    expect(formatDocument(VALID_CPF)).toBe("529.982.247-25");
  });

  it("formata CNPJ sem mascara", () => {
    expect(formatDocument(VALID_CNPJ)).toBe("54.550.752/0001-55");
  });

  it("mantem documento ja formatado", () => {
    expect(formatDocument("529.982.247-25")).toBe("529.982.247-25");
    expect(formatDocument("54.550.752/0001-55")).toBe("54.550.752/0001-55");
  });

  it("devolve o valor original quando o tamanho nao e de CPF nem CNPJ", () => {
    expect(formatDocument("123.45")).toBe("123.45");
    expect(formatDocument("")).toBe("");
  });
});

describe("documentMaskPattern", () => {
  it("usa mascara de CPF ate 11 digitos", () => {
    expect(documentMaskPattern("")).toBe(CPF_MASK);
    expect(documentMaskPattern("123")).toBe(CPF_MASK);
    expect(documentMaskPattern(VALID_CPF)).toBe(CPF_MASK);
    expect(documentMaskPattern("529.982.247-25")).toBe(CPF_MASK);
  });

  it("usa mascara de CNPJ acima de 11 digitos", () => {
    expect(documentMaskPattern("529982247251")).toBe(CNPJ_MASK);
    expect(documentMaskPattern(VALID_CNPJ)).toBe(CNPJ_MASK);
    expect(documentMaskPattern("54.550.752/0001-55")).toBe(CNPJ_MASK);
  });
});
