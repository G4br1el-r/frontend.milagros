/** Resposta de GET /api/enderecos/{cep} — formato ViaCEP. */
export interface EnderecoCepDto {
  cep: string;
  logradouro: string;
  complemento: string | null;
  bairro: string;
  localidade: string;
  uf: string;
}

/** Corpo de POST /api/clientes. */
export interface ClienteCadastroRequest {
  cpfCnpj: string;
  nomeRazaoSocial: string;
  email: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

/** Resposta de GET /api/clientes/cpf/{cpfCnpj} e POST /api/clientes. */
export interface ClienteResponse extends ClienteCadastroRequest {
  id: string;
  complemento: string;
  /** Pode vir nulo quando a sincronizacao com a Omie ainda nao ocorreu. */
  codigoClienteOmie: number | null;
}

/** Corpo de PUT /api/clientes/cpf/{cpfCnpj} — todos os campos opcionais. */
export interface ClienteAtualizarRequest {
  nomeRazaoSocial?: string;
  email?: string;
  telefone?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}

/** Cliente identificado, como fica persistido no localStorage. */
export interface Customer {
  id: string;
  cpfCnpj: string;
  nomeRazaoSocial: string;
  email: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  codigoClienteOmie: number | null;
}
