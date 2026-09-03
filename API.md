# API do Catálogo Milagros — Guia de Integração

Base URL: `https://catalogo-milagros.betaup.com.br` (env `API_URL`)
Swagger: `/swagger/index.html` · Spec: `/swagger/v1/swagger.json`

> A API combina **produtos/preços da Omie** com **imagens/descrição da Loja Integrada**,
> mais cadastro de clientes, consulta de CEP e emissão de pedidos.

Tudo aqui foi validado contra a API em produção em 02/09/2026, com as credenciais
de serviço do `.env.local`. Os únicos itens não executados ao vivo são os `POST`
de checkout/cliente/pedido (descritos a partir do schema e marcados como tal).

---

## 1. Regras gerais

### 1.1 Divisão painel vs. catálogo

| Prefixo | Uso | Vamos consumir? |
|---|---|---|
| `/api/*` | API JSON do catálogo | **Sim** |
| `/admin/*` | Páginas Razor/MVC do painel (retornam HTML, não JSON) | **Não** |
| `/api/produtos/admin/*`, `/api/admin/*` | Gestão interna (edição de produto, config, formas de pagamento CRUD) | **Não** |
| `/api/produtos/sincronizar*`, `/api/produtos/cache/invalidar` | Rotinas de sync Omie/Loja Integrada | **Não** |

Este documento cobre apenas o que a vitrine precisa.

### 1.2 Autenticação

Todas as rotas de `/api/*` (exceto o próprio login) exigem `Authorization: Bearer <token>`.

```
POST /api/auth/login
{ "usuario": "...", "senha": "..." }
→ 200 { accessToken, tokenType: "Bearer", expiraEmMinutos: 60,
        codigoTabelaPreco: "5503323827", nomeTabelaPreco: null }
→ 401 ProblemDetails
```

Pontos importantes, já implementados em [token.ts](src/lib/auth/token.ts):

- Credenciais são **server-only** (`CATALOG_API_USER` / `CATALOG_API_PASSWORD`).
  Nunca prefixar com `NEXT_PUBLIC_` — vazaria o segredo no bundle do client.
- Token dura **60 minutos**; guardamos em cookie httpOnly com margem de segurança
  de 60s ([constants.ts](src/lib/auth/constants.ts)).
- `nomeTabelaPreco` volta `null` hoje — não dependa dele para exibição.
- O login também devolve o **`codigoTabelaPreco`**, que precisa ser propagado nas
  consultas de produto (ver 1.3).

### 1.3 Tabela de preço

`codigoTabelaPreco` é opcional em toda rota de produto, mas define **qual preço**
o cliente vê. Nós sempre enviamos, via
[with-price-table.ts](src/lib/api/with-price-table.ts), o código que veio do login.

Observação de comportamento: omitir o parâmetro **não** dá erro nem muda o total
(909 produtos nos dois casos) e o preço observado foi idêntico — mas isso é o
default do servidor, não uma garantia. Continue enviando explicitamente.

### 1.4 Erros e retry

- Erros seguem `ProblemDetails` ou `{ "mensagem": "..." }` conforme a rota.
- `401` → [with-auth-retry.ts](src/lib/api/with-auth-retry.ts) invalida o cookie e
  refaz a chamada uma vez.
- O client HTTP ([client.ts](src/lib/api-client/client.ts)) já converte status em
  erros tipados (`NotFoundError`, `UnauthorizedError`, `UpstreamError`, …).

---

## 2. Produtos — *já integrado*

### `GET /api/produtos`
Listagem paginada simples, sem filtros.

| Query | Tipo | Default |
|---|---|---|
| `page` | int | 1 |
| `pageSize` | int | — |
| `codigoTabelaPreco` | string | tabela padrão |
| `forcarAtualizacao` | bool | false — ignora cache, **lento**, evitar no client |

### `GET /api/produtos/pesquisa`
Rota principal da vitrine. **Atenção: parâmetros em PascalCase.**

| Query | Tipo | Observações |
|---|---|---|
| `Termo` | string | Busca em **nome e descrição** — `turibulo` traz itens cujo nome não contém a palavra. Explica resultados "estranhos" à primeira vista. |
| `Letra` | string | Inicial do nome |
| `Categoria` | string | Nome da categoria (string, não id) |
| `PrecoMin` / `PrecoMax` | number | |
| `Ordenacao` | string | Ver abaixo |
| `Page` / `PageSize` | int | |
| `codigoTabelaPreco` | string | camelCase, diferente dos demais |

**`Ordenacao`** — só `preco_asc` e `preco_desc` foram confirmados como efetivos.
`nome_desc` funciona. Valores não reconhecidos (inclusive `relevancia` e um valor
inventado) **caem silenciosamente no padrão alfabético ascendente**, sem erro —
então não confie num valor sem testar.

| Valor | Efeito |
|---|---|
| *(omitido)* / `nome_asc` | A→Z (padrão) |
| `nome_desc` | Z→A |
| `preco_asc` | Menor → maior |
| `preco_desc` | Maior → menor |

### Resposta — `ResultadoPaginadoDto`

⚠️ **A resposta duplica cada campo de paginação** em pt e en. Ambos trazem o mesmo
valor; escolha um par e mantenha consistência (usamos os em português).

```jsonc
{
  "itens": [...], "items": [...],          // idênticos
  "pagina": 1,    "page": 1,
  "pageSize": 2,
  "total": 909,
  "totalPaginas": 455, "totalPages": 455
}
```

### `ProdutoCatalogoDto`

```ts
{
  codigoOmie: string          // SKU — chave usada em carrinho e checkout
  nome: string
  preco: number               // ⚠️ até 6 casas decimais: 4.701509, 0.747725
  precoDe: number | null      // preço "de" para riscar
  unidade: string | null
  pesoKg: number | null
  altura / largura / profundidade: string | null
  estoqueAtual: number | null
  descricao: string | null    // ⚠️ HTML da Loja Integrada — sanitizar antes de render
  categoria: string | null
  imagens: string[]           // URLs absolutas (cdn.awsli.com.br)
  tempoQueima: string | null
  tipo: string | null
  rating: number | null
  totalAvaliacoes: number | null
}
```

Duas armadilhas confirmadas na amostra real:

1. **Muito campo vem `null`.** No produto testado, `unidade`, `pesoKg`, dimensões,
   `estoqueAtual`, `precoDe`, `tempoQueima` e `tipo` estavam todos nulos. Trate como
   opcionais de verdade na UI — não assuma que existem.
2. **`preco` tem precisão de 6 casas** e `rating` pode vir `5.0` com
   `totalAvaliacoes: 0` — ou seja, nota sem nenhuma avaliação. Não exiba estrelas
   quando `totalAvaliacoes === 0`.
3. `descricao` é **HTML bruto** com entidades e `\r\n`. Precisa de sanitização
   (dangerouslySetInnerHTML sem sanitizar = XSS).

### Filtros auxiliares

| Rota | Retorno | Nota |
|---|---|---|
| `GET /api/produtos/categorias` | `[{ nome, totalProdutos }]` | ~dezenas de categorias |
| `GET /api/produtos/letras` | `[{ letra, totalProdutos }]` | A–Z, **inclui letras com `totalProdutos: 0`** — filtre ou desabilite na UI |
| `GET /api/produtos/faixa-preco` | `{ precoMinimo, precoMaximo }` | Real: `0.05` → `1729.7172` |

Todos aceitam `codigoTabelaPreco`. Já expostos em
[categorias](src/app/api/produtos/categorias/route.ts),
[letras](src/app/api/produtos/letras/route.ts),
[faixa-preco](src/app/api/produtos/faixa-preco/route.ts).

---

## 3. Endereço (CEP) — *a integrar*

### `GET /api/enderecos/{cep}`
Aceita CEP com ou sem máscara. Resposta (formato ViaCEP, **não declarada no Swagger** —
capturada ao vivo):

```jsonc
{ "cep": "01310-100", "logradouro": "Avenida Paulista",
  "complemento": "de 612 a 1510 - lado par", "bairro": "Bela Vista",
  "localidade": "São Paulo", "uf": "SP" }
```

⚠️ O campo da cidade chama **`localidade`** (padrão ViaCEP), mas nos DTOs de
cliente/checkout o campo equivalente é **`cidade`**. É preciso mapear entre os dois.
Idem `uf` aqui vs. `estado` no `FinalizarCheckoutRequest`.

Uso: auto-preenchimento do endereço no checkout.

---

## 4. Clientes — *a integrar*

### `GET /api/clientes/cpf/{cpfCnpj}`
Busca local e, se não achar, na Omie. Usado para saber se o cliente já existe antes
de pedir o cadastro completo.

- `200` → `ClienteResponse`
- `404` → `{ "mensagem": "Cliente nao encontrado localmente nem na Omie." }`
  (confirmado ao vivo — **não** é `ProblemDetails`, e a mensagem vem sem acento)

### `POST /api/clientes` → `201 ClienteResponse`
```ts
ClienteCadastroRequest {
  cpfCnpj, nomeRazaoSocial, email, telefone,
  cep, logradouro, numero, complemento, bairro, cidade, uf
}
```
`ClienteResponse` = os mesmos campos + `id` (uuid) + `codigoClienteOmie` (int64 | null).

`codigoClienteOmie` é o que o checkout final consome. Pode vir `null` se a
sincronização com a Omie ainda não ocorreu — trate esse caso.

### `POST /api/clientes/buscar` → `200 ClienteResponse`
Busca por filtro no padrão Omie (`OmieClientesFiltro`, campos em `snake_case`:
`cnpj_cpf`, `razao_social`, `codigo_cliente_omie`, …). Para a vitrine, a busca por
CPF acima é mais direta; esta fica como alternativa.

---

## 5. Formas de pagamento — *a integrar*

### `GET /api/formas-pagamento` → `FormaPagamentoDto[]`

```ts
{
  id: string (uuid)          // usado em FinalizarCheckoutRequest.formaPagamentoId
  nome: string               // "Boleto Faturado (Acima de R$ 2.000) - 30/60/90d"
  codigoOmie: string         // "999"
  tipoCliente: string        // "Todos" | ...
  tipoForma: string          // "Boleto" | ...
  valorMinimo: number
  valorMaximo: number | null
  parcelasMaximas: number
  prazosDescricao: string | null
  parcelasDisponiveis: number[]      // [1,2,3]
  opcoesParcelamento: ParcelaOpcaoDto[]
}
```

⚠️ **Não use esta rota para montar a seleção de pagamento do checkout.** Na chamada
real, `opcoesParcelamento` volta **vazio** e `valorMinimo` é `0` em todas as formas —
mesmo nas que dizem "Acima de R$ 2.000" no nome. As regras de valor estão só no
texto do `nome`.

Quem resolve isso é o `POST /api/checkout`, que devolve as formas **já filtradas
pelo total do pedido** e com `opcoesParcelamento` preenchido. Use esta rota apenas
para exibição informativa (ex.: "formas de pagamento aceitas" no rodapé).

```ts
ParcelaOpcaoDto {
  numeroParcelas, prazosDescricao, valorParcela, valorTotal,
  codigoOmie, diasVencimento: number[], datasVencimentoSugeridas: string[]
}
```

---

## 6. Checkout — *a integrar* (fluxo de 2 etapas)

> `POST /api/checkout` foi **validado ao vivo** (ver regras abaixo).
> `POST /api/checkout/finalizar` teve apenas a validação sondada com corpo vazio
> — não foi executado por completo, porque emite pedido real na Omie.

### Regras de negócio confirmadas ao vivo (02/09/2026)

Testado com CPF sem histórico, tabela `5503323827`:

| Total | `valido` | Boleto | Cartão | Pix |
|---|---|---|---|---|
| R$ 22,70 | **false** — abaixo do mínimo | — | — | — |
| R$ 1.200 | true | 2x | 1–3x | à vista |
| R$ 2.270 | true | 3x (30/60/90d) | 1–3x | à vista |
| R$ 4.500 | true | 4x | 1–3x | à vista |

- **Primeira compra exige mínimo de R$ 1.200.** Abaixo disso a API responde
  `400` com `valido: false` e a mensagem explicando — nunca um erro opaco.
- `tipoClienteDetectado` voltou `"Revendedores"` em todos os testes, inclusive
  com CNPJ; a API detecta sozinha, não force `tipoCliente`.
- As parcelas de **boleto mudam por faixa de valor**; cartão e Pix são fixos.
- `opcoesParcelamento` vem preenchido aqui (com `valorParcela`,
  `diasVencimento` e `datasVencimentoSugeridas` já calculados), ao contrário
  de `GET /api/formas-pagamento`.

### Etapa 1 — `POST /api/checkout` (validar)

Valida o carrinho e **descobre as formas de pagamento elegíveis**. Não cria nada.

```ts
CheckoutRequest {
  cpfCnpj: string
  tipoCliente: string | null      // deixe null; a API detecta
  subtotal, desconto, total: number
  itens: ItemCheckoutDto[]
}
ItemCheckoutDto {
  codigoOmie, descricao, unidade,
  quantidade, precoUnitario, subtotal
}
```

Resposta (`200` **e também `400`** — sempre `CheckoutResponse`, então cheque
`valido`, não só o status):

```ts
CheckoutResponse {
  valido: boolean
  mensagem: string | null          // motivo da recusa
  primeiraCompra: boolean
  tipoClienteDetectado: string | null
  valorMinimoAplicado: number      // pedido mínimo que incidiu
  totalPedido: number
  formasPagamento: FormaPagamentoDto[]   // já filtradas p/ este total
}
```

Regra de UI: rode esta etapa **antes** de mostrar as opções de pagamento, e use
`valorMinimoAplicado` / `mensagem` para explicar bloqueios (pedido mínimo,
primeira compra, etc.).

### Etapa 2 — `POST /api/checkout/finalizar` (emitir pedido)

```ts
FinalizarCheckoutRequest {
  codigoClienteOmie: number | null   // de /api/clientes/cpf/{cpf}; null = cliente novo
  cpfCnpj, tipoCliente, nomeRazaoSocial, email, telefone,
  cep, logradouro, numero, complemento, bairro, cidade, estado,  // ⚠️ "estado", não "uf"
  itens: ItemCheckoutDto[],
  formaPagamentoId: uuid | null,     // FormaPagamentoDto.id
  formaPagamentoNome: string,
  numeroParcelas: number,
  codigoParcela: string,             // ParcelaOpcaoDto.codigoOmie
  diasVencimento: number[],          // ParcelaOpcaoDto.diasVencimento
  observacoes: string
}
```

```ts
FinalizarCheckoutResponse {
  sucesso: boolean                  // ⚠️ 400 também retorna este corpo
  mensagem: string | null
  pedidoId: uuid | null
  numeroPedido, codigoPedidoIntegracao, numeroPedidoOmie: string | null
  valorTotal: number
  pdfUrl: string | null
  whatsappUrl: string | null        // link de confirmação por WhatsApp
  pedido: PedidoDetalhesDto
}
```

`pdfUrl` e `whatsappUrl` são o desfecho natural da tela de sucesso.

**Fluxo completo sugerido:**
```
CPF → GET /api/clientes/cpf/{cpf}
        ├ 404 → POST /api/clientes (cadastro, com CEP via /api/enderecos)
        └ 200 → aproveita codigoClienteOmie
     → POST /api/checkout            (valida + lista formas de pagamento)
     → usuário escolhe forma/parcelas
     → POST /api/checkout/finalizar  (emite o pedido)
     → tela de sucesso com pdfUrl + whatsappUrl
```

---

## 7. Pedidos — *a integrar*

| Rota | Retorno | Nota |
|---|---|---|
| `GET /api/pedidos` | `PedidoDetalhesDto[]` | Confirmado ao vivo: hoje retorna `[]` |
| `GET /api/pedidos/{id}` | `PedidoDetalhesDto` · `404 ProblemDetails` | |
| `GET /api/pedidos/{id}/pdf` | `string` | Provavelmente URL ou base64 — **confirmar** |
| `POST /api/pedidos` | `201 PedidoDetalhesDto` · `400` | Criação crua na Omie (`CriarPedidoRequest`, exige `codigoCliente`, NCM/CFOP, parcelas). **Prefira `/api/checkout/finalizar`**, que monta tudo isso. |

```ts
PedidoDetalhesDto {
  id: uuid
  codigoPedidoIntegracao, numeroPedidoOmie: string | null
  codigoClienteOmie: number
  codigoVendedorOmie: number | null
  dataPedido: string (date-time)
  dataPrevisao: string | null
  etapa, status, mensagemOmie: string | null
  valorSubtotal, valorDesconto, valorTotal: number
  itens: PedidoItemDto[]      // codigoProdutoOmie, descricao, unidade,
                              // quantidade, valorUnitario, valorDesconto, valorTotal
  parcelas: PedidoParcelaDto[] // numeroParcela, dataVencimento, percentual, valor
}
```

⚠️ `GET /api/pedidos` não tem filtro por cliente na assinatura. Antes de expor um
"meus pedidos" na vitrine, confirme se ele escopa pelo token — senão vaza pedido de
outro cliente.

---

## 8. Resumo — o que falta integrar

Já em produção no front: auth, produtos, pesquisa, categorias, letras, faixa-preço.

| Prioridade | Rota | Para quê |
|---|---|---|
| Alta | `POST /api/checkout` | Validar carrinho + obter formas de pagamento reais |
| Alta | `POST /api/checkout/finalizar` | Emitir o pedido |
| Alta | `GET /api/clientes/cpf/{cpf}` | Identificar cliente no início do checkout |
| Alta | `POST /api/clientes` | Cadastrar cliente novo |
| Alta | `GET /api/enderecos/{cep}` | Auto-preencher endereço |
| Média | `GET /api/formas-pagamento` | Vitrine informativa (não para o checkout) |
| Média | `GET /api/pedidos/{id}` + `/pdf` | Acompanhar/baixar pedido |
| Baixa | `GET /api/pedidos` | Só com escopo por cliente confirmado |
| — | `POST /api/pedidos` | Evitar — usar `checkout/finalizar` |

### Padrão para novas rotas

Seguir o que já existe em [src/app/api/produtos/](src/app/api/produtos/):
BFF em `src/app/api/*` → `withAuthRetry(() => api.get/post(...))` →
`routeErrorResponse(error)` no catch. Assim o token nunca chega ao browser e o
retry de 401 é automático.

---

## 9. Pontos de atenção (consolidado)

1. **`pesquisa` usa PascalCase** (`Termo`, `Page`), mas `codigoTabelaPreco` é camelCase.
2. **Paginação duplicada** em pt/en no mesmo objeto.
3. **`Ordenacao` inválida não dá erro** — cai no padrão silenciosamente.
4. **`Termo` busca na descrição**, o que infla resultados.
5. **`descricao` é HTML bruto** — sanitizar obrigatoriamente.
6. **Quase todo campo de produto pode ser `null`**, inclusive `unidade` e `estoqueAtual`.
7. **`preco` com 6 decimais** — arredondar só na exibição, nunca no cálculo.
8. **`rating` 5.0 com 0 avaliações** — não renderizar estrelas nesse caso.
9. **`letras` traz letras com 0 produtos.**
10. **CEP devolve `localidade`/`uf`; checkout espera `cidade`/`estado`.**
11. **Checkout retorna corpo útil em 400** — cheque `valido`/`sucesso`, não o status.
12. **`GET /api/formas-pagamento` vem sem parcelamento e sem valor mínimo real** —
    as regras só saem do `POST /api/checkout`.
