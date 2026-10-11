'use client';

import { useSyncExternalStore } from 'react';
import { formatBanglaDate, formatBanglaTime } from '../../lib/bn';

const subscribe = () => () => {};

export default function BanglaDate({
  value,
  withTime = false,
}: {
  value?: Date | string | number;
  withTime?: boolean;
}) {
  const text = useSyncExternalStore(
    subscribe,
    () => {
      const date = value ? new Date(value) : new Date();
      let result = formatBanglaDate(date);
      if (withTime) result += ' — ' + formatBanglaTime(date);
      return result;
    },
    () => '',
  );

  return <span suppressHydrationWarning>{text || ' '}</span>;
}
