"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  CustomerApiError,
  CustomerNotFoundError,
  fetchCustomerByDocument,
} from "@/lib/customer/customer.client";
import { toCustomer } from "@/lib/customer/customer.mapper";
import {
  type DocumentFormValues,
  documentFormSchema,
} from "@/lib/customer/customer.schemas";
import { useCustomerStore } from "@/lib/stores/customer";
import { DocumentField } from "../Fields/DocumentField";
import { FieldRow } from "../Fields/FieldRow";
import { modalContentVariants } from "../identity.motion";

export function DocumentForm() {
  const identify = useCustomerStore((state) => state.identify);
  const goToRegister = useCustomerStore((state) => state.goToRegister);
  const [lookupError, setLookupError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: { cpfCnpj: "" },
    mode: "onSubmit",
  });

  async function onSubmit(values: DocumentFormValues) {
    setLookupError(null);

    try {
      const cliente = await fetchCustomerByDocument(values.cpfCnpj);
      identify(toCustomer(cliente));
    } catch (error) {
      // 404 nao e erro: e o caminho de cadastro.
      if (error instanceof CustomerNotFoundError) {
        goToRegister(values.cpfCnpj);
        return;
      }

      setLookupError(
        error instanceof CustomerApiError && error.status < 500
          ? error.message
          : "Nao foi possivel consultar agora. Tente novamente.",
      );
    }
  }

  return (
    <motion.form
      variants={modalContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      <Controller
        control={control}
        name="cpfCnpj"
        render={({ field }) => (
          <FieldRow
            id="cpfCnpj"
            label="CPF ou CNPJ"
            error={errors.cpfCnpj?.message ?? lookupError ?? undefined}
          >
            <DocumentField
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={isSubmitting}
              invalid={Boolean(errors.cpfCnpj || lookupError)}
            />
          </FieldRow>
        )}
      />

      <motion.button
        variants={modalContentVariants}
        type="submit"
        disabled={isSubmitting}
        whileTap={{ scale: 0.985 }}
        className="relative inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-linear-to-b from-gold-light to-gold px-6 text-[11px] font-bold tracking-[0.12em] text-primary-darkest uppercase transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Consultando
          </>
        ) : (
          "Continuar"
        )}
      </motion.button>
    </motion.form>
  );
}
