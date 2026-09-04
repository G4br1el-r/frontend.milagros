import { PAYMENT_KIND_ORDER } from "./checkout.constants";
import type { FormaPagamentoDto } from "./checkout.types";
export function sortPaymentMethods(
  formas: FormaPagamentoDto[],
): FormaPagamentoDto[] {
  const rank = (forma: FormaPagamentoDto) => {
    const index = PAYMENT_KIND_ORDER.indexOf(
      forma.tipoForma as (typeof PAYMENT_KIND_ORDER)[number],
    );
    return index === -1 ? PAYMENT_KIND_ORDER.length : index;
  };
  return [...formas].sort((a, b) => rank(a) - rank(b));
}
export function formatDueDate(value: string): string {
  return value;
}
export function formatInstallmentLabel(
  numeroParcelas: number,
  valorParcela: number,
  prazosDescricao: string | null,
): string {
  if (prazosDescricao) return prazosDescricao;
  const valor = valorParcela.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return numeroParcelas === 1
    ? `À vista ${valor}`
    : `${numeroParcelas}x de ${valor}`;
}
