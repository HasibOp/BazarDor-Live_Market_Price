import { formatPercent } from '@/lib/bn';
import type { PriceChange } from '@/lib/types';

export default function ChangeBadge({
  change,
  size = 'sm',
}: {
  change: PriceChange;
  size?: 'sm' | 'lg';
}) {
  const sizeClass =
    size === 'lg' ? 'px-3 py-1 text-base' : 'px-2 py-0.5 text-xs';

  let colorClass = 'bg-gray-100 text-gray-600';
  let text = '— ০.০%';

  if (change.dir === 'up') {
    colorClass = 'bg-green-100 text-green-700';
    text = '▲ ' + formatPercent(change.pct);
  } else if (change.dir === 'down') {
    colorClass = 'bg-red-100 text-red-700';
    text = '▼ ' + formatPercent(change.pct);
  }

  return (
    <span
      className={`inline-block rounded-full font-semibold ${sizeClass} ${colorClass}`}
    >
      {text}
    </span>
  );
}
