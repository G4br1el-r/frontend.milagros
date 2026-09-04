import type { PedidoDetalhesDto } from "@/lib/checkout/checkout.types";
export interface UpcomingInstallment {
  valor: number;
  dataVencimento: string;
  numeroPedidoOmie: string | null;
}
export interface AccountMetrics {
  totalPedidos: number;
  totalGasto: number;
  ticketMedio: number;
  totalItens: number;
  clienteDesde: string | null;
  proximaParcela: UpcomingInstallment | null;
}
const CANCELED_STATUSES = new Set(["cancelado", "cancelada"]);
function isCanceled(pedido: PedidoDetalhesDto): boolean {
  return CANCELED_STATUSES.has((pedido.status ?? "").trim().toLowerCase());
}
export function computeAccountMetrics(
  pedidos: PedidoDetalhesDto[],
): AccountMetrics {
  const validos = pedidos.filter((pedido) => !isCanceled(pedido));
  const totalGasto = validos.reduce(
    (sum, pedido) => sum + pedido.valorTotal,
    0,
  );
  const totalItens = validos.reduce(
    (sum, pedido) =>
      sum +
      pedido.itens.reduce((itemSum, item) => itemSum + item.quantidade, 0),
    0,
  );
  const datas = validos
    .map((pedido) => pedido.dataPedido)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const agora = Date.now();
  let proximaParcela: UpcomingInstallment | null = null;
  for (const pedido of validos) {
    for (const parcela of pedido.parcelas) {
      const vencimento = new Date(parcela.dataVencimento).getTime();
      if (vencimento < agora) continue;
      if (
        !proximaParcela ||
        vencimento < new Date(proximaParcela.dataVencimento).getTime()
      ) {
        proximaParcela = {
          valor: parcela.valor,
          dataVencimento: parcela.dataVencimento,
          numeroPedidoOmie: pedido.numeroPedidoOmie,
        };
      }
    }
  }
  return {
    totalPedidos: validos.length,
    totalGasto,
    ticketMedio: validos.length > 0 ? totalGasto / validos.length : 0,
    totalItens,
    clienteDesde: datas[0] ?? null,
    proximaParcela,
  };
}
