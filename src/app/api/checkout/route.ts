import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "@/lib/api";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
import { isAppError } from "@/lib/api-client";
import type {
  CheckoutRequest,
  CheckoutResponse,
} from "@/lib/checkout/checkout.types";

/** Recusa de negocio traz `valido`; ProblemDetails de validacao nao. */
function isBusinessRejection(details: unknown): details is CheckoutResponse {
  return (
    typeof details === "object" &&
    details !== null &&
    typeof (details as CheckoutResponse).valido === "boolean"
  );
}

/**
 * Valida o carrinho e devolve as formas de pagamento elegiveis.
 * A API responde CheckoutResponse tambem no 400 (pedido minimo, por exemplo),
 * entao repassamos esse corpo em vez de transforma-lo em erro generico.
 */
export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as CheckoutRequest;

    const resultado = await withAuthRetry(() =>
      api.post<CheckoutResponse>("/api/checkout", payload),
    );

    return NextResponse.json(resultado);
  } catch (error) {
    if (
      isAppError(error) &&
      error.statusCode === 400 &&
      isBusinessRejection(error.details)
    ) {
      return NextResponse.json(error.details);
    }

    return routeErrorResponse(error);
  }
}
