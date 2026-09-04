export interface EnderecoCepDto {
  cep: string;
  logradouro: string;
  complemento: string | null;
  bairro: string;
  localidade: string;
  uf: string;
}
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
export interface ClienteResponse extends ClienteCadastroRequest {
  id: string;
  complemento: string;
  codigoClienteOmie: number | null;
}
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
