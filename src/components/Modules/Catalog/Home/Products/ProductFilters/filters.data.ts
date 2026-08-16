export interface FilterOption {
  label: string;
  count: number;
}

export const CATEGORY_FILTERS: FilterOption[] = [
  { label: "Incenso", count: 34 },
  { label: "Carvão", count: 6 },
  { label: "Turíbulo", count: 9 },
  { label: "Oratório", count: 7 },
  { label: "Kits", count: 5 },
  { label: "Acessórios", count: 12 },
];

export const DEVOTION_FILTERS: FilterOption[] = [
  { label: "N. Sra. Aparecida", count: 5 },
  { label: "São Miguel Arcanjo", count: 5 },
  { label: "N. Sra. de Fátima", count: 4 },
  { label: "Santo Antônio", count: 3 },
  { label: "São Padre Pio", count: 3 },
];

export const PRICE_BOUNDS = {
  min: 0,
  max: 500,
  selectedMin: 0,
  selectedMax: 320,
};
