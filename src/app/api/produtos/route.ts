import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { buildProductSearchQuery } from "@/components/Modules/Catalog/Home/Products/product.query";
import { productSearchQuerySchema } from "@/components/Modules/Catalog/Home/Products/product.schemas";
import type { ProdutosPaginadosDto } from "@/components/Modules/Catalog/Home/Products/product.types";
import { api } from "@/lib/api";
import { parseSearchParams } from "@/lib/api/parse-request";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
import { withPriceTableParams } from "@/lib/api/with-price-table";
export async function GET(request: NextRequest) {
  try {
    const filters = parseSearchParams(
      request.nextUrl.searchParams,
      productSearchQuerySchema,
    );
    const searchParams = await withPriceTableParams(
      new URLSearchParams(buildProductSearchQuery(filters)),
    );
    const produtos = await withAuthRetry(() =>
      api.get<ProdutosPaginadosDto>(`/api/produtos?${searchParams}`),
    );
    return NextResponse.json(produtos);
  } catch (error) {
    return routeErrorResponse(error);
  }
}
