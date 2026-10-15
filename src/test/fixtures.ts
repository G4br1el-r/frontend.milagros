import type {
  ProdutoCatalogoDto,
  ProdutoVariacaoDto,
} from "@/components/Modules/Catalog/Home/Products/product.types";
import type {
  FormaPagamentoDto,
  ParcelaOpcaoDto,
  PedidoDetalhesDto,
  PedidoItemDto,
  PedidoParcelaDto,
} from "@/lib/checkout/checkout.types";
import type { Customer } from "@/lib/customer/customer.types";
import type { CartItem } from "@/lib/stores/cart";

export const VALID_CPF = "52998224725";
export const VALID_CNPJ = "54550752000155";

export function makeCustomer(overrides: Partial<Customer> = {}): Customer {
  return {
    id: "cliente-1",
    cpfCnpj: VALID_CPF,
    nomeRazaoSocial: "Maria da Silva",
    email: "maria@example.com",
    telefone: "11987654321",
    cep: "01310100",
    logradouro: "Avenida Paulista",
    numero: "1000",
    complemento: "Apto 12",
    bairro: "Bela Vista",
    cidade: "Sao Paulo",
    uf: "SP",
    codigoClienteOmie: 321,
    ...overrides,
  };
}

export function makeCartItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: "produto-1",
    productId: "produto-1",
    name: "Vela aromatica",
    variantName: null,
    image: null,
    price: 10,
    quantity: 1,
    ...overrides,
  };
}

export function makeParcela(
  overrides: Partial<ParcelaOpcaoDto> = {},
): ParcelaOpcaoDto {
  return {
    numeroParcelas: 1,
    prazosDescricao: null,
    valorParcela: 100,
    valorTotal: 100,
    codigoOmie: "000",
    diasVencimento: [0],
    datasVencimentoSugeridas: [],
    ...overrides,
  };
}

export function makeFormaPagamento(
  overrides: Partial<FormaPagamentoDto> = {},
): FormaPagamentoDto {
  return {
    id: "forma-pix",
    nome: "Pix",
    codigoOmie: "PIX",
    tipoCliente: "Varejo",
    tipoForma: "Pix",
    valorMinimo: 0,
    valorMaximo: null,
    parcelasMaximas: 1,
    prazosDescricao: null,
    parcelasDisponiveis: [1],
    opcoesParcelamento: [makeParcela()],
    ...overrides,
  };
}

export function makePedidoItem(
  overrides: Partial<PedidoItemDto> = {},
): PedidoItemDto {
  return {
    id: "item-1",
    codigoItemIntegracao: null,
    codigoProdutoOmie: null,
    descricao: "Vela aromatica",
    unidade: "UN",
    quantidade: 1,
    valorUnitario: 10,
    valorDesconto: 0,
    valorTotal: 10,
    ...overrides,
  };
}

export function makePedidoParcela(
  overrides: Partial<PedidoParcelaDto> = {},
): PedidoParcelaDto {
  return {
    id: "parcela-1",
    numeroParcela: 1,
    dataVencimento: "2026-01-10T00:00:00.000Z",
    percentual: 100,
    valor: 100,
    ...overrides,
  };
}

export function makePedido(
  overrides: Partial<PedidoDetalhesDto> = {},
): PedidoDetalhesDto {
  return {
    id: "pedido-1",
    codigoPedidoIntegracao: null,
    numeroPedidoOmie: "1001",
    codigoClienteOmie: 321,
    codigoVendedorOmie: null,
    dataPedido: "2026-01-10T10:00:00.000Z",
    dataPrevisao: null,
    etapa: null,
    status: "Faturado",
    statusOmie: null,
    mensagemOmie: null,
    valorSubtotal: 100,
    valorDesconto: 0,
    valorTotal: 100,
    valorOrcamento: null,
    valorFinal: null,
    itens: [],
    parcelas: [],
    ...overrides,
  };
}

export function makeVariacaoDto(
  overrides: Partial<ProdutoVariacaoDto> = {},
): ProdutoVariacaoDto {
  return {
    id: "variacao-1",
    codigoOmie: "BYZi05B",
    idLojaIntegrada: "263126902",
    nome: "Barrica de 50g",
    tipoVariacao: "Embalagem",
    preco: 36.25,
    precoDe: null,
    estoqueAtual: null,
    ativo: true,
    ...overrides,
  };
}

export function makeProdutoDto(
  overrides: Partial<ProdutoCatalogoDto> = {},
): ProdutoCatalogoDto {
  return {
    codigoOmie: "PAI-1-GREGO-BYZANTINE-INTENSO",
    nome: "#1 GREGO BYZANTINE INTENSO",
    preco: 36.25,
    unidade: null,
    pesoKg: null,
    altura: null,
    largura: null,
    profundidade: null,
    estoqueAtual: null,
    descricao: null,
    categoria: "Incensos",
    imagens: ["https://cdn.example.com/byzantine.png"],
    precoDe: null,
    tempoQueima: null,
    tipo: null,
    rating: 5,
    totalAvaliacoes: 0,
    variacoes: [],
    ...overrides,
  };
}
