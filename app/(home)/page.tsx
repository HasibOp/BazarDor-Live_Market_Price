import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import ProductList from '@/components/ProductList';
import { getProducts } from '@/lib/api';
import { getFallers, getRisers } from '@/lib/stats';
import { toBn } from '@/lib/bn';

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className='space-y-12'>
      <Hero productCount={products.length} />

      <section>
        <h2 className='mb-4 text-2xl font-bold text-gray-800'>
          আজ দাম বেড়েছে <span className='text-green-600'>▲</span>
        </h2>
        <ProductGrid products={getRisers(products)} />
      </section>

      <section>
        <h2 className='mb-4 text-2xl font-bold text-gray-800'>
          আজ দাম কমেছে <span className='text-red-600'>▼</span>
        </h2>
        <ProductGrid products={getFallers(products)} />
      </section>

      <section id='সব-পণ্য' className='scroll-mt-40'>
        <h2 className='text-2xl font-bold text-gray-800'>সব পণ্য</h2>
        <p className='mb-4 text-gray-600'>
          {toBn(products.length)}টি নিত্যদিনের পণ্যের আজকের দাম
        </p>
        <ProductList products={products} />
      </section>
    </div>
  );
}
