"use client";

import { type MaskDispatch, MaskedField } from "../MaskedField";

const MASKS = [{ mask: "(00) 0000-0000" }, { mask: "(00) 00000-0000" }];

const LANDLINE_DIGITS = 10;

/** Passou de 10 digitos: troca para a mascara de celular. */
const dispatchPhoneMask: MaskDispatch = (appended, dynamicMasked) => {
  const digits = (dynamicMasked.value + appended).replace(/\D/g, "");
  return dynamicMasked.compiledMasks[digits.length > LANDLINE_DIGITS ? 1 : 0];
};

interface PhoneFieldProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  invalid?: boolean;
}

/** Alterna entre fixo (10 digitos) e celular (11) conforme a digitacao. */
export function PhoneField({
  id = "telefone",
  value,
  onChange,
  onBlur,
  disabled,
  invalid,
}: PhoneFieldProps) {
  return (
    <MaskedField
      id={id}
      mask={MASKS}
      dispatch={dispatchPhoneMask}
      value={value}
      onAccept={onChange}
      onBlur={onBlur}
      placeholder="(00) 00000-0000"
      inputMode="tel"
      autoComplete="tel"
      disabled={disabled}
      invalid={invalid}
    />
  );
}
