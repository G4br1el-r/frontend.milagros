import { cnpj, cpf } from "cpf-cnpj-validator";
import { z } from "zod";
import {
  CEP_LENGTH,
  CNPJ_LENGTH,
  COMPLEMENTO_MAX_LENGTH,
  CPF_LENGTH,
  UF_LENGTH,
} from "./customer.constants";
import type {
  ClienteAtualizarRequest,
  ClienteCadastroRequest,
} from "./customer.types";

const onlyDigits = (value: string) => value.replace(/\D/g, "");
export const documentSchema = z
  .string()
  .trim()
  .min(1, "Informe seu CPF ou CNPJ")
  .transform(onlyDigits)
  .refine(
    (digits) => digits.length === CPF_LENGTH || digits.length === CNPJ_LENGTH,
    "Documento incompleto",
  )
  .refine(
    (digits) =>
      digits.length === CPF_LENGTH ? cpf.isValid(digits) : cnpj.isValid(digits),
    "Documento invalido",
  );
export const documentFormSchema = z.object({
  cpfCnpj: documentSchema,
});
export type DocumentFormValues = z.input<typeof documentFormSchema>;
export type DocumentFormOutput = z.output<typeof documentFormSchema>;
export const customerFormSchema = z.object({
  cpfCnpj: documentSchema,
  nomeRazaoSocial: z
    .string()
    .trim()
    .min(3, "Informe o nome ou razao social")
    .max(120, "Nome muito longo"),
  email: z.string().trim().min(1, "Informe o e-mail").email("E-mail invalido"),
  telefone: z
    .string()
    .transform(onlyDigits)
    .refine(
      (digits) => digits.length === 10 || digits.length === 11,
      "Telefone incompleto",
    ),
  cep: z
    .string()
    .transform(onlyDigits)
    .refine((digits) => digits.length === CEP_LENGTH, "CEP incompleto"),
  logradouro: z.string().trim().min(1, "Informe o logradouro"),
  numero: z.string().trim().min(1, "Informe o numero"),
  complemento: z
    .string()
    .trim()
    .max(COMPLEMENTO_MAX_LENGTH, "Complemento muito longo"),
  bairro: z.string().trim().min(1, "Informe o bairro"),
  cidade: z.string().trim().min(1, "Informe a cidade"),
  uf: z.string().trim().length(UF_LENGTH, "UF invalida"),
});
export type CustomerFormValues = z.input<typeof customerFormSchema>;
export type CustomerFormOutput = z.output<typeof customerFormSchema>;
export const customerCreateRequestSchema = z.strictObject(
  customerFormSchema.shape,
) satisfies z.ZodType<ClienteCadastroRequest>;
export const customerUpdateRequestSchema = z.strictObject(
  customerFormSchema.omit({ cpfCnpj: true }).partial().shape,
) satisfies z.ZodType<ClienteAtualizarRequest>;
