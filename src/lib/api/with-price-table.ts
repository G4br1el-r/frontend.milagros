import { getPriceTableCode } from "@/lib/auth/token";

export async function withPriceTableParams(
  searchParams: URLSearchParams,
): Promise<URLSearchParams> {
  const merged = new URLSearchParams(searchParams);
  merged.set("codigoTabelaPreco", await getPriceTableCode());
  return merged;
}
