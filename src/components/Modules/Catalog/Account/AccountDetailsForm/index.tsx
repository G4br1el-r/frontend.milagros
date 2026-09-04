"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CepField } from "@/components/Modules/Catalog/Identity/Fields/CepField";
import { DocumentField } from "@/components/Modules/Catalog/Identity/Fields/DocumentField";
import { FieldError } from "@/components/Modules/Catalog/Identity/Fields/FieldError";
import { FieldRow } from "@/components/Modules/Catalog/Identity/Fields/FieldRow";
import { NumberField } from "@/components/Modules/Catalog/Identity/Fields/NumberField";
import { PhoneField } from "@/components/Modules/Catalog/Identity/Fields/PhoneField";
import { TextField } from "@/components/Modules/Catalog/Identity/Fields/TextField";
import {
  CustomerApiError,
  updateCustomer,
} from "@/lib/customer/customer.client";
import { formatDocument } from "@/lib/customer/customer.format";
import { toCustomer } from "@/lib/customer/customer.mapper";
import {
  type CustomerFormValues,
  customerFormSchema,
} from "@/lib/customer/customer.schemas";
import type { Customer } from "@/lib/customer/customer.types";
import { useCepLookup } from "@/lib/hooks/use-cep-lookup";
import { useCustomerStore } from "@/lib/stores/customer";
import { appToast } from "@/lib/toast/toast";

interface AccountDetailsFormProps {
  customer: Customer;
}

export function AccountDetailsForm({ customer }: AccountDetailsFormProps) {
  const identify = useCustomerStore((state) => state.identify);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: { ...customer },
    mode: "onBlur",
  });

  const onFound = useCallback(
    (fields: {
      logradouro: string;
      bairro: string;
      cidade: string;
      uf: string;
    }) => {
      setValue("logradouro", fields.logradouro, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("bairro", fields.bairro, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("cidade", fields.cidade, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("uf", fields.uf, { shouldValidate: true, shouldDirty: true });
    },
    [setValue],
  );

  const {
    lookup,
    isLoading: isCepLoading,
    error: cepError,
  } = useCepLookup(onFound);

  async function onSubmit(values: CustomerFormValues) {
    setSubmitError(null);

    try {
      const { cpfCnpj: _cpfCnpj, ...payload } = values;
      const atualizado = await updateCustomer(customer.cpfCnpj, payload);
      const proximo = toCustomer(atualizado);
      identify(proximo);
      reset({ ...proximo });
      appToast.accountUpdated();
    } catch (error) {
      setSubmitError(
        error instanceof CustomerApiError && error.status >= 500
          ? "O servidor não conseguiu salvar agora. Tente novamente em instantes."
          : error instanceof CustomerApiError
            ? error.message
            : "Não foi possível salvar seus dados. Tente novamente.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldRow id="account-documento" label="CPF ou CNPJ">
          <DocumentField
            id="account-documento"
            value={formatDocument(customer.cpfCnpj)}
            onChange={() => {}}
            disabled
          />
        </FieldRow>

        <Controller
          control={control}
          name="nomeRazaoSocial"
          render={({ field }) => (
            <FieldRow
              id="account-nome"
              label="Nome ou razão social"
              error={errors.nomeRazaoSocial?.message}
            >
              <TextField
                id="account-nome"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                autoComplete="name"
                disabled={isSubmitting}
                invalid={Boolean(errors.nomeRazaoSocial)}
              />
            </FieldRow>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <FieldRow
              id="account-email"
              label="E-mail"
              error={errors.email?.message}
            >
              <TextField
                id="account-email"
                type="email"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                autoComplete="email"
                disabled={isSubmitting}
                invalid={Boolean(errors.email)}
              />
            </FieldRow>
          )}
        />

        <Controller
          control={control}
          name="telefone"
          render={({ field }) => (
            <FieldRow
              id="account-telefone"
              label="Telefone"
              error={errors.telefone?.message}
            >
              <PhoneField
                id="account-telefone"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={isSubmitting}
                invalid={Boolean(errors.telefone)}
              />
            </FieldRow>
          )}
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-primary/10 pt-6">
        <h3 className="font-display text-sm text-primary">Endereço</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            control={control}
            name="cep"
            render={({ field }) => (
              <FieldRow
                id="account-cep"
                label="CEP"
                error={errors.cep?.message ?? cepError ?? undefined}
              >
                <CepField
                  id="account-cep"
                  value={field.value}
                  onChange={field.onChange}
                  onComplete={lookup}
                  isLoading={isCepLoading}
                  disabled={isSubmitting}
                  invalid={Boolean(errors.cep || cepError)}
                />
              </FieldRow>
            )}
          />

          <Controller
            control={control}
            name="logradouro"
            render={({ field }) => (
              <FieldRow
                id="account-logradouro"
                label="Logradouro"
                error={errors.logradouro?.message}
              >
                <TextField
                  id="account-logradouro"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  autoComplete="address-line1"
                  disabled={isSubmitting || isCepLoading}
                  invalid={Boolean(errors.logradouro)}
                />
              </FieldRow>
            )}
          />

          <Controller
            control={control}
            name="numero"
            render={({ field }) => (
              <FieldRow
                id="account-numero"
                label="Número"
                error={errors.numero?.message}
              >
                <NumberField
                  id="account-numero"
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                  invalid={Boolean(errors.numero)}
                />
              </FieldRow>
            )}
          />

          <Controller
            control={control}
            name="complemento"
            render={({ field }) => (
              <FieldRow
                id="account-complemento"
                label="Complemento"
                error={errors.complemento?.message}
              >
                <TextField
                  id="account-complemento"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  autoComplete="address-line3"
                  maxLength={60}
                  disabled={isSubmitting}
                  invalid={Boolean(errors.complemento)}
                />
              </FieldRow>
            )}
          />

          <Controller
            control={control}
            name="bairro"
            render={({ field }) => (
              <FieldRow
                id="account-bairro"
                label="Bairro"
                error={errors.bairro?.message}
              >
                <TextField
                  id="account-bairro"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={isSubmitting || isCepLoading}
                  invalid={Boolean(errors.bairro)}
                />
              </FieldRow>
            )}
          />

          <div className="grid grid-cols-[1fr_5rem] gap-3">
            <Controller
              control={control}
              name="cidade"
              render={({ field }) => (
                <FieldRow
                  id="account-cidade"
                  label="Cidade"
                  error={errors.cidade?.message}
                >
                  <TextField
                    id="account-cidade"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={isSubmitting || isCepLoading}
                    invalid={Boolean(errors.cidade)}
                  />
                </FieldRow>
              )}
            />

            <Controller
              control={control}
              name="uf"
              render={({ field }) => (
                <FieldRow id="account-uf" label="UF" error={errors.uf?.message}>
                  <TextField
                    id="account-uf"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    maxLength={2}
                    uppercase
                    disabled={isSubmitting || isCepLoading}
                    invalid={Boolean(errors.uf)}
                  />
                </FieldRow>
              )}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <FieldError message={submitError ?? undefined} />

        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="inline-flex h-12 w-fit cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-b from-gold-light to-gold px-8 text-[11px] font-bold tracking-[0.12em] text-primary-darkest uppercase transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Salvando
            </>
          ) : (
            "Salvar alterações"
          )}
        </button>
      </div>
    </form>
  );
}
