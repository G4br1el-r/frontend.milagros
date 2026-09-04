import { AlertCircle } from "lucide-react";
import type { PedidoDetalhesDto } from "@/lib/checkout/checkout.types";
import { AccountOrderRow } from "./AccountOrderRow";

interface AccountOrdersProps {
  orders: PedidoDetalhesDto[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}
function OrdersSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="h-23 animate-pulse rounded-2xl bg-primary/5"
        />
      ))}
    </div>
  );
}
export function AccountOrders({
  orders,
  isLoading,
  isError,
  onRetry,
}: AccountOrdersProps) {
  if (isLoading) {
    return <OrdersSkeleton />;
  }
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-primary/10 bg-white px-6 py-10 text-center">
        <AlertCircle className="size-6 text-terracotta" strokeWidth={1.75} />
        <p className="text-sm text-primary/70">
          Não foi possível carregar seus pedidos.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="cursor-pointer text-[11px] font-semibold tracking-[0.08em] text-primary uppercase underline underline-offset-4 hover:text-terracotta"
        >
          Tentar de novo
        </button>
      </div>
    );
  }
  if (orders.length === 0) {
    return (
      <p className="text-sm text-primary/60">
        Você ainda não fez nenhum pedido.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <AccountOrderRow key={order.id} order={order} />
      ))}
    </div>
  );
}
