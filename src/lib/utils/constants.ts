import type { IconName } from "@/lib/utils/iconsMap";

export const CART_ITEMS_COUNT = 3;

export interface TrustBarItem {
  icon: IconName;
  title: string;
  subtitle: string;
}

export const TRUST_BAR_ITEMS: TrustBarItem[] = [
  {
    icon: "shieldCheck",
    title: "Produtos Originais",
    subtitle: "Qualidade garantida",
  },
  {
    icon: "award",
    title: "Devoção e Tradição",
    subtitle: "Mais de 20 anos de história",
  },
  {
    icon: "lock",
    title: "Compra Segura",
    subtitle: "Seus dados protegidos",
  },
  {
    icon: "messageCircle",
    title: "Atendimento Especializado",
    subtitle: "Estamos para ajudar",
  },
];

export interface CatalogCategory {
  id: string;
  label: string;
  count: number;
  icon: IconName;
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  { id: "todos", label: "Todos os produtos", count: 116, icon: "layoutGrid" },
  { id: "kits", label: "Kits e Coleções", count: 18, icon: "gift" },
  { id: "incensos", label: "Incensos", count: 62, icon: "flame" },
  { id: "resinas", label: "Resinas", count: 10, icon: "droplet" },
  { id: "queimadores", label: "Queimadores", count: 8, icon: "flameKindling" },
  { id: "acessorios", label: "Acessórios", count: 6, icon: "link2" },
  { id: "imagens", label: "Imagens e Ícones", count: 7, icon: "image" },
  { id: "livros", label: "Livros", count: 5, icon: "book" },
];

export const CATALOG_ACTIVE_CATEGORY_ID = "todos";

export const CATALOG_PRICE_RANGE = { min: 0, max: 300 } as const;

export const CATALOG_PRICE_RANGE_FILLED_PERCENT = 65;

export interface CatalogFilterOption {
  id: string;
  label: string;
  count: number;
}

export const CATALOG_PRODUCT_TYPES: CatalogFilterOption[] = [
  { id: "incensos", label: "Incensos", count: 62 },
  { id: "kits", label: "Kits", count: 18 },
  { id: "resinas", label: "Resinas", count: 10 },
  { id: "acessorios", label: "Acessórios", count: 6 },
];

export const CATALOG_AROMAS: CatalogFilterOption[] = [
  { id: "floral", label: "Floral", count: 28 },
  { id: "herbal", label: "Herbal", count: 24 },
  { id: "citrico", label: "Cítrico", count: 12 },
  { id: "amadeirado", label: "Amadeirado", count: 10 },
  { id: "doce", label: "Doce", count: 8 },
];

export const CATALOG_FREE_SHIPPING_THRESHOLD = 199;

export interface CatalogPromoBanner {
  id: string;
  icon: IconName;
  title: string;
  subtitle: string;
  image: string;
}

export const CATALOG_PROMO_BANNERS: CatalogPromoBanner[] = [
  {
    id: "frete-gratis",
    icon: "truck",
    title: "Frete Grátis",
    subtitle: `Acima de R$ ${CATALOG_FREE_SHIPPING_THRESHOLD.toFixed(2).replace(".", ",")}`,
    image: "/images/hero/hero-poster.png",
  },
  {
    id: "brinde-especial",
    icon: "gift",
    title: "Brinde Especial",
    subtitle: "Sachê aromático nas compras acima de R$ 150,00",
    image: "/images/hero/hero-poster.png",
  },
];

export const CATALOG_RESULTS_COUNT = 116;

export const CATALOG_PRODUCTS_PER_PAGE = 15;

export const CATALOG_CURRENT_PAGE = 1;

export const CATALOG_TOTAL_PAGES = Math.ceil(
  CATALOG_RESULTS_COUNT / CATALOG_PRODUCTS_PER_PAGE,
);

export interface CatalogSortOption {
  id: string;
  label: string;
}

export const CATALOG_SORT_OPTIONS: CatalogSortOption[] = [
  { id: "mais-vendidos", label: "Mais vendidos" },
  { id: "menor-preco", label: "Menor preço" },
  { id: "maior-preco", label: "Maior preço" },
  { id: "novidades", label: "Novidades" },
];

export const CATALOG_DEFAULT_SORT_ID = "mais-vendidos";

export type CatalogProductCtaVariant = "add" | "options";

export interface CatalogProduct {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  priceFrom: boolean;
  ctaVariant: CatalogProductCtaVariant;
  rating: number;
  reviewCount: number;
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: "expositor-milagros",
    name: "Expositor Milagros",
    subtitle: "Expositor com 40 unidades",
    price: 1465.61,
    priceFrom: false,
    ctaVariant: "add",
    rating: 5,
    reviewCount: 12,
  },
  {
    id: "misericordiae",
    name: "Misericordiae",
    subtitle: "Incenso",
    price: 17.45,
    priceFrom: true,
    ctaVariant: "options",
    rating: 4.5,
    reviewCount: 86,
  },
  {
    id: "nsra-fatima",
    name: "N. Sra. de Fátima",
    subtitle: "Incenso",
    price: 21.09,
    priceFrom: true,
    ctaVariant: "options",
    rating: 5,
    reviewCount: 64,
  },
  {
    id: "classicos-milagros",
    name: "Clássicos Milagros",
    subtitle: "Kit com 20 aromas",
    price: 34.31,
    priceFrom: false,
    ctaVariant: "add",
    rating: 4.5,
    reviewCount: 41,
  },
  {
    id: "kit-classicos",
    name: "Kit Clássicos",
    subtitle: "Kit com 10 aromas",
    price: 34.31,
    priceFrom: false,
    ctaVariant: "add",
    rating: 4,
    reviewCount: 23,
  },
  {
    id: "kit-sagrado",
    name: "Kit Sagrado",
    subtitle: "Kit especial",
    price: 89.9,
    priceFrom: false,
    ctaVariant: "add",
    rating: 5,
    reviewCount: 18,
  },
  {
    id: "alleluia",
    name: "Alleluia",
    subtitle: "Incenso",
    price: 21.09,
    priceFrom: true,
    ctaVariant: "options",
    rating: 4,
    reviewCount: 29,
  },
  {
    id: "sao-benedito",
    name: "São Benedito",
    subtitle: "Incenso",
    price: 21.09,
    priceFrom: true,
    ctaVariant: "options",
    rating: 4.5,
    reviewCount: 37,
  },
  {
    id: "flor-do-carmo",
    name: "Flor do Carmo",
    subtitle: "Incenso",
    price: 21.09,
    priceFrom: true,
    ctaVariant: "options",
    rating: 4,
    reviewCount: 15,
  },
  {
    id: "sao-jorge",
    name: "São Jorge Guerreiro",
    subtitle: "Incenso",
    price: 19.9,
    priceFrom: true,
    ctaVariant: "options",
    rating: 5,
    reviewCount: 52,
  },
  {
    id: "kit-protecao",
    name: "Kit Proteção",
    subtitle: "Kit com 5 aromas",
    price: 54.9,
    priceFrom: false,
    ctaVariant: "add",
    rating: 4.5,
    reviewCount: 9,
  },
  {
    id: "resina-olibano",
    name: "Resina de Olíbano",
    subtitle: "Resina pura",
    price: 28.5,
    priceFrom: true,
    ctaVariant: "options",
    rating: 4,
    reviewCount: 21,
  },
  {
    id: "turibulo-latao",
    name: "Turíbulo de Latão",
    subtitle: "Queimador tradicional",
    price: 149.9,
    priceFrom: false,
    ctaVariant: "add",
    rating: 5,
    reviewCount: 7,
  },
  {
    id: "sagrado-coracao",
    name: "Sagrado Coração",
    subtitle: "Incenso",
    price: 21.09,
    priceFrom: true,
    ctaVariant: "options",
    rating: 4.5,
    reviewCount: 33,
  },
  {
    id: "carvao-santo",
    name: "Carvão Santo",
    subtitle: "Caixa com 10 unidades",
    price: 15.9,
    priceFrom: false,
    ctaVariant: "add",
    rating: 4,
    reviewCount: 48,
  },
];
