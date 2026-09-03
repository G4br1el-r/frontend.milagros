"use client";

import { motion } from "motion/react";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import type { CustomerFormValues } from "@/lib/customer/customer.schemas";
import { DocumentField } from "../Fields/DocumentField";
import { FieldRow } from "../Fields/FieldRow";
import { PhoneField } from "../Fields/PhoneField";
import { TextField } from "../Fields/TextField";
import { fieldVariants } from "../identity.motion";

interface RegisterIdentitySectionProps {
  control: Control<CustomerFormValues>;
  errors: FieldErrors<CustomerFormValues>;
  disabled?: boolean;
}

export function RegisterIdentitySection({
  control,
  errors,
  disabled,
}: RegisterIdentitySectionProps) {
  return (
    <motion.fieldset variants={fieldVariants} className="flex flex-col gap-4">
      <legend className="mb-1 font-display text-sm text-primary">
        Seus dados
      </legend>

      <Controller
        control={control}
        name="cpfCnpj"
        render={({ field }) => (
          <FieldRow
            id="register-cpfCnpj"
            label="CPF ou CNPJ"
            error={errors.cpfCnpj?.message}
          >
            <DocumentField
              id="register-cpfCnpj"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={disabled}
              invalid={Boolean(errors.cpfCnpj)}
            />
          </FieldRow>
        )}
      />

      <Controller
        control={control}
        name="nomeRazaoSocial"
        render={({ field }) => (
          <FieldRow
            id="nomeRazaoSocial"
            label="Nome ou razão social"
            error={errors.nomeRazaoSocial?.message}
          >
            <TextField
              id="nomeRazaoSocial"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Nome completo"
              autoComplete="name"
              disabled={disabled}
              invalid={Boolean(errors.nomeRazaoSocial)}
            />
          </FieldRow>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <FieldRow id="email" label="E-mail" error={errors.email?.message}>
            <TextField
              id="email"
              type="email"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="voce@email.com"
              autoComplete="email"
              disabled={disabled}
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
            id="telefone"
            label="Telefone"
            error={errors.telefone?.message}
          >
            <PhoneField
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={disabled}
              invalid={Boolean(errors.telefone)}
            />
          </FieldRow>
        )}
      />
    </motion.fieldset>
  );
}
