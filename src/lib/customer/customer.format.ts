import { CNPJ_LENGTH, CPF_LENGTH } from "./customer.constants";

const CPF_PATTERN = "000.000.000-00";
const CNPJ_PATTERN = "00.000.000/0000-00";
export function documentMaskPattern(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.length > CPF_LENGTH ? CNPJ_PATTERN : CPF_PATTERN;
}
export function formatDocument(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === CPF_LENGTH) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  if (digits.length === CNPJ_LENGTH) {
    return digits.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5",
    );
  }
  return value;
}
