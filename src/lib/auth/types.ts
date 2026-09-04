export interface LoginRequest {
  usuario: string;
  senha: string;
}
export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiraEmMinutos: number;
  codigoTabelaPreco: string;
  nomeTabelaPreco: string;
}
