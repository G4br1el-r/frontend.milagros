"use client";

import { useCallback, useState } from "react";
import { fetchAddressByCep } from "@/lib/customer/customer.client";
import { CEP_LENGTH } from "@/lib/customer/customer.constants";
import { cepToAddressFields } from "@/lib/customer/customer.mapper";

type AddressFields = ReturnType<typeof cepToAddressFields>;

/** Busca o endereco assim que o CEP fica completo. */
export function useCepLookup(onFound: (fields: AddressFields) => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = useCallback(
    async (rawCep: string) => {
      const digits = rawCep.replace(/\D/g, "");
      if (digits.length !== CEP_LENGTH) return;

      setIsLoading(true);
      setError(null);

      try {
        const endereco = await fetchAddressByCep(digits);
        onFound(cepToAddressFields(endereco));
      } catch {
        setError("CEP nao encontrado");
      } finally {
        setIsLoading(false);
      }
    },
    [onFound],
  );

  return { lookup, isLoading, error };
}
