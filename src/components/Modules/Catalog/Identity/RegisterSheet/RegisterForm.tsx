"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CustomerApiError,
  createCustomer,
} from "@/lib/customer/customer.client";
import { toCustomer } from "@/lib/customer/customer.mapper";
import {
  type CustomerFormValues,
  customerFormSchema,
} from "@/lib/customer/customer.schemas";
import { useCustomerStore } from "@/lib/stores/customer";
import { FieldError } from "../Fields/FieldError";
import { modalContentVariants } from "../identity.motion";
import { RegisterAddressSection } from "./RegisterAddressSection";
import { RegisterIdentitySection } from "./RegisterIdentitySection";

export function RegisterForm() {
  const draftDocument = useCustomerStore((state) => state.draftDocument);
  const identify = useCustomerStore((state) => state.identify);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    // O documento ja digitado no modal chega preenchido aqui.
    defaultValues: {
      cpfCnpj: draftDocument,
      nomeRazaoSocial: "",
      email: "",
      telefone: "",
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: CustomerFormValues) {
    setSubmitError(null);

    try {
      const cliente = await createCustomer(values);
      identify(toCustomer(cliente));
    } catch (error) {
      // Erro do servidor (5xx) nao e culpa do preenchimento: diz isso ao usuario.
      if (error instanceof CustomerApiError && error.status >= 500) {
        setSubmitError(
          "O servidor nao conseguiu concluir o cadastro. Tente novamente em instantes.",
        );
        return;
      }

      setSubmitError(
        error instanceof CustomerApiError
          ? error.message
          : "Nao foi possivel concluir o cadastro. Tente novamente.",
      );
    }
  }

  return (
    <motion.form
      variants={modalContentVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-0 flex-1 flex-col"
      noValidate
    >
      <div className="flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
        <div className="flex flex-col gap-7">
          <RegisterIdentitySection
            control={control}
            errors={errors}
            disabled={isSubmitting}
          />

          <RegisterAddressSection
            control={control}
            errors={errors}
            setValue={setValue}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-primary/10 bg-cream p-4 sm:p-6">
        <FieldError message={submitError ?? undefined} />

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileTap={{ scale: 0.985 }}
          className="relative inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-linear-to-b from-gold-light to-gold px-6 text-[11px] font-bold tracking-[0.12em] text-primary-darkest uppercase transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Cadastrando
            </>
          ) : (
            "Concluir cadastro"
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}
