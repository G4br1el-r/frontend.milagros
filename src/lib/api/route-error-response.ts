import { NextResponse } from "next/server";
import { isAppError } from "@/lib/api-client";

export function routeErrorResponse(error: unknown) {
  if (isAppError(error)) {
    return NextResponse.json(
      { message: error.message, code: error.code },
      { status: error.statusCode || 502 },
    );
  }

  return NextResponse.json(
    { message: "Erro inesperado ao consumir a API", code: "UNKNOWN" },
    { status: 500 },
  );
}
