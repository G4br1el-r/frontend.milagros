"use client";
import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCustomerStore } from "@/lib/stores/customer";
import { CustomerMenuPanel } from "./CustomerMenuPanel";
export function CustomerMenu() {
  const customer = useCustomerStore((state) => state.customer);
  const signOut = useCustomerStore((state) => state.signOut);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const closeOnScroll = () => setOpen(false);
    window.addEventListener("scroll", closeOnScroll, {
      passive: true,
      capture: true,
    });
    return () =>
      window.removeEventListener("scroll", closeOnScroll, {
        capture: true,
      });
  }, [open]);
  if (!customer) return null;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={`Conta de ${customer.nomeRazaoSocial}`}
        className="flex size-9 sm:size-11 cursor-pointer items-center justify-center rounded-full border border-cream/40 text-cream transition-colors duration-300 hover:border-cream hover:bg-cream/10 focus-visible:ring-2 focus-visible:ring-cream focus-visible:outline-none"
      >
        <UserRound className="size-5" strokeWidth={1.75} />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={10}
        arrowClassName="fill-cream"
        className="w-auto rounded-xl border-primary/10 bg-cream p-4"
      >
        <CustomerMenuPanel
          customer={customer}
          onNavigate={() => setOpen(false)}
          onSignOut={() => {
            setOpen(false);
            signOut();
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
