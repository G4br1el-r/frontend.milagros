import { describe, expect, it } from "vitest";
import { makeCustomer } from "@/test/fixtures";
import { cepToAddressFields, toCustomer } from "./customer.mapper";
import type { ClienteResponse, EnderecoCepDto } from "./customer.types";

function makeClienteResponse(): ClienteResponse {
  const { id, codigoClienteOmie, ...cadastro } = makeCustomer();
  return { id, codigoClienteOmie, ...cadastro };
}

describe("toCustomer", () => {
  it("mapeia todos os campos do cliente", () => {
    expect(toCustomer(makeClienteResponse())).toEqual(makeCustomer());
  });

  it("converte complemento nulo em string vazia", () => {
    const cliente = {
      ...makeClienteResponse(),
      complemento: null,
    } as unknown as ClienteResponse;
    expect(toCustomer(cliente).complemento).toBe("");
  });

  it("mantem codigoClienteOmie nulo", () => {
    const cliente = { ...makeClienteResponse(), codigoClienteOmie: null };
    expect(toCustomer(cliente).codigoClienteOmie).toBeNull();
  });
});

describe("cepToAddressFields", () => {
  it("mapeia localidade para cidade e ignora complemento", () => {
    const endereco: EnderecoCepDto = {
      cep: "01310-100",
      logradouro: "Avenida Paulista",
      complemento: "lado par",
      bairro: "Bela Vista",
      localidade: "Sao Paulo",
      uf: "SP",
    };
    expect(cepToAddressFields(endereco)).toEqual({
      cep: "01310-100",
      logradouro: "Avenida Paulista",
      bairro: "Bela Vista",
      cidade: "Sao Paulo",
      uf: "SP",
    });
  });
});
