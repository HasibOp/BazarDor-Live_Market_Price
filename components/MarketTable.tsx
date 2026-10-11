import type { Market } from '@/lib/types';
import { formatTaka, toBn } from '@/lib/bn';
import { marketAverage } from '@/lib/stats';

export default function MarketTable({
  markets,
  cheapest,
  costliest,
}: {
  markets: Market[];
  cheapest: Market;
  costliest: Market;
}) {
  return (
    <div className='overflow-x-auto rounded-box border border-base-300 bg-base-100'>
      <table className='table'>
        <thead>
          <tr>
            <th>বাজার</th>
            <th>বিভাগ</th>
            <th className='text-right'>সর্বনিম্ন</th>
            <th className='text-right'>সর্বাধিক</th>
            <th className='text-right'>গড়</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((m) => {
            let rowClass = '';
            if (m === cheapest) rowClass = 'bg-green-50';
            if (m === costliest) rowClass = 'bg-red-50';

            return (
              <tr key={m.market + m.division} className={rowClass}>
                <td className='font-medium'>{m.market}</td>
                <td>{m.division}</td>
                <td className='text-right'>{formatTaka(m.min)}</td>
                <td className='text-right'>{formatTaka(m.max)}</td>
                <td className='text-right font-semibold'>
                  {formatTaka(marketAverage(m))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className='border-t border-base-300 px-4 py-2 text-xs text-gray-500'>
        মোট {toBn(markets.length)}টি বাজারের তথ্য · সবুজ = সবচেয়ে কম দামের
        বাজার · লাল = সবচেয়ে বেশি দামের বাজার
      </p>
    </div>
  );
}
