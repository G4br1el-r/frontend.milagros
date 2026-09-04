import type {
  ClienteResponse,
  Customer,
  EnderecoCepDto,
} from "./customer.types";

/** A API de CEP devolve `localidade`/`uf`; o cadastro espera `cidade`/`uf`. */
export function cepToAddressFields(endereco: EnderecoCepDto) {
  return {
    cep: endereco.cep,
    logradouro: endereco.logradouro,
    bairro: endereco.bairro,
    cidade: endereco.localidade,
    uf: endereco.uf,
  };
}

export function toCustomer(cliente: ClienteResponse): Customer {
  return {
    id: cliente.id,
    cpfCnpj: cliente.cpfCnpj,
    nomeRazaoSocial: cliente.nomeRazaoSocial,
    email: cliente.email,
    telefone: cliente.telefone,
    cep: cliente.cep,
    logradouro: cliente.logradouro,
    numero: cliente.numero,
    complemento: cliente.complemento ?? "",
    bairro: cliente.bairro,
    cidade: cliente.cidade,
    uf: cliente.uf,
    codigoClienteOmie: cliente.codigoClienteOmie,
  };
}
