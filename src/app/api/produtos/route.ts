import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { ProdutosPaginadosDto } from "@/components/Modules/Catalog/Home/Products/product.types";
import { api } from "@/lib/api";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
import { withPriceTableParams } from "@/lib/api/with-price-table";
export async function GET(request: NextRequest) {
  try {
    const searchParams = await withPriceTableParams(
      request.nextUrl.searchParams,
    );
    const produtos = await withAuthRetry(() =>
      api.get<ProdutosPaginadosDto>(`/api/produtos?${searchParams}`),
    );
    return NextResponse.json(produtos);
  } catch (error) {
    return routeErrorResponse(error);
  }
}
