import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "@/lib/api";
import { parseRequestInput } from "@/lib/api/parse-request";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
import { orderIdSchema } from "@/lib/checkout/checkout.schemas";
import type { PedidoDetalhesDto } from "@/lib/checkout/checkout.types";

interface RouteContext {
  params: Promise<{ id: string }>;
}
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  try {
    const orderId = parseRequestInput(id, orderIdSchema);
    const pedido = await withAuthRetry(() =>
      api.get<PedidoDetalhesDto>(`/api/pedidos/${encodeURIComponent(orderId)}`),
    );
    return NextResponse.json(pedido);
  } catch (error) {
    return routeErrorResponse(error);
  }
}
