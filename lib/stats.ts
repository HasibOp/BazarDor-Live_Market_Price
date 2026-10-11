import type { Market, Product, SortMode } from "./types";

export function getRisers(products: Product[]) {
  return products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
}

export function getFallers(products: Product[]) {
  return products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);
}

export function sortProducts(products: Product[], mode: SortMode) {
  const list = [...products];
  if (mode === "low") list.sort((a, b) => a.today - b.today);
  if (mode === "high") list.sort((a, b) => b.today - a.today);
  return list;
}

export function marketAverage(market: Market) {
  return (market.min + market.max) / 2;
}

export function getPriceSummary(product: Product) {
  const markets = product.markets;

  let cheapest = markets[0];
  let costliest = markets[0];
  let total = 0;

  for (const m of markets) {
    if (m.min < cheapest.min) cheapest = m;
    if (m.max > costliest.max) costliest = m;
    total += marketAverage(m);
  }

  return {
    min: cheapest.min,
    minMarket: cheapest,
    max: costliest.max,
    maxMarket: costliest,
    avg: total / markets.length,
  };
}

export function priceDifference(product: Product) {
  return product.today - product.yesterday;
}
