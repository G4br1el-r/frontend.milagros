import type { Product } from "./product.types";

export const PRODUCTS: Product[] = [
  {
    id: "sacred-frankincense",
    name: "Incenso Olíbano Pacem in Terris",
    devotion: "Incenso",
    description:
      "Resina de olíbano puro, curada em barrica. A fumaça sobe densa e permanece na nave por horas após a bênção.",
    image:
      "https://images.unsplash.com/photo-1686043626878-9e391a70632d?auto=format&fit=crop&w=1200&q=80",
    price: 294.9,
    compareAtPrice: 329.9,
    badge: "mais-vendido",
    rating: 4.9,
    reviewCount: 214,
    attributes: [
      { label: "Peso", value: "500 g" },
      { label: "Queima", value: "≈ 90 min" },
      { label: "Tipo", value: "Resina" },
    ],
  },
  {
    id: "seven-day-votive",
    name: "Incenso N. Sra. Aparecida",
    devotion: "Incenso",
    description:
      "Blend devocional em pequena porção, ideal para experimentar antes de levar a barrica. Aroma suave, queima limpa.",
    image:
      "https://images.unsplash.com/photo-1770810416306-14036cdb053d?auto=format&fit=crop&w=1200&q=80",
    price: 8.9,
    badge: "novidade",
    rating: 4.8,
    reviewCount: 96,
    attributes: [
      { label: "Peso", value: "9 g" },
      { label: "Queima", value: "≈ 15 min" },
      { label: "Tipo", value: "Resina" },
    ],
  },
  {
    id: "desert-myrrh",
    name: "Incenso Peregrinantes in Spem",
    devotion: "Incenso",
    description:
      "Lágrimas de mirra selecionadas grão a grão, com o amargor terroso que a tradição reserva aos ritos de penitência.",
    image:
      "https://images.unsplash.com/photo-1762541115443-d83816da748c?auto=format&fit=crop&w=1200&q=80",
    price: 294.9,
    compareAtPrice: 329.9,
    rating: 5,
    reviewCount: 58,
    attributes: [
      { label: "Peso", value: "500 g" },
      { label: "Queima", value: "≈ 70 min" },
      { label: "Tipo", value: "Resina" },
    ],
  },
  {
    id: "saint-michael-thurible",
    name: "Turíbulo com Naveta",
    devotion: "Turíbulo",
    description:
      "Metal maciço com correntes de 60 cm. Cinzeiro removível, tampa perfurada e naveta a jogo para tiragem constante.",
    image:
      "https://images.unsplash.com/photo-1777840530576-f110f0a6eab1?auto=format&fit=crop&w=1200&q=80",
    price: 389.9,
    rating: 4.7,
    reviewCount: 41,
    attributes: [
      { label: "Material", value: "Metal" },
      { label: "Altura", value: "26 cm" },
      { label: "Peso", value: "1,4 kg" },
    ],
  },
  {
    id: "bethany-spikenard",
    name: "Oratório Santo Antônio",
    devotion: "Oratório",
    description:
      "Capela em madeira maciça com porta e gaveta, acabamento entalhado à mão. Espaço para imagem e vela votiva.",
    image:
      "https://images.unsplash.com/photo-1671493235081-5842463637cd?auto=format&fit=crop&w=1200&q=80",
    price: 349.9,
    rating: 4.9,
    reviewCount: 33,
    attributes: [
      { label: "Material", value: "Madeira" },
      { label: "Altura", value: "38 cm" },
      { label: "Gaveta", value: "Sim" },
    ],
  },
  {
    id: "living-ember-charcoal",
    name: "Carvão Milagros 33mm",
    devotion: "Carvão",
    description:
      "Autoinflamável, sem enxofre e sem odor próprio. Acende em 20 segundos e sustenta a resina por toda a celebração.",
    image:
      "https://images.unsplash.com/photo-1599285062038-950c5e0b672a?auto=format&fit=crop&w=1200&q=80",
    price: 161.9,
    rating: 4.6,
    reviewCount: 187,
    attributes: [
      { label: "Unidades", value: "120" },
      { label: "Diâmetro", value: "33 mm" },
      { label: "Brasa", value: "≈ 45 min" },
    ],
  },
  {
    id: "our-lady-of-fatima-incense",
    name: "Incenso N. Sra. de Fátima",
    devotion: "Incenso",
    description:
      "Blend devocional em pequena porção, com o aroma floral suave associado às aparições de Fátima. Queima limpa e curta.",
    image:
      "https://images.unsplash.com/photo-1783701076232-52f6f75abf41?auto=format&fit=crop&w=1200&q=80",
    price: 8.9,
    rating: 4.8,
    reviewCount: 72,
    attributes: [
      { label: "Peso", value: "9 g" },
      { label: "Queima", value: "≈ 15 min" },
      { label: "Tipo", value: "Resina" },
    ],
  },
  {
    id: "urbi-et-orbi-incense",
    name: "Incenso Urbi et Orbi",
    devotion: "Incenso",
    description:
      "Blend clássico usado em celebrações papais, com base de olíbano e um toque cítrico que sustenta a fumaça por mais tempo.",
    image:
      "https://images.unsplash.com/photo-1762541115443-d83816da748c?auto=format&fit=crop&w=1200&q=80",
    price: 304.9,
    rating: 4.9,
    reviewCount: 129,
    attributes: [
      { label: "Peso", value: "500 g" },
      { label: "Queima", value: "≈ 85 min" },
      { label: "Tipo", value: "Resina" },
    ],
  },
  {
    id: "initiation-thurible-kit",
    name: "Kit Iniciação Incensário",
    devotion: "Kits",
    description:
      "Turíbulo compacto, naveta e pastilhas de carvão em um único conjunto, ideal para quem está começando na liturgia do incenso.",
    image:
      "https://images.unsplash.com/photo-1763630239158-d032e93d525b?auto=format&fit=crop&w=1200&q=80",
    price: 127.9,
    rating: 4.7,
    reviewCount: 54,
    attributes: [
      { label: "Itens", value: "3 peças" },
      { label: "Material", value: "Metal" },
      { label: "Carvão", value: "Incluso" },
    ],
  },
  {
    id: "lenten-combo-saint-michael",
    name: "Combo Quaresma São Miguel",
    devotion: "Kits",
    description:
      "Incenso, carvão e cartela devocional reunidos para acompanhar a Quaresma sob a proteção de São Miguel Arcanjo.",
    image:
      "https://images.unsplash.com/photo-1779258568313-f1306d795cf4?auto=format&fit=crop&w=1200&q=80",
    price: 124.9,
    compareAtPrice: 151.9,
    rating: 4.9,
    reviewCount: 61,
    attributes: [
      { label: "Itens", value: "3 peças" },
      { label: "Validade", value: "Quaresma" },
      { label: "Peso", value: "250 g" },
    ],
  },
  {
    id: "saint-michael-devotional-kit",
    name: "Kit São Miguel Arcanjo",
    devotion: "Kits",
    description:
      "Incenso, carvão e imagem de bolso de São Miguel Arcanjo, reunidos para a devoção diária ou presente a um afilhado.",
    image:
      "https://images.unsplash.com/photo-1569845177077-2a37322a60c7?auto=format&fit=crop&w=1200&q=80",
    price: 102.9,
    rating: 4.8,
    reviewCount: 47,
    attributes: [
      { label: "Itens", value: "3 peças" },
      { label: "Peso", value: "180 g" },
      { label: "Inclui", value: "Imagem" },
    ],
  },
  {
    id: "charcoal-tongs",
    name: "Pinça para Carvão",
    devotion: "Acessórios",
    description:
      "Pinça em aço inoxidável, cabo longo e ponta serrilhada, para manusear o carvão aceso com segurança durante a celebração.",
    image:
      "https://images.unsplash.com/photo-1512917860049-18d416baa831?auto=format&fit=crop&w=1200&q=80",
    price: 11.9,
    rating: 4.6,
    reviewCount: 38,
    attributes: [
      { label: "Material", value: "Aço inox" },
      { label: "Comprimento", value: "18 cm" },
      { label: "Uso", value: "Carvão" },
    ],
  },
  {
    id: "milagros-silver-spoon",
    name: "Colher Milagros Prata",
    devotion: "Acessórios",
    description:
      "Colher dosadora banhada em prata, para porcionar resina com precisão antes de depositar sobre o carvão aceso.",
    image:
      "https://images.unsplash.com/photo-1767473034608-4352a8a194a1?auto=format&fit=crop&w=1200&q=80",
    price: 36.9,
    rating: 4.9,
    reviewCount: 22,
    attributes: [
      { label: "Material", value: "Prata" },
      { label: "Comprimento", value: "14 cm" },
      { label: "Uso", value: "Resina" },
    ],
  },
  {
    id: "saint-anthony-incense",
    name: "Incenso Santo Antônio",
    devotion: "Incenso",
    description:
      "Blend devocional de resina e madeira, associado à intercessão de Santo Antônio nas paróquias e capelas do interior.",
    image:
      "https://images.unsplash.com/photo-1686043626878-9e391a70632d?auto=format&fit=crop&w=1200&q=80",
    price: 8.9,
    rating: 4.7,
    reviewCount: 65,
    attributes: [
      { label: "Peso", value: "9 g" },
      { label: "Queima", value: "≈ 15 min" },
      { label: "Tipo", value: "Resina" },
    ],
  },
  {
    id: "padre-pio-incense",
    name: "Incenso São Padre Pio",
    devotion: "Incenso",
    description:
      "Blend devocional com notas amadeiradas e um leve toque de rosa, em homenagem à devoção a São Padre Pio.",
    image:
      "https://images.unsplash.com/photo-1770810416306-14036cdb053d?auto=format&fit=crop&w=1200&q=80",
    price: 8.9,
    rating: 4.8,
    reviewCount: 89,
    attributes: [
      { label: "Peso", value: "9 g" },
      { label: "Queima", value: "≈ 15 min" },
      { label: "Tipo", value: "Resina" },
    ],
  },
  {
    id: "duc-in-altum-thurible",
    name: "Turíbulo Duc in Altum",
    devotion: "Turíbulo",
    description:
      "Versão compacta do turíbulo tradicional, com correntes de 45 cm, indicada para capelas e celebrações ao ar livre.",
    image:
      "https://images.unsplash.com/photo-1777840530576-f110f0a6eab1?auto=format&fit=crop&w=1200&q=80",
    price: 279.9,
    rating: 4.6,
    reviewCount: 27,
    attributes: [
      { label: "Material", value: "Metal" },
      { label: "Altura", value: "20 cm" },
      { label: "Peso", value: "1,0 kg" },
    ],
  },
  {
    id: "our-lady-of-graces-oratory",
    name: "Oratório N. Sra. das Graças",
    devotion: "Oratório",
    description:
      "Capela em madeira com moldura entalhada e porta de vidro, dimensionada para acomodar imagens de até 25 cm.",
    image:
      "https://images.unsplash.com/photo-1671493235081-5842463637cd?auto=format&fit=crop&w=1200&q=80",
    price: 299.9,
    rating: 4.8,
    reviewCount: 19,
    attributes: [
      { label: "Material", value: "Madeira" },
      { label: "Altura", value: "32 cm" },
      { label: "Porta", value: "Vidro" },
    ],
  },
  {
    id: "seven-flame-candelabra",
    name: "Candelabro Sete Chamas",
    devotion: "Acessórios",
    description:
      "Candelabro em metal para sete velas, apoio tradicional do turíbulo durante procissões e celebrações solenes.",
    image:
      "https://images.unsplash.com/photo-1512917860049-18d416baa831?auto=format&fit=crop&w=1200&q=80",
    price: 890,
    rating: 4.7,
    reviewCount: 15,
    attributes: [
      { label: "Material", value: "Metal" },
      { label: "Velas", value: "7" },
      { label: "Altura", value: "42 cm" },
    ],
  },
  {
    id: "our-lady-of-carmel-incense",
    name: "Incenso N. Sra. do Carmo",
    devotion: "Incenso",
    description:
      "Blend devocional com notas de âmbar e baunilha, em homenagem à Padroeira do Carmelo. Aroma suave, queima curta.",
    image:
      "https://images.unsplash.com/photo-1783701076232-52f6f75abf41?auto=format&fit=crop&w=1200&q=80",
    price: 8.9,
    rating: 4.9,
    reviewCount: 44,
    attributes: [
      { label: "Peso", value: "9 g" },
      { label: "Queima", value: "≈ 15 min" },
      { label: "Tipo", value: "Resina" },
    ],
  },
  {
    id: "saint-benedict-oratory",
    name: "Oratório São Bento",
    devotion: "Oratório",
    description:
      "Capela em madeira maciça com a medalha de São Bento entalhada na porta, espaço interno para imagem e vela votiva.",
    image:
      "https://images.unsplash.com/photo-1671493235081-5842463637cd?auto=format&fit=crop&w=1200&q=80",
    price: 319.9,
    compareAtPrice: 359.9,
    rating: 4.9,
    reviewCount: 28,
    attributes: [
      { label: "Material", value: "Madeira" },
      { label: "Altura", value: "36 cm" },
      { label: "Gaveta", value: "Sim" },
    ],
  },
];
