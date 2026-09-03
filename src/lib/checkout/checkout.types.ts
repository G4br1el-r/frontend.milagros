/** Item enviado nas duas etapas do checkout. */
export interface ItemCheckoutDto {
  codigoOmie: string;
  descricao: string;
  unidade: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

/** Corpo de POST /api/checkout. */
export interface CheckoutRequest {
  cpfCnpj: string;
  tipoCliente: string | null;
  subtotal: number;
  desconto: number;
  total: number;
  itens: ItemCheckoutDto[];
}

export interface ParcelaOpcaoDto {
  numeroParcelas: number;
  prazosDescricao: string | null;
  valorParcela: number;
  valorTotal: number;
  codigoOmie: string;
  diasVencimento: number[];
  datasVencimentoSugeridas: string[];
}

export interface FormaPagamentoDto {
  id: string;
  nome: string;
  codigoOmie: string;
  tipoCliente: string;
  /** "Boleto" | "Cartao" | "Pix" — observados na API. */
  tipoForma: string;
  valorMinimo: number;
  valorMaximo: number | null;
  parcelasMaximas: number;
  prazosDescricao: string | null;
  parcelasDisponiveis: number[];
  opcoesParcelamento: ParcelaOpcaoDto[];
}

/**
 * Resposta de POST /api/checkout — chega tanto no 200 quanto no 400,
 * por isso a UI decide pelo campo `valido`, nunca pelo status HTTP.
 */
export interface CheckoutResponse {
  valido: boolean;
  mensagem: string | null;
  primeiraCompra: boolean;
  tipoClienteDetectado: string | null;
  valorMinimoAplicado: number;
  totalPedido: number;
  formasPagamento: FormaPagamentoDto[];
}

/** Corpo de POST /api/checkout/finalizar. */
export interface FinalizarCheckoutRequest {
  codigoClienteOmie: number | null;
  cpfCnpj: string;
  tipoCliente: string | null;
  nomeRazaoSocial: string;
  email: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  /** Atencao: aqui o campo chama `estado`, e nao `uf` como no cadastro. */
  estado: string;
  itens: ItemCheckoutDto[];
  formaPagamentoId: string | null;
  formaPagamentoNome: string;
  numeroParcelas: number;
  codigoParcela: string;
  diasVencimento: number[];
  observacoes: string;
}

export interface PedidoItemDto {
  id: string;
  codigoItemIntegracao: string | null;
  codigoProdutoOmie: string | null;
  descricao: string | null;
  unidade: string | null;
  quantidade: number;
  valorUnitario: number;
  valorDesconto: number;
  valorTotal: number;
}

export interface PedidoParcelaDto {
  id: string;
  numeroParcela: number;
  dataVencimento: string;
  percentual: number;
  valor: number;
}

export interface PedidoDetalhesDto {
  id: string;
  codigoPedidoIntegracao: string | null;
  numeroPedidoOmie: string | null;
  codigoClienteOmie: number;
  codigoVendedorOmie: number | null;
  dataPedido: string;
  dataPrevisao: string | null;
  etapa: string | null;
  status: string | null;
  mensagemOmie: string | null;
  valorSubtotal: number;
  valorDesconto: number;
  valorTotal: number;
  itens: PedidoItemDto[];
  parcelas: PedidoParcelaDto[];
}

/** Resposta de POST /api/checkout/finalizar — tambem chega no 400. */
export interface FinalizarCheckoutResponse {
  sucesso: boolean;
  mensagem: string | null;
  pedidoId: string | null;
  numeroPedido: string | null;
  codigoPedidoIntegracao: string | null;
  numeroPedidoOmie: string | null;
  valorTotal: number;
  pdfUrl: string | null;
  whatsappUrl: string | null;
  pedido: PedidoDetalhesDto | null;
}
