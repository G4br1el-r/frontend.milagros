"use client";

import { CPF_LENGTH } from "@/lib/customer/customer.constants";
import { type MaskDispatch, MaskedField } from "../MaskedField";

const MASKS = [{ mask: "000.000.000-00" }, { mask: "00.000.000/0000-00" }];

/** Passou de 11 digitos: troca para a mascara de CNPJ. */
const dispatchDocumentMask: MaskDispatch = (appended, dynamicMasked) => {
  const digits = (dynamicMasked.value + appended).replace(/\D/g, "");
  return dynamicMasked.compiledMasks[digits.length > CPF_LENGTH ? 1 : 0];
};

interface DocumentFieldProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  invalid?: boolean;
}

/** Campo unico para CPF e CNPJ, alternando a mascara conforme a digitacao. */
export function DocumentField({
  id = "cpfCnpj",
  value,
  onChange,
  onBlur,
  disabled,
  invalid,
}: DocumentFieldProps) {
  return (
    <MaskedField
      id={id}
      mask={MASKS}
      dispatch={dispatchDocumentMask}
      value={value}
      onAccept={onChange}
      onBlur={onBlur}
      placeholder="CPF ou CNPJ"
      inputMode="numeric"
      autoComplete="off"
      disabled={disabled}
      invalid={invalid}
    />
  );
}
