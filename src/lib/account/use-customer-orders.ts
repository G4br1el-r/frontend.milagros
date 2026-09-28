"use client";
import { useQuery } from "@tanstack/react-query";
import { ORDERS_STALE_TIME_MS } from "@/components/Providers/query-provider.constants";
import { fetchOrdersByDocument } from "@/lib/checkout/checkout.client";
import { accountQueryKeys } from "@/lib/query/keys";
export function useCustomerOrders(cpfCnpj: string) {
  const query = useQuery({
    queryKey: accountQueryKeys.orders(cpfCnpj),
    queryFn: () => fetchOrdersByDocument(cpfCnpj),
    staleTime: ORDERS_STALE_TIME_MS,
  });
  return {
    orders: query.data ?? [],
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
