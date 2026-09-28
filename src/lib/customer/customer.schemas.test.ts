import { cpf } from "cpf-cnpj-validator";
import { describe, expect, it } from "vitest";
import { VALID_CNPJ } from "@/test/fixtures";
import {
  COMPLEMENTO_MAX_LENGTH,
  CPF_LENGTH,
  UF_LENGTH,
} from "./customer.constants";
import {
  customerCreateRequestSchema,
  customerFormSchema,
  customerUpdateRequestSchema,
  documentSchema,
} from "./customer.schemas";

const FORMATTED_CNPJ = "54.550.752/0001-55";

function withWrongLastDigit(document: string): string {
  const lastDigit = Number(document.slice(-1));
  return `${document.slice(0, -1)}${(lastDigit + 1) % 10}`;
}

function documentMessages(value: string): string[] {
  const result = documentSchema.safeParse(value);
  expect(result.success).toBe(false);
  return result.error?.issues.map((issue) => issue.message) ?? [];
}

function buildValidForm() {
  return {
    cpfCnpj: cpf.generate(),
    nomeRazaoSocial: "Maria da Silva",
    email: "maria@example.com",
    telefone: "(11) 98765-4321",
    cep: "01310-100",
    logradouro: "Avenida Paulista",
    numero: "1000",
    complemento: "Apto 12",
    bairro: "Bela Vista",
    cidade: "Sao Paulo",
    uf: "SP",
  };
}

function formMessages(overrides: Record<string, unknown>): string[] {
  const result = customerFormSchema.safeParse({
    ...buildValidForm(),
    ...overrides,
  });
  expect(result.success).toBe(false);
  return result.error?.issues.map((issue) => issue.message) ?? [];
}

describe("documentSchema", () => {
  it("aceita CPF valido sem mascara", () => {
    const document = cpf.generate();
    expect(documentSchema.parse(document)).toBe(document);
  });

  it("aceita CPF valido com mascara e devolve apenas digitos", () => {
    const formatted = cpf.generate({ formatted: true });
    const parsed = documentSchema.parse(formatted);
    expect(parsed).toBe(formatted.replace(/\D/g, ""));
    expect(parsed).toHaveLength(CPF_LENGTH);
  });

  it("aceita CNPJ valido sem mascara", () => {
    expect(documentSchema.parse(VALID_CNPJ)).toBe(VALID_CNPJ);
  });

  it("aceita CNPJ valido com mascara e devolve apenas digitos", () => {
    expect(documentSchema.parse(FORMATTED_CNPJ)).toBe(VALID_CNPJ);
  });

  it("remove espacos nas bordas antes de validar", () => {
    const document = cpf.generate();
    expect(documentSchema.parse(`  ${document}  `)).toBe(document);
  });

  it("rejeita CPF com digito verificador invalido", () => {
    const messages = documentMessages(withWrongLastDigit(cpf.generate()));
    expect(messages).toContain("Documento invalido");
    expect(messages).not.toContain("Documento incompleto");
  });

  it("rejeita CNPJ com digito verificador invalido", () => {
    expect(documentMessages(withWrongLastDigit(VALID_CNPJ))).toContain(
      "Documento invalido",
    );
  });

  it("rejeita valor vazio", () => {
    expect(documentMessages("")).toContain("Informe seu CPF ou CNPJ");
  });

  it("rejeita valor com apenas espacos", () => {
    expect(documentMessages("   ")).toContain("Informe seu CPF ou CNPJ");
  });

  it("rejeita documento incompleto", () => {
    expect(documentMessages("123.456")).toContain("Documento incompleto");
  });

  it("rejeita documento com 12 digitos", () => {
    expect(documentMessages("123456789012")).toContain("Documento incompleto");
  });
});

describe("customerFormSchema", () => {
  it("aceita formulario valido e normaliza telefone e CEP", () => {
    const parsed = customerFormSchema.parse(buildValidForm());
    expect(parsed.telefone).toBe("11987654321");
    expect(parsed.cep).toBe("01310100");
  });

  it("aceita telefone fixo com 10 digitos", () => {
    const parsed = customerFormSchema.parse({
      ...buildValidForm(),
      telefone: "(11) 3456-7890",
    });
    expect(parsed.telefone).toBe("1134567890");
  });

  it("rejeita telefone com 9 digitos", () => {
    expect(formMessages({ telefone: "987654321" })).toContain(
      "Telefone incompleto",
    );
  });

  it("rejeita telefone com 12 digitos", () => {
    expect(formMessages({ telefone: "119876543210" })).toContain(
      "Telefone incompleto",
    );
  });

  it("rejeita CEP incompleto", () => {
    expect(formMessages({ cep: "01310-10" })).toContain("CEP incompleto");
  });

  it("rejeita UF com tamanho diferente de UF_LENGTH", () => {
    expect(formMessages({ uf: "S".repeat(UF_LENGTH - 1) })).toContain(
      "UF invalida",
    );
    expect(formMessages({ uf: "S".repeat(UF_LENGTH + 1) })).toContain(
      "UF invalida",
    );
  });

  it("rejeita nome curto", () => {
    expect(formMessages({ nomeRazaoSocial: "Al" })).toContain(
      "Informe o nome ou razao social",
    );
  });

  it("rejeita nome longo", () => {
    expect(formMessages({ nomeRazaoSocial: "a".repeat(121) })).toContain(
      "Nome muito longo",
    );
  });

  it("rejeita e-mail vazio", () => {
    expect(formMessages({ email: "" })).toContain("Informe o e-mail");
  });

  it("rejeita e-mail invalido", () => {
    expect(formMessages({ email: "maria" })).toContain("E-mail invalido");
  });

  it("aceita complemento vazio e no limite", () => {
    expect(
      customerFormSchema.safeParse({ ...buildValidForm(), complemento: "" })
        .success,
    ).toBe(true);
    expect(
      customerFormSchema.safeParse({
        ...buildValidForm(),
        complemento: "a".repeat(COMPLEMENTO_MAX_LENGTH),
      }).success,
    ).toBe(true);
  });

  it("rejeita complemento acima de COMPLEMENTO_MAX_LENGTH", () => {
    expect(
      formMessages({ complemento: "a".repeat(COMPLEMENTO_MAX_LENGTH + 1) }),
    ).toContain("Complemento muito longo");
  });
});

describe("customerCreateRequestSchema", () => {
  it("aceita payload valido", () => {
    const result = customerCreateRequestSchema.safeParse(buildValidForm());
    expect(result.success).toBe(true);
  });

  it("rejeita campos extras", () => {
    const result = customerCreateRequestSchema.safeParse({
      ...buildValidForm(),
      admin: true,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.code)).toContain(
      "unrecognized_keys",
    );
  });

  it("rejeita payload sem campos obrigatorios", () => {
    expect(
      customerCreateRequestSchema.safeParse({ email: "maria@example.com" })
        .success,
    ).toBe(false);
  });
});

describe("customerUpdateRequestSchema", () => {
  it("aceita atualizacao parcial", () => {
    expect(
      customerUpdateRequestSchema.safeParse({ email: "nova@example.com" })
        .success,
    ).toBe(true);
    expect(customerUpdateRequestSchema.safeParse({}).success).toBe(true);
  });

  it("valida os campos informados", () => {
    expect(customerUpdateRequestSchema.safeParse({ email: "x" }).success).toBe(
      false,
    );
  });

  it("rejeita cpfCnpj, que nao pode ser alterado", () => {
    expect(
      customerUpdateRequestSchema.safeParse({ cpfCnpj: cpf.generate() })
        .success,
    ).toBe(false);
  });

  it("rejeita campos extras", () => {
    const result = customerUpdateRequestSchema.safeParse({
      email: "nova@example.com",
      codigoClienteOmie: 1,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.code)).toContain(
      "unrecognized_keys",
    );
  });
});
