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
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
});
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal", "italic"],
  display: "swap",
});
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
