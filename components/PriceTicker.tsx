import { formatNumber, formatPercent, unitName } from '@/lib/bn';
import type { Product } from '@/lib/types';

export default function PriceTicker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  const items = [...products, ...products];

  return (
    <div
      className='ticker overflow-hidden bg-primary text-white'
      aria-label='আজকের দামের তালিকা'
    >
      <div className='ticker-track py-2 text-sm'>
        {items.map((p, index) => (
          <span
            key={index}
            className='flex items-center gap-1.5 whitespace-nowrap px-5'
          >
            <span>{p.image}</span>
            <span className='font-medium'>{p.nameBn}</span>
            <span>
              {formatNumber(p.today)} টাকা/{unitName(p.unit)}
            </span>
            {p.change.dir === 'up' && (
              <span className='text-green-200'>
                ▲ {formatPercent(p.change.pct)}
              </span>
            )}
            {p.change.dir === 'down' && (
              <span className='text-red-200'>
                ▼ {formatPercent(p.change.pct)}
              </span>
            )}
            {p.change.dir === 'flat' && (
              <span className='text-gray-200'>— ০.০%</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
