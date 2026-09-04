import type { Metadata, Viewport } from "next";
import {
  Cardo,
  Fraunces,
  Geist,
  Inter_Tight,
  Playfair_Display,
} from "next/font/google";
import { SkipLink } from "@/components/Layout/SkipLink";
import { Footer } from "@/components/Modules/Catalog/Footer";
import { Header } from "@/components/Modules/Catalog/Header";
import { DeferredOverlays } from "@/components/Providers/DeferredOverlays";
import { QueryProvider } from "@/components/Providers/QueryProvider";
import { ToastProvider } from "@/components/Providers/ToastProvider";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#21130a",
};

// Sem NEXT_PUBLIC_SITE_URL definida ainda (domínio de produção não
// decidido) — fallback local só resolve URLs absolutas de OG image em dev;
// definir a env var antes de publicar.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Milagros | Incensos e Velas Litúrgicas",
  description:
    "Uma chama para cada devoção, um incenso para cada santo. Catálogo litúrgico Milagros.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Fraunces fica reservada ao hero e a assinatura da marca (--font-brand),
// onde o desenho expressivo dela e justamente o ponto. Fora dali ela
// gritava — titulo de produto, card e secao usam a Instrument Serif.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
});

// Playfair Display e a serifa de trabalho: titulo de produto, card e secao.
// Substituiu a Instrument Serif, que so existe em peso 400 e por isso saia
// fina demais em titulo grande.
//
// Carrega SO o peso 600: como o next/font gera um @font-face unico, todo
// `font-display` ja renderiza encorpado sem precisar de regra de peso no
// CSS — e um `font-normal` pontual (FilterDrawer) continua funcionando,
// caindo no 600 mais proximo em vez de brigar com um !important.
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Seção 2.5 do CLAUDE.md: Cardo para texto e títulos (--font-serif),
// Inter Tight para UI/ficha técnica/preço (--font-sans). Cardo tem small
// caps e itálico reais — usados pelo primitivo <Latin> nas frases em latim.
const cardo = Cardo({
  variable: "--font-cardo",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${fraunces.variable} ${playfairDisplay.variable} ${cardo.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SkipLink />
        <QueryProvider>
          <Header />
          {children}
          <Footer />
          <DeferredOverlays />
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
