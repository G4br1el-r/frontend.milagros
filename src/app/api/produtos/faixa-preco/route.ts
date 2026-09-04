import { NextResponse } from "next/server";
import type { FaixaPrecoDto } from "@/components/Modules/Catalog/Home/Products/ProductFilters/filters.types";
import { api } from "@/lib/api";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
export async function GET() {
  try {
    const faixaPreco = await withAuthRetry(() =>
      api.get<FaixaPrecoDto>("/api/produtos/faixa-preco"),
    );
    return NextResponse.json(faixaPreco);
  } catch (error) {
    return routeErrorResponse(error);
  }
}
