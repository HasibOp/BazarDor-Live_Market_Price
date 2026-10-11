import Link from 'next/link';
import ChangeBadge from './ChangeBadge';
import { formatTaka, perUnit } from '@/lib/bn';
import type { Product } from '@/lib/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className='block rounded-box border border-base-300 bg-base-100 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md'
    >
      <div className='text-4xl'>{product.image}</div>
      <h3 className='mt-3 text-lg font-semibold text-gray-800'>
        {product.nameBn}
      </h3>
      <p className='text-sm text-gray-500'>{perUnit(product.unit)}</p>

      <div className='mt-4 flex items-end justify-between gap-2 border-t border-base-300 pt-3'>
        <div>
          <p className='text-xs text-gray-500'>আজকের দাম</p>
          <p className='text-lg font-bold text-primary'>
            {formatTaka(product.today)}
          </p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
