import type { Metadata } from "next";
import { Body, Display, Heading, Latin, Meta } from "@/components/Typography";
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
const OPACITY_STEPS = [
  { value: 100, label: "texto primário, ícone ativo" },
  { value: 70, label: "texto secundário" },
  { value: 40, label: "texto desabilitado, ícone inativo" },
  { value: 20, label: "borda visível, divisor" },
  { value: 10, label: "borda sutil, hairline" },
  { value: 5, label: "fundo de superfície tênue" },
] as const;
const PALETTE = [
  { token: "ink", hex: "#12100D", usage: "fundo da página" },
  { token: "nave", hex: "#1C1813", usage: "superfícies elevadas" },
  { token: "linho", hex: "#EDE7DB", usage: "texto primário" },
  { token: "fumaca", hex: "#8F8A80", usage: "texto secundário" },
  { token: "ouro", hex: "#C6A15B", usage: "fio, small caps, ícone, foco" },
  { token: "brasa", hex: "#B6431A", usage: "ação" },
] as const;
const LITURGICAL = [
  { token: "roxo", hex: "#4A2A63", usage: "Advento / Quaresma" },
  { token: "verde", hex: "#1F5E3D", usage: "Tempo Comum" },
  { token: "vermelho", hex: "#8C1D18", usage: "Mártires / Pentecostes" },
] as const;
const TYPE_SCALE = [
  { step: "step-5", cardo: "clamp 3.05–6.15rem" },
  { step: "step-4", cardo: "clamp 2.44–4.36rem" },
  { step: "step-3", cardo: "clamp 1.95–3.09rem" },
  { step: "step-2", cardo: "clamp 1.56–2.19rem" },
  { step: "step-1", cardo: "clamp 1.25–1.55rem" },
  { step: "step-0", cardo: "clamp 1.00–1.10rem" },
  { step: "step-neg-1", cardo: "clamp 0.80–0.85rem" },
] as const;
const RADII = [
  { token: "r-sm", value: "2px", usage: "chip, input" },
  { token: "r-md", value: "6px", usage: "card" },
  { token: "r-lg", value: "14px", usage: "drawer, modal" },
] as const;
const SPACE_SCALE = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16] as const;
export default function DesignPage() {
  return (
    <main className="min-h-screen bg-ink px-6 py-16 sm:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <header className="flex flex-col gap-2">
          <Meta>Fase 1 — fundação</Meta>
          <Display as="h1" size="step-4">
            Tokens da Milagros
          </Display>
          <Body variant="ui" className="text-fumaca">
            Paleta, escada de opacidade, tipografia, espaço e raio — seções 2.2
            a 2.6 do CLAUDE.md. Nada aqui é produto.
          </Body>
        </header>
        <section className="flex flex-col gap-6">
          <Heading as="h2" size="step-2">
            Paleta
          </Heading>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {PALETTE.map((c) => (
              <div key={c.token} className="flex flex-col gap-2">
                <div
                  className="h-20 w-full rounded-(--radius-md) border border-ouro/10"
                  style={{ backgroundColor: `var(--color-${c.token})` }}
                />
                <Body variant="ui" size="step-neg-1" className="text-linho">
                  --{c.token}
                </Body>
                <Body variant="ui" size="step-neg-1" className="text-fumaca">
                  {c.hex} · {c.usage}
                </Body>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <Heading as="h2" size="step-2">
            Cores litúrgicas
          </Heading>
          <Body variant="ui" size="step-neg-1" className="text-fumaca">
            Só aparecem no filtro de tempo litúrgico do catálogo — nunca como
            decoração geral.
          </Body>
          <div className="grid grid-cols-3 gap-4">
            {LITURGICAL.map((c) => (
              <div key={c.token} className="flex flex-col gap-2">
                <div
                  className="h-20 w-full rounded-(--radius-md) border border-ouro/10"
                  style={{ backgroundColor: `var(--color-${c.token})` }}
                />
                <Body variant="ui" size="step-neg-1" className="text-linho">
                  --{c.token}
                </Body>
                <Body variant="ui" size="step-neg-1" className="text-fumaca">
                  {c.hex} · {c.usage}
                </Body>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <Heading as="h2" size="step-2">
            Escada de opacidade
          </Heading>
          <Body variant="ui" size="step-neg-1" className="text-fumaca">
            Seis degraus, papel fixo. Qualquer outro valor é erro de revisão.
          </Body>
          <div className="flex flex-col gap-3">
            {OPACITY_STEPS.map((s) => (
              <div key={s.value} className="flex items-center gap-4">
                <div
                  className="size-12 shrink-0 rounded-(--radius-sm) bg-ouro"
                  style={{ opacity: s.value / 100 }}
                />
                <Body variant="ui" size="step-neg-1" className="text-linho">
                  /{s.value.toString().padStart(2, "0")}
                </Body>
                <Body variant="ui" size="step-neg-1" className="text-fumaca">
                  {s.label}
                </Body>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <Heading as="h2" size="step-2">
            Escala tipográfica
          </Heading>
          <div className="flex flex-col gap-4">
            {TYPE_SCALE.map((t) => (
              <div key={t.step} className="flex items-baseline gap-6">
                <Body
                  variant="ui"
                  size="step-neg-1"
                  className="w-24 shrink-0 text-fumaca"
                >
                  --{t.step}
                </Body>
                <span
                  className="font-serif text-linho"
                  style={{ fontSize: `var(--text-${t.step})` }}
                >
                  Uma chama para cada devoção
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <Heading as="h2" size="step-2">
            Primitivos de tipo
          </Heading>
          <div className="flex flex-col gap-6 rounded-(--radius-md) border border-ouro/10 bg-nave p-8">
            <Display as="h3" size="step-4">
              Display
            </Display>
            <Heading as="h4" size="step-2">
              Heading
            </Heading>
            <Body>
              Body em prosa — Cardo, line-height 1.65, medida máxima 62
              caracteres. Este parágrafo existe só para mostrar a quebra de
              linha e o ritmo de leitura em texto corrido, não porque tem algo
              importante a dizer sobre incenso.
            </Body>
            <Meta>Meta — small caps reais, nunca caixa alta</Meta>
            <Latin>duc in altum</Latin>
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <Heading as="h2" size="step-2">
            Raio
          </Heading>
          <div className="grid grid-cols-3 gap-4">
            {RADII.map((r) => (
              <div key={r.token} className="flex flex-col gap-2">
                <div
                  className="h-16 w-full border border-ouro/20 bg-nave"
                  style={{ borderRadius: r.value }}
                />
                <Body variant="ui" size="step-neg-1" className="text-linho">
                  --{r.token}
                </Body>
                <Body variant="ui" size="step-neg-1" className="text-fumaca">
                  {r.value} · {r.usage}
                </Body>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <Heading as="h2" size="step-2">
            Espaço
          </Heading>
          <div className="flex flex-col gap-2">
            {SPACE_SCALE.map((n) => (
              <div key={n} className="flex items-center gap-4">
                <Body
                  variant="ui"
                  size="step-neg-1"
                  className="w-20 shrink-0 text-fumaca"
                >
                  --spacing-{n}
                </Body>
                <div
                  className="h-3 bg-ouro/40"
                  style={{ width: `var(--spacing-${n})` }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
