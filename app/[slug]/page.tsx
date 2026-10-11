import { notFound } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import ProductList from "@/components/ProductList";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/bn";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="text-5xl">{category.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{category.nameBn}</h1>
          <p className="text-gray-600">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <EmptyState
          title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
          message="অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।"
        />
      ) : (
        <ProductList products={products} showSort />
      )}
    </div>
  );
}
