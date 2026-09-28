"use client";
import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import type { CustomerFormValues } from "@/lib/customer/customer.schemas";
import { cn } from "@/lib/utils/cn";
import { DocumentField } from "../Fields/DocumentField";
import { FieldRow } from "../Fields/FieldRow";
import { PhoneField } from "../Fields/PhoneField";
import { TextField } from "../Fields/TextField";
import { fieldVariants } from "../identity.motion";
import type { CustomerFormLayout } from "./customer-form-sections.types";

interface IdentitySectionProps {
  control: Control<CustomerFormValues>;
  errors: FieldErrors<CustomerFormValues>;
  idPrefix: string;
  disabled?: boolean;
  layout?: CustomerFormLayout;
  documentSlot?: ReactNode;
  hideLegend?: boolean;
}
export function IdentitySection({
  control,
  errors,
  idPrefix,
  disabled,
  layout = "stack",
  documentSlot,
  hideLegend,
}: IdentitySectionProps) {
  const isGrid = layout === "grid";
  return (
    <m.fieldset
      variants={fieldVariants}
      className={
        isGrid ? "grid grid-cols-1 gap-4 sm:grid-cols-2" : "flex flex-col gap-4"
      }
    >
      <legend
        className={cn("font-display text-sm text-primary", {
          "sr-only": hideLegend,
          "mb-4": !hideLegend && isGrid,
          "mb-1": !hideLegend && !isGrid,
        })}
      >
        Seus dados
      </legend>
      {documentSlot ?? (
        <Controller
          control={control}
          name="cpfCnpj"
          render={({ field }) => (
            <FieldRow
              id={`${idPrefix}cpfCnpj`}
              label="CPF ou CNPJ"
              error={errors.cpfCnpj?.message}
            >
              <DocumentField
                id={`${idPrefix}cpfCnpj`}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={disabled}
                invalid={Boolean(errors.cpfCnpj)}
              />
            </FieldRow>
          )}
        />
      )}
      <Controller
        control={control}
        name="nomeRazaoSocial"
        render={({ field }) => (
          <FieldRow
            id={`${idPrefix}nomeRazaoSocial`}
            label="Nome ou razão social"
            error={errors.nomeRazaoSocial?.message}
          >
            <TextField
              id={`${idPrefix}nomeRazaoSocial`}
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
          <FieldRow
            id={`${idPrefix}email`}
            label="E-mail"
            error={errors.email?.message}
          >
            <TextField
              id={`${idPrefix}email`}
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
            id={`${idPrefix}telefone`}
            label="Telefone"
            error={errors.telefone?.message}
          >
            <PhoneField
              id={`${idPrefix}telefone`}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={disabled}
              invalid={Boolean(errors.telefone)}
            />
          </FieldRow>
        )}
      />
    </m.fieldset>
  );
}
