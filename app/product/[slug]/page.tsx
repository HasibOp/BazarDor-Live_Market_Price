import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import MarketTable from "@/components/MarketTable";
import { getProductBySlug } from "@/lib/api";
import { formatNumber, formatTaka, perUnit, toBn, unitName } from "@/lib/bn";
import { getSession } from "@/lib/session";
import { getPriceSummary, priceDifference } from "@/lib/stats";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  return { title: product ? `${product.nameBn} — বাজার দর` : "বাজার দর" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await getSession();
  if (!session) {
    redirect(`/signin?reason=login&next=/product/${slug}`);
  }

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const summary = getPriceSummary(product);
  const diff = priceDifference(product);
  const divisionCount = new Set(product.markets.map((m) => m.division)).size;

  let diffText = "গতকালের তুলনায় আজ দাম অপরিবর্তিত";
  if (diff > 0) diffText = `গতকালের তুলনায় আজ দাম বেড়েছে ${formatNumber(diff)} টাকা`;
  if (diff < 0) diffText = `গতকালের তুলনায় আজ দাম কমেছে ${formatNumber(Math.abs(diff))} টাকা`;

  const history = [
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="space-y-8">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link>
          </li>
          <li>{product.nameBn}</li>
        </ul>
      </div>

      <section className="flex flex-col gap-6 rounded-box bg-base-100 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="text-6xl">{product.image}</div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.nameBn}</h1>
            <p className="mt-1 text-gray-600">
              {toBn(product.markets.length)}টি বাজারের দাম · {toBn(divisionCount)}টি বিভাগ
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={`/category/${product.category}`}
                className="badge badge-success badge-outline"
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
              <span className="badge badge-ghost">{perUnit(product.unit)}</span>
            </div>
          </div>
        </div>

        <div className="md:text-right">
          <p className="text-sm text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold text-primary">
            {formatNumber(product.today)}{" "}
            <span className="text-base font-medium text-gray-600">
              টাকা / {unitName(product.unit)}
            </span>
          </p>
          <div className="mt-2">
            <ChangeBadge change={product.change} size="lg" />
          </div>
          <p className="mt-2 text-sm text-gray-600">{diffText}</p>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        {history.map((item) => (
          <div key={item.label} className="rounded-box bg-base-100 p-4 text-center shadow-sm">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="mt-1 text-lg font-semibold">{formatTaka(item.value)}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-gray-800">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-box border border-green-200 bg-green-50 p-4">
            <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-2xl font-bold text-green-700">{formatTaka(summary.min)}</p>
            <p className="mt-2 text-xs text-gray-600">সবচেয়ে কম দামের বাজার</p>
            <p className="text-sm font-medium">
              {summary.minMarket.market}, {summary.minMarket.division}
            </p>
          </div>

          <div className="rounded-box border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-gray-600">সর্বাধিক দাম</p>
            <p className="mt-1 text-2xl font-bold text-red-700">{formatTaka(summary.max)}</p>
            <p className="mt-2 text-xs text-gray-600">সবচেয়ে বেশি দামের বাজার</p>
            <p className="text-sm font-medium">
              {summary.maxMarket.market}, {summary.maxMarket.division}
            </p>
          </div>

          <div className="rounded-box border border-base-300 bg-base-100 p-4">
            <p className="text-sm text-gray-600">গড় দাম</p>
            <p className="mt-1 text-2xl font-bold text-gray-800">{formatTaka(summary.avg)}</p>
            <p className="mt-2 text-xs text-gray-600">
              {perUnit(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-gray-800">বাজারভিত্তিক আজকের দাম</h2>
        <MarketTable
          markets={product.markets}
          cheapest={summary.minMarket}
          costliest={summary.maxMarket}
        />
      </section>
    </div>
  );
}
