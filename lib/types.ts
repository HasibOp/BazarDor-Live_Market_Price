export type ChangeDirection = "up" | "down" | "flat";

export interface PriceChange {
  dir: ChangeDirection;
  pct: number;
}

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: string | number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: Market[];
}

export interface Category {
  slug: string;
  nameBn: string;
  icon: string;
}

export type SortMode = "default" | "low" | "high";
