'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import AuthButtons from './AuthButtons';
import BanglaDate from './BanglaDate';
import type { Category } from '@/lib/types';

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <header className='sticky top-0 z-40 bg-base-100 shadow-sm'>
      <div className='mx-auto max-w-6xl px-4'>
        <div className='flex items-center justify-between gap-3 py-3'>
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/logo-icon.png'
              alt=''
              width={32}
              height={32}
              className='h-8 w-8'
            />
            <div className='leading-tight'>
              <div className='text-xl font-bold text-primary sm:text-2xl'>
                বাজার দর
              </div>
              <div className='text-xs text-gray-500 sm:text-sm'>
                <BanglaDate />
              </div>
            </div>
          </Link>

          <AuthButtons />
        </div>

        <nav className='-mx-4 overflow-x-auto px-4 pb-3'>
          <ul className='flex w-max gap-2 sm:w-auto sm:flex-wrap'>
            {categories.map((cat) => {
              const href = `/category/${cat.slug}`;
              const isActive = pathname === href;
              return (
                <li key={cat.slug}>
                  <Link
                    href={href}
                    className={
                      'block whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ' +
                      (isActive
                        ? 'bg-primary text-white'
                        : 'bg-base-200 text-gray-700 hover:bg-base-300')
                    }
                  >
                    {cat.nameBn}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
