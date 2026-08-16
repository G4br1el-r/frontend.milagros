export interface BestSeller {
  id: string;
  name: string;
  devotion: string;
  image: string;
  price: number;
  compareAtPrice?: number;
}

export const BEST_SELLERS: BestSeller[] = [
  {
    id: "sacred-frankincense",
    name: "Incenso Olíbano Pacem in Terris",
    devotion: "Incenso",
    image:
      "https://images.unsplash.com/photo-1686043626878-9e391a70632d?auto=format&fit=crop&w=800&q=80",
    price: 294.9,
    compareAtPrice: 329.9,
  },
  {
    id: "seven-day-votive",
    name: "Incenso São Miguel Arcanjo",
    devotion: "Incenso",
    image:
      "https://images.unsplash.com/photo-1770810416306-14036cdb053d?auto=format&fit=crop&w=800&q=80",
    price: 8.9,
  },
  {
    id: "desert-myrrh",
    name: "Incenso Urbi et Orbi",
    devotion: "Incenso",
    image:
      "https://images.unsplash.com/photo-1762541115443-d83816da748c?auto=format&fit=crop&w=800&q=80",
    price: 304.9,
  },
  {
    id: "saint-michael-thurible",
    name: "Turíbulo com Naveta",
    devotion: "Alfaia",
    image:
      "https://images.unsplash.com/photo-1777840530576-f110f0a6eab1?auto=format&fit=crop&w=800&q=80",
    price: 389.9,
  },
  {
    id: "bethany-spikenard",
    name: "Oratório Santo Antônio",
    devotion: "Alfaia",
    image:
      "https://images.unsplash.com/photo-1671493235081-5842463637cd?auto=format&fit=crop&w=800&q=80",
    price: 349.9,
  },
  {
    id: "living-ember-charcoal",
    name: "Carvão Milagros 33mm",
    devotion: "Carvão",
    image:
      "https://images.unsplash.com/photo-1599285062038-950c5e0b672a?auto=format&fit=crop&w=800&q=80",
    price: 161.9,
    compareAtPrice: 179.9,
  },
  {
    id: "paschal-candle",
    name: "Kit Iniciação Incensário",
    devotion: "Kit",
    image:
      "https://images.unsplash.com/photo-1763630239158-d032e93d525b?auto=format&fit=crop&w=800&q=80",
    price: 127.9,
  },
  {
    id: "sumatra-benzoin",
    name: "Combo Quaresma São Miguel",
    devotion: "Kit",
    image:
      "https://images.unsplash.com/photo-1779258568313-f1306d795cf4?auto=format&fit=crop&w=800&q=80",
    price: 124.9,
    compareAtPrice: 151.9,
  },
  {
    id: "seven-flame-candelabra",
    name: "Incenso N. Sra. de Fátima",
    devotion: "Incenso",
    image:
      "https://images.unsplash.com/photo-1783701076232-52f6f75abf41?auto=format&fit=crop&w=800&q=80",
    price: 8.9,
  },
  {
    id: "jerusalem-rosary",
    name: "Kit São Miguel Arcanjo",
    devotion: "Kit",
    image:
      "https://images.unsplash.com/photo-1569845177077-2a37322a60c7?auto=format&fit=crop&w=800&q=80",
    price: 102.9,
  },
  {
    id: "cedar-of-lebanon",
    name: "Pinça para Carvão",
    devotion: "Acessório",
    image:
      "https://images.unsplash.com/photo-1512917860049-18d416baa831?auto=format&fit=crop&w=800&q=80",
    price: 11.9,
  },
  {
    id: "high-altar-set",
    name: "Colher Milagros Prata",
    devotion: "Acessório",
    image:
      "https://images.unsplash.com/photo-1767473034608-4352a8a194a1?auto=format&fit=crop&w=800&q=80",
    price: 36.9,
  },
];
