"use client";
import * as m from "motion/react-m";
import { useCallback } from "react";
import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormSetValue,
} from "react-hook-form";
import {
  COMPLEMENTO_MAX_LENGTH,
  UF_LENGTH,
} from "@/lib/customer/customer.constants";
import type { CustomerFormValues } from "@/lib/customer/customer.schemas";
import { useCepLookup } from "@/lib/hooks/use-cep-lookup";
import { cn } from "@/lib/utils/cn";
import { CepField } from "../Fields/CepField";
import { FieldRow } from "../Fields/FieldRow";
import { NumberField } from "../Fields/NumberField";
import { TextField } from "../Fields/TextField";
import { fieldVariants } from "../identity.motion";
import type { CustomerFormLayout } from "./customer-form-sections.types";

const AUTOFILL_OPTIONS = { shouldValidate: true, shouldDirty: true } as const;
interface AddressSectionProps {
  control: Control<CustomerFormValues>;
  errors: FieldErrors<CustomerFormValues>;
  setValue: UseFormSetValue<CustomerFormValues>;
  idPrefix: string;
  disabled?: boolean;
  layout?: CustomerFormLayout;
}
export function AddressSection({
  control,
  errors,
  setValue,
  idPrefix,
  disabled,
  layout = "stack",
}: AddressSectionProps) {
  const isGrid = layout === "grid";
  const onFound = useCallback(
    (fields: {
      logradouro: string;
      bairro: string;
      cidade: string;
      uf: string;
    }) => {
      setValue("logradouro", fields.logradouro, AUTOFILL_OPTIONS);
      setValue("bairro", fields.bairro, AUTOFILL_OPTIONS);
      setValue("cidade", fields.cidade, AUTOFILL_OPTIONS);
      setValue("uf", fields.uf, AUTOFILL_OPTIONS);
    },
    [setValue],
  );
  const { lookup, isLoading, error } = useCepLookup(onFound);
  return (
    <m.fieldset
      variants={fieldVariants}
      className={
        isGrid ? "grid grid-cols-1 gap-4 sm:grid-cols-2" : "flex flex-col gap-4"
      }
    >
      <legend
        className={cn(
          "font-display text-sm text-primary",
          isGrid ? "mb-4" : "mb-1",
        )}
      >
        Endereço
      </legend>
      <Controller
        control={control}
        name="cep"
        render={({ field }) => (
          <FieldRow
            id={`${idPrefix}cep`}
            label="CEP"
            error={errors.cep?.message ?? error ?? undefined}
          >
            <CepField
              id={`${idPrefix}cep`}
              value={field.value}
              onChange={field.onChange}
              onComplete={lookup}
              isLoading={isLoading}
              disabled={disabled}
              invalid={Boolean(errors.cep || error)}
            />
          </FieldRow>
        )}
      />
      <Controller
        control={control}
        name="logradouro"
        render={({ field }) => (
          <FieldRow
            id={`${idPrefix}logradouro`}
            label="Logradouro"
            error={errors.logradouro?.message}
          >
            <TextField
              id={`${idPrefix}logradouro`}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Rua, avenida…"
              autoComplete="address-line1"
              disabled={disabled || isLoading}
              invalid={Boolean(errors.logradouro)}
            />
          </FieldRow>
        )}
      />
      <div className={isGrid ? "contents" : "grid grid-cols-2 gap-3"}>
        <Controller
          control={control}
          name="numero"
          render={({ field }) => (
            <FieldRow
              id={`${idPrefix}numero`}
              label="Número"
              error={errors.numero?.message}
            >
              <NumberField
                id={`${idPrefix}numero`}
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
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
              id={`${idPrefix}complemento`}
              label="Complemento"
              error={errors.complemento?.message}
            >
              <TextField
                id={`${idPrefix}complemento`}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Apto, bloco…"
                autoComplete="address-line3"
                disabled={disabled}
                maxLength={COMPLEMENTO_MAX_LENGTH}
                invalid={Boolean(errors.complemento)}
              />
            </FieldRow>
          )}
        />
      </div>
      <Controller
        control={control}
        name="bairro"
        render={({ field }) => (
          <FieldRow
            id={`${idPrefix}bairro`}
            label="Bairro"
            error={errors.bairro?.message}
          >
            <TextField
              id={`${idPrefix}bairro`}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Bairro"
              disabled={disabled || isLoading}
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
              id={`${idPrefix}cidade`}
              label="Cidade"
              error={errors.cidade?.message}
            >
              <TextField
                id={`${idPrefix}cidade`}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Cidade"
                disabled={disabled || isLoading}
                invalid={Boolean(errors.cidade)}
              />
            </FieldRow>
          )}
        />
        <Controller
          control={control}
          name="uf"
          render={({ field }) => (
            <FieldRow
              id={`${idPrefix}uf`}
              label="UF"
              error={errors.uf?.message}
            >
              <TextField
                id={`${idPrefix}uf`}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="UF"
                maxLength={UF_LENGTH}
                uppercase
                disabled={disabled || isLoading}
                invalid={Boolean(errors.uf)}
              />
            </FieldRow>
          )}
        />
      </div>
    </m.fieldset>
  );
}
