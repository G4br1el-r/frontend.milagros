"use client";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import { DocumentField } from "@/components/Modules/Catalog/Identity/Fields/DocumentField";
import { FieldRow } from "@/components/Modules/Catalog/Identity/Fields/FieldRow";
import { PhoneField } from "@/components/Modules/Catalog/Identity/Fields/PhoneField";
import { TextField } from "@/components/Modules/Catalog/Identity/Fields/TextField";
import { formatDocument } from "@/lib/customer/customer.format";
import type { CustomerFormValues } from "@/lib/customer/customer.schemas";
import type { Customer } from "@/lib/customer/customer.types";

interface PersonalInfoGroupProps {
  control: Control<CustomerFormValues>;
  errors: FieldErrors<CustomerFormValues>;
  isSubmitting: boolean;
  customer: Customer;
}
export function PersonalInfoGroup({
  control,
  errors,
  isSubmitting,
  customer,
}: PersonalInfoGroupProps) {
  return (
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
  );
}
