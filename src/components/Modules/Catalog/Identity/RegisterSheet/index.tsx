"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCustomerStore } from "@/lib/stores/customer";
import { RegisterForm } from "./RegisterForm";
export function RegisterSheet() {
  const step = useCustomerStore((state) => state.step);
  const cancel = useCustomerStore((state) => state.cancel);
  return (
    <Sheet
      open={step === "register"}
      onOpenChange={(next) => {
        if (!next) cancel();
      }}
    >
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-primary/10 bg-cream p-0 sm:max-w-lg"
      >
        <SheetHeader className="border-b border-primary/10 p-4 sm:p-6">
          <SheetTitle className="font-display text-xl text-primary">
            Criar cadastro
          </SheetTitle>
          <SheetDescription className="text-sm leading-relaxed text-primary/60">
            Não encontramos esse documento. Complete seus dados para continuar.
          </SheetDescription>
        </SheetHeader>
        <RegisterForm />
      </SheetContent>
    </Sheet>
  );
}
