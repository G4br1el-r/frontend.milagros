import { Flame } from "lucide-react";
import { Container } from "@/components/Layout/Container";
import { FadeIn } from "@/components/motion/fade-in";
import type { Product } from "../Products/product.types";
import { BestSellersCarousel } from "./BestSellersCarousel";

const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    id: "1135SFA",
    name: "Oratório c/ Gaveta São Francisco de Assis",
    description:
      "Oratório em MDF, acompanha incensário em cerâmica esmaltada com tampa.",
    image:
      "https://cdn.awsli.com.br/2126/2126271/produto/154521336/73fe11e28c.jpg",
    images: [
      "https://cdn.awsli.com.br/2126/2126271/produto/154521336/73fe11e28c.jpg",
    ],
    hasImage: true,
    price: 81.99,
    compareAtPrice: null,
    category: "Oratórios",
    type: null,
    unit: null,
    weightKg: null,
    stock: 42,
    burnTime: null,
    rating: 4.9,
    reviewCount: 124,
    attributes: [],
  },
  {
    id: "URB10",
    name: "Incenso Urbi et Orbi 100g",
    description: "Incenso tradicional em grãos, fragrância clássica.",
    image:
      "https://cdn.awsli.com.br/2126/2126271/produto/134549336/971f7f9808.jpg",
    images: [
      "https://cdn.awsli.com.br/2126/2126271/produto/134549336/971f7f9808.jpg",
    ],
    hasImage: true,
    price: 38.03,
    compareAtPrice: null,
    category: "Incensos",
    type: null,
    unit: "100g",
    weightKg: null,
    stock: 78,
    burnTime: null,
    rating: 4.8,
    reviewCount: 89,
    attributes: [],
  },
  {
    id: "JOS05",
    name: "Incenso São José 50g",
    description: "Incenso em barrica, fragrância suave devocional.",
    image:
      "https://cdn.awsli.com.br/2126/2126271/produto/229941243/s-o-jos--barrica-50g-frente-m7fcaqzh9p.jpg",
    images: [
      "https://cdn.awsli.com.br/2126/2126271/produto/229941243/s-o-jos--barrica-50g-frente-m7fcaqzh9p.jpg",
    ],
    hasImage: true,
    price: 20.6,
    compareAtPrice: null,
    category: "São José",
    type: null,
    unit: "50g",
    weightKg: null,
    stock: 55,
    burnTime: null,
    rating: 4.7,
    reviewCount: 67,
    attributes: [],
  },
  {
    id: "KTNLS",
    name: "Kit N. Sra. La Salette",
    description: "Mini kit completo com incensário para devoção.",
    image:
      "https://cdn.awsli.com.br/2126/2126271/produto/269316545/incens-rion-n-sra-de-la-salette-frente-jpeg-0k7sy8lyk5.jpg",
    images: [
      "https://cdn.awsli.com.br/2126/2126271/produto/269316545/incens-rion-n-sra-de-la-salette-frente-jpeg-0k7sy8lyk5.jpg",
    ],
    hasImage: true,
    price: 48.54,
    compareAtPrice: null,
    category: "Kits",
    type: null,
    unit: null,
    weightKg: null,
    stock: 12,
    burnTime: null,
    rating: 5.0,
    reviewCount: 34,
    attributes: [],
  },
  {
    id: "NIGsKG",
    name: "Incenso Night Flower Suave 1kg",
    description: "Fragrância floral suave, embalagem econômica de 1kg.",
    image:
      "https://cdn.awsli.com.br/2126/2126271/produto/257927186/byzantine-m-dio-montinho-mewh2dxi7y.jpg",
    images: [
      "https://cdn.awsli.com.br/2126/2126271/produto/257927186/byzantine-m-dio-montinho-mewh2dxi7y.jpg",
    ],
    hasImage: true,
    price: 344.9,
    compareAtPrice: null,
    category: "Incensos",
    type: null,
    unit: "1kg",
    weightKg: null,
    stock: 200,
    burnTime: null,
    rating: 4.6,
    reviewCount: 213,
    attributes: [],
  },
  {
    id: "NAZiKG",
    name: "Incenso Nazareth Intenso 1kg",
    description: "Fragrância intensa e marcante, embalagem de 1kg.",
    image:
      "https://cdn.awsli.com.br/2126/2126271/produto/257881534/grego-nazareth-intenso-caixa-1kg-n6ru799aak.jpg",
    images: [
      "https://cdn.awsli.com.br/2126/2126271/produto/257881534/grego-nazareth-intenso-caixa-1kg-n6ru799aak.jpg",
    ],
    hasImage: true,
    price: 481.11,
    compareAtPrice: null,
    category: "Incensos",
    type: null,
    unit: "1kg",
    weightKg: null,
    stock: 38,
    burnTime: null,
    rating: 4.5,
    reviewCount: 42,
    attributes: [],
  },
];
export function BestSellers() {
  return (
    <section
      id="mais-vendidos"
      aria-labelledby="mais-vendidos-heading"
      className="relative z-10 w-full overflow-hidden bg-cream py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial from-gold/[0.04] via-transparent to-transparent"
      />
      <Container className="relative">
        <BestSellersCarousel products={PLACEHOLDER_PRODUCTS} />
      </Container>
    </section>
  );
}
