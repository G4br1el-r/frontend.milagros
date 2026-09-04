import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "@/lib/api";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
import { isAppError } from "@/lib/api-client";
import type {
  FinalizarCheckoutRequest,
  FinalizarCheckoutResponse,
} from "@/lib/checkout/checkout.types";

function isBusinessRejection(
  details: unknown,
): details is FinalizarCheckoutResponse {
  return (
    typeof details === "object" &&
    details !== null &&
    typeof (details as FinalizarCheckoutResponse).sucesso === "boolean"
  );
}
export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as FinalizarCheckoutRequest;
    const resultado = await withAuthRetry(() =>
      api.post<FinalizarCheckoutResponse>("/api/checkout/finalizar", payload),
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
    if (isAppError(error) && error.statusCode >= 500) {
      console.error("[POST /api/checkout/finalizar] falha no upstream", {
        status: error.statusCode,
        message: error.message,
        details: error.details,
      });
    }
    return routeErrorResponse(error);
  }
}
