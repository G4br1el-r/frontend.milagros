"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import * as m from "motion/react-m";
import { useId, useState } from "react";
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
import { SERVER_ERROR_MIN_STATUS } from "@/lib/http/http.constants";
import { useCustomerStore } from "@/lib/stores/customer";
import { AddressSection } from "../CustomerFormSections/AddressSection";
import { IdentitySection } from "../CustomerFormSections/IdentitySection";
import { FieldError } from "../Fields/FieldError";
import { modalContentVariants } from "../identity.motion";

const REGISTER_FIELD_ID_PREFIX = "register-";
export function RegisterForm() {
  const draftDocument = useCustomerStore((state) => state.draftDocument);
  const identify = useCustomerStore((state) => state.identify);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submitErrorId = useId();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
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
      if (
        error instanceof CustomerApiError &&
        error.status >= SERVER_ERROR_MIN_STATUS
      ) {
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
    <m.form
      variants={modalContentVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-0 flex-1 flex-col"
      aria-describedby={submitError ? submitErrorId : undefined}
      noValidate
    >
      <div className="flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
        <div className="flex flex-col gap-7">
          <IdentitySection
            control={control}
            errors={errors}
            idPrefix={REGISTER_FIELD_ID_PREFIX}
            disabled={isSubmitting}
          />
          <AddressSection
            control={control}
            errors={errors}
            setValue={setValue}
            idPrefix={REGISTER_FIELD_ID_PREFIX}
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-primary/10 bg-cream p-4 sm:p-6">
        <FieldError id={submitErrorId} message={submitError ?? undefined} />
        <m.button
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
        </m.button>
      </div>
    </m.form>
  );
}
