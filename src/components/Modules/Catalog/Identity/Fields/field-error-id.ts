const FIELD_ERROR_ID_SUFFIX = "erro";
export function getFieldErrorId(fieldId: string): string {
  return `${fieldId}-${FIELD_ERROR_ID_SUFFIX}`;
}
