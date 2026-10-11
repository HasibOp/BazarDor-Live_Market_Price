'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function UpdateProfileForm({
  currentName,
}: {
  currentName: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('নাম খালি রাখা যাবে না');
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) {
      toast.error('তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।');
      return;
    }

    toast.success('তথ্য সফলভাবে আপডেট হয়েছে');
    router.push('/profile');
    router.refresh();
  }

  return (
    <div className='mx-auto max-w-md rounded-box bg-base-100 p-6 shadow-sm sm:p-8'>
      <h1 className='text-2xl font-bold text-gray-800'>তথ্য আপডেট করুন</h1>
      <p className='mt-1 text-sm text-gray-600'>
        আপনার নাম বদলাতে নিচের ফর্মটি ব্যবহার করুন।
      </p>

      <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
        <label className='block'>
          <span className='mb-1 block text-sm font-medium'>নাম</span>
          <input
            type='text'
            className='input w-full'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <button
          type='submit'
          className='btn btn-primary w-full'
          disabled={loading}
        >
          {loading ? (
            <span className='loading loading-spinner'></span>
          ) : (
            'আপডেট'
          )}
        </button>
        <Link href='/profile' className='btn btn-ghost w-full'>
          বাতিল করুন
        </Link>
      </form>
    </div>
  );
}
