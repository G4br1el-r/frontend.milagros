import type { Metadata, Viewport } from "next";
import {
  Cardo,
  Fraunces,
  Inter_Tight,
  Playfair_Display,
} from "next/font/google";
import { SkipLink } from "@/components/Layout/SkipLink";
import { SplashScreen } from "@/components/Layout/SplashScreen";
import { SPLASH_SEEN_SCRIPT } from "@/components/Layout/splash-screen.constants";
import { Footer } from "@/components/Modules/Catalog/Footer";
import { Header } from "@/components/Modules/Catalog/Header";
import { DeferredOverlays } from "@/components/Providers/DeferredOverlays";
import { MotionProvider } from "@/components/Providers/MotionProvider";
import { QueryProvider } from "@/components/Providers/QueryProvider";
import { ToastProvider } from "@/components/Providers/ToastProvider";
import { serializeJsonLd } from "@/lib/site/json-ld";
import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_LOCALE,
  SITE_LOGO_PATH,
  SITE_NAME,
  TWITTER_CARD,
} from "@/lib/site/site.constants";
import { getSiteUrl, toAbsoluteUrl } from "@/lib/site/site-url";
import "../globals.css";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#21130a",
};
const SITE_TITLE = "Milagros | Incensos e Velas Litúrgicas";
const SITE_DESCRIPTION =
  "Uma chama para cada devoção, um incenso para cada santo. Catálogo litúrgico Milagros.";
const DEFAULT_OG_IMAGE = {
  url: DEFAULT_OG_IMAGE_PATH,
  width: DEFAULT_OG_IMAGE_WIDTH,
  height: DEFAULT_OG_IMAGE_HEIGHT,
  alt: DEFAULT_OG_IMAGE_ALT,
};
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: TWITTER_CARD,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: getSiteUrl(),
  logo: toAbsoluteUrl(SITE_LOGO_PATH),
};
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
  preload: false,
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
      className={`${fraunces.variable} ${playfairDisplay.variable} ${cardo.variable} ${interTight.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script>{SPLASH_SEEN_SCRIPT}</script>
        <script type="application/ld+json">
          {serializeJsonLd(ORGANIZATION_JSON_LD)}
        </script>
        <MotionProvider>
          <SplashScreen />
          <SkipLink />
          <QueryProvider>
            <Header />
            {children}
            <Footer />
            <DeferredOverlays />
            <ToastProvider />
          </QueryProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
