import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "@/lib/api";
import { logUpstreamFailure } from "@/lib/api/log-upstream-failure";
import { parseRequestBody } from "@/lib/api/parse-request";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
import { isAppError } from "@/lib/api-client";
import { finalizarCheckoutRequestSchema } from "@/lib/checkout/checkout.schemas";
import type { FinalizarCheckoutResponse } from "@/lib/checkout/checkout.types";

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
    const payload = await parseRequestBody(
      request,
      finalizarCheckoutRequestSchema,
    );
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
    logUpstreamFailure("POST /api/checkout/finalizar", error);
    return routeErrorResponse(error);
  }
}
