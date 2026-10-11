'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import ProductGrid from './ProductGrid';
import { sortProducts } from '@/lib/stats';
import { toBn } from '@/lib/bn';
import type { Product, SortMode } from '@/lib/types';

export default function ProductList({
  products,
  showSort = false,
}: {
  products: Product[];
  showSort?: boolean;
}) {
  const [search, setSearch] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('default');

  const searched = products.filter((p) => p.nameBn.includes(search.trim()));
  const visible = sortProducts(searched, sortMode);

  return (
    <div>
      <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <label className='input w-full sm:max-w-xs'>
          <Search size={16} className='text-gray-400' />
          <input
            type='search'
            placeholder='পণ্যের নাম লিখুন…'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        {showSort && (
          <label className='flex items-center gap-2'>
            <span className='text-sm text-gray-600'>সাজান:</span>
            <select
              className='select w-full sm:w-52'
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
            >
              <option value='default'>ডিফল্ট</option>
              <option value='low'>দাম: কম থেকে বেশি</option>
              <option value='high'>দাম: বেশি থেকে কম</option>
            </select>
          </label>
        )}
      </div>

      <p className='mb-4 text-sm text-gray-500'>
        মোট {toBn(visible.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {visible.length > 0 ? (
        <ProductGrid products={visible} />
      ) : (
        <p className='rounded-box bg-base-100 p-8 text-center text-gray-500'>
          এই নামে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </div>
  );
}
