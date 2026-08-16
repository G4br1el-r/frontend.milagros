import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { Footer } from "@/components/Modules/Catalog/Footer";
import { Header } from "@/components/Modules/Catalog/Header";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#21130a",
};

export const metadata: Metadata = {
  title: "Milagros | Incensos e Velas Litúrgicas",
  description:
    "Uma chama para cada devoção, um incenso para cada santo. Catálogo litúrgico Milagros.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Só o peso 500 (wordmark) e o itálico (tagline) são usados hoje.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
