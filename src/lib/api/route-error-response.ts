import { NextResponse } from "next/server";
import { isAppError } from "@/lib/api-client";
import { SERVER_ERROR_MIN_STATUS } from "@/lib/http/http.constants";

const GENERIC_ERROR_MESSAGE = "Erro inesperado ao consumir a API";
export function routeErrorResponse(error: unknown) {
  if (isAppError(error)) {
    const status = error.statusCode || 502;
    const message =
      status < SERVER_ERROR_MIN_STATUS ? error.message : GENERIC_ERROR_MESSAGE;
    return NextResponse.json({ message, code: error.code }, { status });
  }
  console.error("[route] erro inesperado", error);
  return NextResponse.json(
    { message: GENERIC_ERROR_MESSAGE, code: "UNKNOWN" },
    { status: 500 },
  );
}
