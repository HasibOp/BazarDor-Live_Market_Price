
import type { Category, Product } from "./types";

const API_HOSTS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function getJson<T>(path: string): Promise<T> {
  for (const host of API_HOSTS) {
    try {
      // cache the answer for 5 minutes
      const res = await fetch(host + path, { next: { revalidate: 300 } });
      if (res.ok) return await res.json();
    } catch {
    }
  }
  throw new Error("API থেকে ডেটা আনা যায়নি");
}

export function getProducts() {
  return getJson<Product[]>("/products");
}

export function getCategories() {
  return getJson<Category[]>("/categories");
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getCategoryBySlug(slug: string) {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function getProductsByCategory(slug: string) {
  const products = await getProducts();
  return products.filter((p) => p.category === slug);
}
