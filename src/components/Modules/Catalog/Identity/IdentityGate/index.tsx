"use client";
import { useEffect } from "react";
import { useIdentityGuard } from "@/lib/hooks/use-identity-guard";
import { useCustomerStore } from "@/lib/stores/customer";
import { DocumentDialog } from "../DocumentDialog";
import { RegisterSheet } from "../RegisterSheet";
export function IdentityGate() {
  const customer = useCustomerStore((state) => state.customer);
  const consumePendingIntent = useCustomerStore(
    (state) => state.consumePendingIntent,
  );
  const { runIntent } = useIdentityGuard();
  useEffect(() => {
    if (!customer) return;
    const intent = consumePendingIntent();
    if (intent) runIntent(intent);
  }, [customer, consumePendingIntent, runIntent]);
  return (
    <>
      <DocumentDialog />
      <RegisterSheet />
    </>
  );
}
