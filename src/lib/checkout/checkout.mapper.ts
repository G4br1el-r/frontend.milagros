import type { Customer } from "@/lib/customer/customer.types";
import type { CartItem } from "@/lib/stores/cart";
import { DEFAULT_UNIT } from "./checkout.constants";
import type {
  CheckoutRequest,
  FinalizarCheckoutRequest,
  FormaPagamentoDto,
  ItemCheckoutDto,
  ParcelaOpcaoDto,
} from "./checkout.types";

function toMoney(value: number): number {
  return Math.round(value * 100) / 100;
}
export function cartItemToCheckoutItem(item: CartItem): ItemCheckoutDto {
  return {
    codigoOmie: item.id,
    descricao: item.name,
    unidade: DEFAULT_UNIT,
    quantidade: item.quantity,
    precoUnitario: item.price,
    subtotal: toMoney(item.price * item.quantity),
  };
}
export function buildCheckoutRequest(
  items: CartItem[],
  cpfCnpj: string,
): CheckoutRequest {
  const itens = items.map(cartItemToCheckoutItem);
  const subtotal = toMoney(
    itens.reduce((total, item) => total + item.subtotal, 0),
  );
  return {
    cpfCnpj,
    tipoCliente: null,
    subtotal,
    desconto: 0,
    total: subtotal,
    itens,
  };
}
interface FinalizePayloadInput {
  customer: Customer;
  items: CartItem[];
  forma: FormaPagamentoDto;
  parcela: ParcelaOpcaoDto;
  tipoCliente: string | null;
  observacoes: string;
}
export function buildFinalizeRequest({
  customer,
  items,
  forma,
  parcela,
  tipoCliente,
  observacoes,
}: FinalizePayloadInput): FinalizarCheckoutRequest {
  return {
    codigoClienteOmie: customer.codigoClienteOmie,
    cpfCnpj: customer.cpfCnpj,
    tipoCliente,
    nomeRazaoSocial: customer.nomeRazaoSocial,
    email: customer.email,
    telefone: customer.telefone,
    cep: customer.cep,
    logradouro: customer.logradouro,
    numero: customer.numero,
    complemento: customer.complemento,
    bairro: customer.bairro,
    cidade: customer.cidade,
    estado: customer.uf,
    itens: items.map(cartItemToCheckoutItem),
    formaPagamentoId: forma.id,
    formaPagamentoNome: forma.nome,
    numeroParcelas: parcela.numeroParcelas,
    codigoParcela: parcela.codigoOmie,
    diasVencimento: parcela.diasVencimento,
    observacoes,
  };
}
