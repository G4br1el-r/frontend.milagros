"use client";
import { motion } from "motion/react";
import { useCallback } from "react";
import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormSetValue,
} from "react-hook-form";
import type { CustomerFormValues } from "@/lib/customer/customer.schemas";
import { useCepLookup } from "@/lib/hooks/use-cep-lookup";
import { CepField } from "../Fields/CepField";
import { FieldRow } from "../Fields/FieldRow";
import { NumberField } from "../Fields/NumberField";
import { TextField } from "../Fields/TextField";
import { fieldVariants } from "../identity.motion";

interface RegisterAddressSectionProps {
  control: Control<CustomerFormValues>;
  errors: FieldErrors<CustomerFormValues>;
  setValue: UseFormSetValue<CustomerFormValues>;
  disabled?: boolean;
}
export function RegisterAddressSection({
  control,
  errors,
  setValue,
  disabled,
}: RegisterAddressSectionProps) {
  const onFound = useCallback(
    (fields: {
      logradouro: string;
      bairro: string;
      cidade: string;
      uf: string;
    }) => {
      setValue("logradouro", fields.logradouro, { shouldValidate: true });
      setValue("bairro", fields.bairro, { shouldValidate: true });
      setValue("cidade", fields.cidade, { shouldValidate: true });
      setValue("uf", fields.uf, { shouldValidate: true });
    },
    [setValue],
  );
  const { lookup, isLoading, error } = useCepLookup(onFound);
  return (
    <motion.fieldset variants={fieldVariants} className="flex flex-col gap-4">
      <legend className="mb-1 font-display text-sm text-primary">
        Endereço
      </legend>
      <Controller
        control={control}
        name="cep"
        render={({ field }) => (
          <FieldRow
            id="cep"
            label="CEP"
            error={errors.cep?.message ?? error ?? undefined}
          >
            <CepField
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
            id="logradouro"
            label="Logradouro"
            error={errors.logradouro?.message}
          >
            <TextField
              id="logradouro"
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
      <div className="grid grid-cols-2 gap-3">
        <Controller
          control={control}
          name="numero"
          render={({ field }) => (
            <FieldRow id="numero" label="Número" error={errors.numero?.message}>
              <NumberField
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
              id="complemento"
              label="Complemento"
              error={errors.complemento?.message}
            >
              <TextField
                id="complemento"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Apto, bloco…"
                autoComplete="address-line3"
                disabled={disabled}
                maxLength={60}
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
          <FieldRow id="bairro" label="Bairro" error={errors.bairro?.message}>
            <TextField
              id="bairro"
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
            <FieldRow id="cidade" label="Cidade" error={errors.cidade?.message}>
              <TextField
                id="cidade"
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
            <FieldRow id="uf" label="UF" error={errors.uf?.message}>
              <TextField
                id="uf"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="UF"
                maxLength={2}
                uppercase
                disabled={disabled || isLoading}
                invalid={Boolean(errors.uf)}
              />
            </FieldRow>
          )}
        />
      </div>
    </motion.fieldset>
  );
}
