import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Noto_Sans_Bengali } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import Footer from '@/components/Footer';
import { getCategories, getProducts } from '@/lib/api';
import './globals.css';

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bangla',
});

export const metadata: Metadata = {
  title: 'বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে',
  description:
    'চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর, বাজারভিত্তিক তুলনা এবং দামের পরিবর্তন এক জায়গায়।',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const categories = await getCategories().catch(() => []);
  const products = await getProducts().catch(() => []);

  return (
    <html lang='bn' data-theme='bazar' className={notoBengali.variable}>
      <body className='flex min-h-screen flex-col'>
        <Navbar categories={categories} />
        <PriceTicker products={products} />
        <main className='mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8'>
          {children}
        </main>
        <Footer />
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
