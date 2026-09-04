"use client";

import { UserRound } from "lucide-react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCustomerStore } from "@/lib/stores/customer";
import { modalContentVariants, springSnappy } from "../identity.motion";
import { DocumentForm } from "./DocumentForm";

export function DocumentDialog() {
  const step = useCustomerStore((state) => state.step);
  const cancel = useCustomerStore((state) => state.cancel);

  return (
    <Dialog
      open={step === "document"}
      onOpenChange={(next) => {
        if (!next) cancel();
      }}
    >
      <DialogContent className="w-full max-w-[calc(100%-2rem)] gap-0 rounded-2xl border-primary/10 bg-cream p-6 sm:max-w-md sm:p-8">
        <DialogHeader className="gap-3">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={springSnappy}
            className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold/15 text-gold"
          >
            <UserRound className="size-6" strokeWidth={1.75} />
          </motion.span>

          <DialogTitle className="text-center font-display text-xl text-primary sm:text-2xl">
            Identifique-se
          </DialogTitle>

          <DialogDescription className="text-center text-sm leading-relaxed text-primary/60">
            Informe seu CPF ou CNPJ para continuar com o seu pedido.
          </DialogDescription>
        </DialogHeader>

        <motion.div
          variants={modalContentVariants}
          initial="hidden"
          animate="visible"
          className="mt-6"
        >
          <DocumentForm />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
