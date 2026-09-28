"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { AddressSection } from "@/components/Modules/Catalog/Identity/CustomerFormSections/AddressSection";
import { IdentitySection } from "@/components/Modules/Catalog/Identity/CustomerFormSections/IdentitySection";
import { DocumentField } from "@/components/Modules/Catalog/Identity/Fields/DocumentField";
import { FieldError } from "@/components/Modules/Catalog/Identity/Fields/FieldError";
import { FieldRow } from "@/components/Modules/Catalog/Identity/Fields/FieldRow";
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
import { SERVER_ERROR_MIN_STATUS } from "@/lib/http/http.constants";
import { useCustomerStore } from "@/lib/stores/customer";
import { appToast } from "@/lib/toast/toast";

const ACCOUNT_FIELD_ID_PREFIX = "account-";
const ACCOUNT_DOCUMENT_ID = `${ACCOUNT_FIELD_ID_PREFIX}documento`;
interface AccountDetailsFormProps {
  customer: Customer;
}
export function AccountDetailsForm({ customer }: AccountDetailsFormProps) {
  const identify = useCustomerStore((state) => state.identify);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submitErrorId = useId();
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
        error instanceof CustomerApiError &&
          error.status >= SERVER_ERROR_MIN_STATUS
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
      aria-describedby={submitError ? submitErrorId : undefined}
      noValidate
    >
      <IdentitySection
        control={control}
        errors={errors}
        idPrefix={ACCOUNT_FIELD_ID_PREFIX}
        disabled={isSubmitting}
        layout="grid"
        hideLegend
        documentSlot={
          <FieldRow id={ACCOUNT_DOCUMENT_ID} label="CPF ou CNPJ">
            <DocumentField
              id={ACCOUNT_DOCUMENT_ID}
              value={formatDocument(customer.cpfCnpj)}
              onChange={() => {}}
              disabled
            />
          </FieldRow>
        }
      />
      <div className="border-t border-primary/10 pt-6">
        <AddressSection
          control={control}
          errors={errors}
          setValue={setValue}
          idPrefix={ACCOUNT_FIELD_ID_PREFIX}
          disabled={isSubmitting}
          layout="grid"
        />
      </div>
      <div className="flex flex-col gap-2">
        <FieldError id={submitErrorId} message={submitError ?? undefined} />
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
