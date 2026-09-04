export interface ItemCheckoutDto {
  codigoOmie: string;
  descricao: string;
  unidade: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}
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
  tipoForma: string;
  valorMinimo: number;
  valorMaximo: number | null;
  parcelasMaximas: number;
  prazosDescricao: string | null;
  parcelasDisponiveis: number[];
  opcoesParcelamento: ParcelaOpcaoDto[];
}
export interface CheckoutResponse {
  valido: boolean;
  mensagem: string | null;
  primeiraCompra: boolean;
  tipoClienteDetectado: string | null;
  valorMinimoAplicado: number;
  totalPedido: number;
  formasPagamento: FormaPagamentoDto[];
}
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
