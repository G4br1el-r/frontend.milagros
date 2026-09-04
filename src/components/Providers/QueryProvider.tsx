"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import {
  PRODUCT_GC_TIME_MS,
  PRODUCT_STALE_TIME_MS,
} from "./query-provider.constants";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Default conservador: vale para produto. Metadados de filtro
            // sobrescrevem com a janela longa em use-filter-options.
            staleTime: PRODUCT_STALE_TIME_MS,
            gcTime: PRODUCT_GC_TIME_MS,
            refetchOnWindowFocus: false,
            // 4xx nao melhora com repeticao; so erro de rede/servidor merece retry.
            retry: (failureCount, error) => {
              const status = (error as { status?: number })?.status;
              if (status && status >= 400 && status < 500) return false;
              return failureCount < 2;
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
