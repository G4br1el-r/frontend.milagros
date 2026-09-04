import { Flame } from "lucide-react";
import { Container } from "@/components/Layout/Container";
import { FadeIn } from "@/components/motion/fade-in";
import type { Product } from "../Products/product.types";
import { BestSellersCarousel } from "./BestSellersCarousel";

const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    id: "best-1",
    name: "Incenso Pontifical",
    description: "Blend cerimonial de resinas e especiarias.",
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=450&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=450&fit=crop",
    ],
    hasImage: true,
    price: 89.9,
    compareAtPrice: null,
    category: "Incenso",
    type: "Resina",
    unit: "100g",
    weightKg: 0.1,
    stock: 42,
    burnTime: "45 min",
    rating: 4.8,
    reviewCount: 124,
    attributes: [],
  },
  {
    id: "best-2",
    name: "Mirra Pura",
    description: "Resina de mirra selecionada, importada.",
    image:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&h=450&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&h=450&fit=crop",
    ],
    hasImage: true,
    price: 64.9,
    compareAtPrice: null,
    category: "Resina",
    type: "Mirra",
    unit: "50g",
    weightKg: 0.05,
    stock: 78,
    burnTime: "30 min",
    rating: 4.9,
    reviewCount: 89,
    attributes: [],
  },
  {
    id: "best-3",
    name: "Olíbano de Omã",
    description: "Olíbano de primeira seleção, grão largo.",
    image:
      "https://images.unsplash.com/photo-1596207891316-eb8cfc5e5c0b?w=600&h=450&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596207891316-eb8cfc5e5c0b?w=600&h=450&fit=crop",
    ],
    hasImage: true,
    price: 74.5,
    compareAtPrice: null,
    category: "Resina",
    type: "Olíbano",
    unit: "80g",
    weightKg: 0.08,
    stock: 55,
    burnTime: "40 min",
    rating: 4.7,
    reviewCount: 67,
    attributes: [],
  },
  {
    id: "best-4",
    name: "Turíbulo Dourado",
    description: "Turíbulo em latão polido, acabamento artesanal.",
    image:
      "https://images.unsplash.com/photo-1567225591450-06036b3392a6?w=600&h=450&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1567225591450-06036b3392a6?w=600&h=450&fit=crop",
    ],
    hasImage: true,
    price: 289.9,
    compareAtPrice: null,
    category: "Acessórios",
    type: "Turíbulo",
    unit: "1 un",
    weightKg: 0.8,
    stock: 12,
    burnTime: null,
    rating: 5.0,
    reviewCount: 34,
    attributes: [],
  },
  {
    id: "best-5",
    name: "Carvão Litúrgico",
    description: "Carvão de acendimento rápido, sem faísca.",
    image:
      "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=600&h=450&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=600&h=450&fit=crop",
    ],
    hasImage: true,
    price: 24.9,
    compareAtPrice: null,
    category: "Carvão",
    type: "Carvão",
    unit: "10 un",
    weightKg: 0.12,
    stock: 200,
    burnTime: "60 min",
    rating: 4.6,
    reviewCount: 213,
    attributes: [],
  },
  {
    id: "best-6",
    name: "Estoraque em Lágrima",
    description: "Resina de estoraque natural, grãos selecionados.",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=450&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=450&fit=crop",
    ],
    hasImage: true,
    price: 54.9,
    compareAtPrice: null,
    category: "Resina",
    type: "Estoraque",
    unit: "60g",
    weightKg: 0.06,
    stock: 38,
    burnTime: "35 min",
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
