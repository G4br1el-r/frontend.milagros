# API MILAGROS — Mapeamento de endpoints

Base: `https://catalogo-milagros.betaup.com.br`
Swagger: `/swagger/index.html` · Spec: `/swagger/v1/swagger.json`
Auth: usuário/senha em `.env.local` (`CATALOG_API_USER` / `CATALOG_API_PASSWORD`) trocados por JWT em `POST /api/auth/login`.

A API expõe dois grupos de rotas: `/admin/*` (MVC do painel administrativo, fora de escopo — server-side rendered, não é para o front público) e `/api/*` (REST, consumido por este projeto). Este documento cobre apenas `/api/*`.

Status:
- ✅ **Em uso** — já integrado no front.
- ⭕ **Disponível, não usado** — existe na API, útil para o catálogo público, ainda não integrado.
- 🔒 **Admin/integração, não usar aqui** — gestão de sincronização Omie/Loja Integrada, é ferramenta de backoffice.

---

## Autenticação

### ✅ `POST /api/auth/login`
Troca usuário/senha por JWT.

**Body**
| campo | tipo |
|---|---|
| usuario | string |
| senha | string |

**Resposta 200**
| campo | tipo |
|---|---|
| accessToken | string |
| tokenType | string |
| expiraEmMinutos | integer |
| codigoTabelaPreco | string |
| nomeTabelaPreco | string |

Usado em `src/lib/auth` — o token e `codigoTabelaPreco` (tabela de preço do atacado logado) alimentam as chamadas subsequentes via `withAuthRetry` / `withPriceTableParams` (`src/lib/api/`).

---

## Produtos

### ✅ `GET /api/produtos`
Catálogo paginado com filtros. Proxied em `src/app/api/produtos/route.ts`.

**Query params**
| param | tipo | obs |
|---|---|---|
| Termo | string | busca livre |
| Letra | string | filtro alfabético |
| Categoria | string | |
| PrecoMin / PrecoMax | number | faixa de preço |
| Ordenacao | string | |
| Page / PageSize | integer | |
| codigoTabelaPreco | string | injetado automaticamente por `withPriceTableParams` |
| forcarAtualizacao | boolean | bypass de cache — não expor no front público |

**Resposta 200 — `ProdutoCatalogoDtoResultadoPaginadoDto`**
| campo | tipo |
|---|---|
| itens / items | array de `ProdutoCatalogoDto` |
| pagina / page | integer |
| pageSize | integer |
| total | integer |
| totalPaginas / totalPages | integer |

**`ProdutoCatalogoDto`**
| campo | tipo | obs |
|---|---|---|
| codigoOmie | string | id do produto |
| nome | string | |
| preco | number | |
| precoDe | number | preço riscado, se em promoção |
| unidade | string | |
| pesoKg | number | |
| altura / largura / profundidade | string | dimensão — usar na ficha técnica |
| estoqueAtual | integer | **ignorado no front** (regra do projeto — sempre null hoje) |
| descricao | string | |
| categoria | string | |
| imagens | array de string | URLs |
| tempoQueima | string | ficha técnica de incenso |
| tipo | string | |
| rating | number | |
| totalAvaliacoes | integer | não há prova de que exista conteúdo real — checar antes de exibir |
| variacoes | array de `ProdutoVariacaoDto` | |

**`ProdutoVariacaoDto`**: `id`, `codigoOmie`, `idLojaIntegrada`, `nome`, `tipoVariacao`, `preco`, `precoDe`, `estoqueAtual`, `ativo`.

### ✅ `GET /api/produtos/letras`
Opções do filtro alfabético. Proxied em `src/app/api/produtos/letras/route.ts`.
Query: `codigoTabelaPreco`. Resposta: array de `{ letra, totalProdutos }`.

### ✅ `GET /api/produtos/categorias`
Opções do filtro de categoria. Proxied em `src/app/api/produtos/categorias/route.ts`.
Query: `codigoTabelaPreco`. Resposta: array de `{ nome, totalProdutos }`.

### ✅ `GET /api/produtos/faixa-preco`
Min/max de preço disponível, para configurar o slider de faixa. Proxied em `src/app/api/produtos/faixa-preco/route.ts`.
Query: `codigoTabelaPreco`. Resposta: `{ precoMinimo, precoMaximo }`.

### ✅ `GET /api/produtos/pesquisa`
Mesma forma de `/api/produtos` (mesmos filtros e mesma resposta paginada) — parece ser variante de busca full-text. Proxied em `src/app/api/produtos/pesquisa/route.ts`.
**Verificar com o backend a diferença real de comportamento entre este e `/api/produtos?Termo=`** antes de manter os dois caminhos — hoje o projeto usa ambos e pode ser redundância.

### 🔒 Sincronização/Admin de produtos
`POST /api/produtos/sincronizar-categorias`, `POST /api/produtos/sincronizar-imagens`, `POST /api/produtos/cache/invalidar`, `POST /api/produtos/sincronizar`, `GET /api/produtos/admin/omie`, `GET /api/produtos/admin/loja-integrada`, `GET /api/produtos/admin/integracao`, `GET/POST /api/produtos/admin`, `PUT /api/produtos/admin/{codigoOmie}`, `POST /api/produtos/{produtoId}/variacoes`, `DELETE /api/produtos/variacoes/{variacaoId}`, `POST /api/produtos/agrupar`, `POST /api/produtos/criar-pai-e-agrupar`, `POST /api/produtos/desagrupar/{filhoId}` — todas de gestão de catálogo (Omie/Loja Integrada), não pertencem ao front público.

---

## Clientes (identidade / checkout)

### ✅ `GET /api/clientes/cpf/{cpfCnpj}`
Busca cliente já cadastrado pelo CPF/CNPJ. Usado em `src/lib/customer/customer.client.ts`.

**Resposta 200 — `ClienteResponse`**
| campo | tipo |
|---|---|
| id | UUID |
| cpfCnpj | string |
| nomeRazaoSocial | string |
| email | string |
| telefone | string |
| cep, logradouro, numero, complemento, bairro, cidade, uf | string |
| codigoClienteOmie | integer |

### ✅ `POST /api/clientes`
Cadastra cliente novo. Usado em `customer.client.ts`.
Body (`ClienteCadastroRequest`): `cpfCnpj`, `nomeRazaoSocial`, `email`, `telefone`, `cep`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `uf`.
Resposta 201: `ClienteResponse` (mesma forma acima).

### ⭕ `POST /api/clientes/buscar`
Busca avançada por múltiplos campos (`OmieClientesFiltro`: razão social, CNPJ, cidade, etc). Não usado — hoje a busca de cliente é só por CPF/CNPJ exato via `GET /api/clientes/cpf/{cpfCnpj}`. Só faria sentido se o fluxo de identidade ganhar uma busca mais flexível (ex.: autocomplete por nome).

### ✅ `GET /api/enderecos/{cep}`
Lookup de CEP (formato ViaCEP). Usado em `customer.client.ts`.

---

## Formas de pagamento

### ⭕ `GET /api/formas-pagamento`
Lista formas de pagamento disponíveis, com `ParcelaOpcaoDto` (parcelas, valor, prazos). **Não é chamado diretamente hoje** — o checkout recebe `formasPagamento` embutido na resposta de `POST /api/checkout`. Pode valer a pena usar este endpoint para exibir formas de pagamento genéricas fora do fluxo de checkout (ex.: página institucional "formas de pagamento aceitas"), mas para o checkout em si a resposta embutida já resolve.

### 🔒 `POST/PUT/DELETE /api/admin/formas-pagamento*`
Gestão de formas de pagamento — admin.

---

## Checkout

### ✅ `POST /api/checkout`
Valida carrinho antes de finalizar (calcula total, detecta tipo de cliente, valor mínimo, formas de pagamento elegíveis). Usado em `src/lib/checkout/checkout.client.ts`.

**Body (`CheckoutRequest`)**: `cpfCnpj`, `tipoCliente`, `subtotal`, `desconto`, `total`, `itens: ItemCheckoutDto[]`.
`ItemCheckoutDto`: `codigoOmie`, `descricao`, `unidade`, `quantidade`, `precoUnitario`, `subtotal`.

**Resposta (`CheckoutResponse`, chega tanto no 200 quanto no 400)**
| campo | tipo |
|---|---|
| valido | boolean |
| mensagem | string |
| primeiraCompra | boolean |
| tipoClienteDetectado | string |
| valorMinimoAplicado | number |
| totalPedido | number |
| formasPagamento | array de `FormaPagamentoDto` |

### ✅ `POST /api/checkout/finalizar`
Fecha o pedido. Usado em `checkout.client.ts`.

**Body (`FinalizarCheckoutRequest`)**: dados do cliente (`codigoClienteOmie`, `cpfCnpj`, `tipoCliente`, `nomeRazaoSocial`, `email`, `telefone`, endereço completo), `itens: ItemCheckoutDto[]`, `formaPagamentoId`, `formaPagamentoNome`, `numeroParcelas`, `codigoParcela`, `diasVencimento`, `observacoes`.

**Resposta (`FinalizarCheckoutResponse`)**
| campo | tipo |
|---|---|
| sucesso | boolean |
| mensagem | string |
| pedidoId | UUID |
| numeroPedido | string |
| codigoPedidoIntegracao | string |
| numeroPedidoOmie | string |
| valorTotal | number |
| pdfUrl | string |
| whatsappUrl | string |
| pedido | `PedidoDetalhesDto` |

---

## Pedidos

### ✅ `GET /api/pedidos/{id}`
Detalhe de um pedido (ex.: tela de confirmação pós-checkout). Usado em `checkout.client.ts` e `src/app/api/pedidos/[id]/route.ts`.

**Resposta (`PedidoDetalhesDto`)**
| campo | tipo |
|---|---|
| id | UUID |
| codigoPedidoIntegracao, numeroPedidoOmie | string |
| codigoClienteOmie, codigoVendedorOmie | integer |
| dataPedido, dataPrevisao | date-time |
| etapa, status, mensagemOmie | string |
| valorSubtotal, valorDesconto, valorTotal | number |
| itens | array de `PedidoItemDto` |
| parcelas | array de `PedidoParcelaDto` |

### ⭕ `GET /api/pedidos`
Lista pedidos (com filtros — provavelmente por cliente). Não usado. Relevante para uma futura área "meus pedidos" no front do cliente atacadista, se vier a existir.

### ⭕ `POST /api/pedidos`
Cria pedido "cru" (via `CriarPedidoRequest`, com códigos Omie, NCM, CFOP etc.) — parece ser a rota de baixo nível usada internamente por `checkout/finalizar` ou pelo admin. **Não usar no front**: o fluxo público já é coberto por `POST /api/checkout/finalizar`, que é de mais alto nível e não exige conhecimento de campos fiscais (NCM/CFOP).

### ⭕ `GET /api/pedidos/{id}/pdf`
Exporta PDF do pedido (binário). Não usado ainda — `FinalizarCheckoutResponse.pdfUrl` já entrega um link pronto; avaliar se este endpoint é o que gera esse link ou se é redundante.

---

## Configuração (tabela de preço)

### ⭕ `GET /api/admin/configuracao/tabelas-preco`
Lista tabelas de preço disponíveis. Hoje `codigoTabelaPreco` vem do login (`POST /api/auth/login`) e é aplicado automaticamente via `withPriceTableParams`. Não usado — só seria necessário se o front precisasse deixar o usuário trocar de tabela de preço manualmente.

### 🔒 `GET/PUT /api/admin/configuracao`
Configuração geral da integração — admin.

---

## Resumo — não integrar (admin/backoffice puro)

Todo o namespace `/admin/*` (login MVC do painel, categorias, clientes, configuração, dashboard, formas de pagamento, pedidos, produtos, usuários) e as rotas `/api/produtos/admin*`, `/api/produtos/sincronizar*`, `/api/produtos/agrupar`, `/api/produtos/desagrupar/*`, `/api/produtos/{id}/variacoes`, `/api/admin/formas-pagamento*` são ferramentas de gestão de catálogo/integração Omie ↔ Loja Integrada. Pertencem a um painel administrativo separado, não ao site institucional/e-commerce público.

## Resumo — candidatos à próxima integração

1. **`GET /api/formas-pagamento`** — exibir formas de pagamento aceitas fora do checkout (ex.: footer, página institucional).
2. **`GET /api/pedidos`** — base para uma futura tela "meus pedidos", se o projeto ganhar login persistente de cliente.
3. **Esclarecer `/api/produtos/pesquisa` vs `/api/produtos?Termo=`** — confirmar com o backend se são de fato distintos antes de manter as duas rotas proxied no front.
