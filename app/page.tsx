import { getProducts } from '../lib/api';
import BanglaDate from './components/BanglaDate';

export default async function HomePage() {
  const products = await getProducts().catch(() => []);

  return (
    <div className='mx-auto max-w-6xl px-4 py-6'>
      <h1 className='text-2xl font-bold'>আজকের বাজারদর</h1>
      <p className='mb-6 text-sm opacity-70'>
        <BanglaDate withTime />
      </p>

      {products.length === 0 ? (
        <p>এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।</p>
      ) : (
        <ul className='grid grid-cols-2 gap-4 md:grid-cols-4'>
          {products.map((p) => (
            <li key={p.id} className='rounded-lg border p-3'>
              <div className='font-semibold'>{p.nameBn}</div>
              <div>
                ৳{p.today} / {p.unit}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
