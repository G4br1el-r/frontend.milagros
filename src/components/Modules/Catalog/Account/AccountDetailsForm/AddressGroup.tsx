"use client";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import { CepField } from "@/components/Modules/Catalog/Identity/Fields/CepField";
import { FieldRow } from "@/components/Modules/Catalog/Identity/Fields/FieldRow";
import { NumberField } from "@/components/Modules/Catalog/Identity/Fields/NumberField";
import { TextField } from "@/components/Modules/Catalog/Identity/Fields/TextField";
import type { CustomerFormValues } from "@/lib/customer/customer.schemas";

interface AddressGroupProps {
  control: Control<CustomerFormValues>;
  errors: FieldErrors<CustomerFormValues>;
  isSubmitting: boolean;
  isCepLoading: boolean;
  cepError: string | null;
  lookup: (cep: string) => void;
}
export function AddressGroup({
  control,
  errors,
  isSubmitting,
  isCepLoading,
  cepError,
  lookup,
}: AddressGroupProps) {
  return (
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
  );
}
