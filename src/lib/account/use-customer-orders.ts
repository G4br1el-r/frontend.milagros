"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchOrdersByDocument } from "@/lib/checkout/checkout.client";
import { accountQueryKeys } from "@/lib/query/keys";
export function useCustomerOrders(cpfCnpj: string) {
  const query = useQuery({
    queryKey: accountQueryKeys.orders(cpfCnpj),
    queryFn: () => fetchOrdersByDocument(cpfCnpj),
    staleTime: 2 * 60 * 1000,
  });
  return {
    orders: query.data ?? [],
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
