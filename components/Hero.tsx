import Image from 'next/image';
import { toBn } from '@/lib/bn';

export default function Hero({ productCount }: { productCount: number }) {
  return (
    <section className='flex flex-col items-center gap-6 rounded-box bg-base-100 p-6 shadow-sm md:flex-row md:p-10'>
      <div className='text-center md:flex-3 md:text-left'>
        <p className='inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-primary'>
          🛒 {toBn(productCount)}টি নিত্যদিনের পণ্য
        </p>
        <h1 className='mt-3 text-3xl font-bold leading-tight text-gray-800 lg:text-4xl'>
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className='mt-3 text-gray-600'>
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a href='#সব-পণ্য' className='btn btn-primary mt-5'>
          সব পণ্য দেখুন
        </a>
      </div>

      <div className='md:flex-2'>
        <Image
          src='/bazar-hero.png'
          alt='সবজি ও ফলের ঝুড়ি'
          width={315}
          height={263}
          priority
          className='mx-auto h-auto w-64 md:w-80'
        />
      </div>
    </section>
  );
}
