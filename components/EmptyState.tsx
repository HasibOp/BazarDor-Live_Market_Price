import Link from 'next/link';

export default function EmptyState({
  title = 'কোনো পণ্য পাওয়া যায়নি',
  message = 'আপনি যে পাতাটি খুঁজছেন তা এখানে নেই।',
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className='mx-auto flex max-w-md flex-col items-center py-16 text-center'>
      <div className='text-7xl'>🛒</div>
      <h1 className='mt-4 text-2xl font-bold text-gray-800'>{title}</h1>
      <p className='mt-2 text-gray-600'>{message}</p>
      <Link href='/' className='btn btn-primary mt-6'>
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
