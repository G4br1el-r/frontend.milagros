export const CUSTOMER_STORAGE_KEY = "milagros-customer";

export const CPF_LENGTH = 11;

export const CNPJ_LENGTH = 14;

export const CEP_LENGTH = 8;

/** Valor gravado em `numero` quando o endereco nao possui numeracao. */
export const ADDRESS_WITHOUT_NUMBER = "S/N";

export const UF_OPTIONS = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;
