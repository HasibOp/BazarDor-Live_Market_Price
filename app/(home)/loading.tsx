import ProductSkeleton from '@/components/ProductSkeleton';

export default function Loading() {
  return (
    <div className='space-y-12'>
      <div className='skeleton h-64 w-full'></div>
      <section>
        <div className='skeleton mb-4 h-8 w-56'></div>
        <ProductSkeleton count={4} />
      </section>
      <section>
        <div className='skeleton mb-4 h-8 w-56'></div>
        <ProductSkeleton count={4} />
      </section>
    </div>
  );
}
