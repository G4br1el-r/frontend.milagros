"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Container } from "@/components/Layout/Container";
import { AccountDetailsForm } from "@/components/Modules/Catalog/Account/AccountDetailsForm";
import { AccountMetrics } from "@/components/Modules/Catalog/Account/AccountMetrics";
import { AccountOrders } from "@/components/Modules/Catalog/Account/AccountOrders";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { computeAccountMetrics } from "@/lib/account/account.metrics";
import { useCustomerOrders } from "@/lib/account/use-customer-orders";
import { useCustomerStore } from "@/lib/stores/customer";

export function AccountView() {
  const customer = useCustomerStore((state) => state.customer);
  const hasHydrated = useCustomerStore((state) => state.hasHydrated);
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && !customer) {
      router.replace("/");
    }
  }, [hasHydrated, customer, router]);

  const { orders, isLoading, isError, refetch } = useCustomerOrders(
    customer?.cpfCnpj ?? "",
  );

  const metrics = useMemo(() => computeAccountMetrics(orders), [orders]);

  if (!hasHydrated || !customer) {
    return <div className="min-h-svh bg-cream" aria-hidden="true" />;
  }

  return (
    <main className="min-h-svh bg-cream pt-24 pb-24 sm:pt-32">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <nav aria-label="Trilha" className="text-xs text-primary/50">
            <Link href="/" className="hover:text-primary">
              Início
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-primary/70">Minha conta</span>
          </nav>

          <h1 className="font-display text-4xl text-primary sm:text-5xl">
            Olá, {customer.nomeRazaoSocial.split(" ")[0]}
          </h1>
        </div>

        {orders.length > 0 && <AccountMetrics metrics={metrics} />}

        <Tabs defaultValue="pedidos" className="flex flex-col gap-8">
          <TabsList>
            <TabsTab value="pedidos">Meus pedidos</TabsTab>
            <TabsTab value="dados">Meus dados</TabsTab>
          </TabsList>

          <TabsPanel value="pedidos">
            <AccountOrders
              orders={orders}
              isLoading={isLoading}
              isError={isError}
              onRetry={refetch}
            />
          </TabsPanel>

          <TabsPanel value="dados">
            <AccountDetailsForm customer={customer} />
          </TabsPanel>
        </Tabs>
      </Container>
    </main>
  );
}
