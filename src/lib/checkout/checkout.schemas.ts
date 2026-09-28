import { z } from "zod";
import { documentSchema } from "@/lib/customer/customer.schemas";
import { ORDER_ID_MAX_LENGTH, ORDER_ID_PATTERN } from "./checkout.constants";
import type {
  CheckoutRequest,
  FinalizarCheckoutRequest,
  ItemCheckoutDto,
} from "./checkout.types";

const documentValueSchema = z
  .string()
  .refine(
    (value) => documentSchema.safeParse(value).success,
    "Documento invalido",
  );
const amountSchema = z.number().nonnegative();
const checkoutItemSchema = z.strictObject({
  codigoOmie: z.string().nonempty(),
  descricao: z.string(),
  unidade: z.string(),
  quantidade: z.number().int().positive(),
  precoUnitario: amountSchema,
  subtotal: amountSchema,
}) satisfies z.ZodType<ItemCheckoutDto>;
const checkoutItemsSchema = z.array(checkoutItemSchema).nonempty();
export const checkoutRequestSchema = z.strictObject({
  cpfCnpj: documentValueSchema,
  tipoCliente: z.string().nullable(),
  subtotal: amountSchema,
  desconto: amountSchema,
  total: amountSchema,
  itens: checkoutItemsSchema,
}) satisfies z.ZodType<CheckoutRequest>;
export const finalizarCheckoutRequestSchema = z.strictObject({
  codigoClienteOmie: z.number().int().nullable(),
  cpfCnpj: documentValueSchema,
  tipoCliente: z.string().nullable(),
  nomeRazaoSocial: z.string(),
  email: z.string(),
  telefone: z.string(),
  cep: z.string(),
  logradouro: z.string(),
  numero: z.string(),
  complemento: z.string(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string(),
  itens: checkoutItemsSchema,
  formaPagamentoId: z.string().nullable(),
  formaPagamentoNome: z.string(),
  numeroParcelas: z.number().int().positive(),
  codigoParcela: z.string(),
  diasVencimento: z.array(z.number().int().nonnegative()),
  observacoes: z.string(),
}) satisfies z.ZodType<FinalizarCheckoutRequest>;
export const orderIdSchema = z
  .string()
  .max(ORDER_ID_MAX_LENGTH)
  .regex(ORDER_ID_PATTERN);
