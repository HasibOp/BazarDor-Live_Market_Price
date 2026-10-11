'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import SocialButtons from './SocialButtons';

export default function SignInForm({
  reason,
  next,
  registered,
}: {
  reason?: string;
  next: string;
  registered: boolean;
}) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reason === 'login') {
      toast.error('এই পাতা দেখতে আগে সাইন ইন করুন', { id: 'need-login' });
    }
    if (registered) {
      toast.success('অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন', {
        id: 'registered',
      });
    }
  }, [reason, registered]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('ইমেইল ও পাসওয়ার্ড দিন');
      toast.error('ইমেইল ও পাসওয়ার্ড দিন');
      return;
    }

    setLoading(true);
    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      const message = 'ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে';
      setError(message);
      toast.error(message);
      return;
    }

    toast.success('সফলভাবে সাইন ইন হয়েছে');
    router.push(next);
    router.refresh();
  }

  return (
    <div className='mx-auto max-w-md rounded-box bg-base-100 p-6 shadow-sm sm:p-8'>
      <h1 className='text-2xl font-bold text-gray-800'>সাইন ইন</h1>
      <p className='mt-1 text-sm text-gray-600'>
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
        <label className='block'>
          <span className='mb-1 block text-sm font-medium'>ইমেইল</span>
          <input
            type='email'
            className='input w-full'
            placeholder='you@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className='block'>
          <span className='mb-1 block text-sm font-medium'>পাসওয়ার্ড</span>
          <input
            type='password'
            className='input w-full'
            placeholder='কমপক্ষে ৮ অক্ষর'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && <p className='text-sm text-error'>{error}</p>}

        <button
          type='submit'
          className='btn btn-primary w-full'
          disabled={loading}
        >
          {loading ? (
            <span className='loading loading-spinner'></span>
          ) : (
            'সাইন ইন'
          )}
        </button>
      </form>

      <div className='divider my-6 text-sm text-gray-500'>অথবা</div>

      <SocialButtons next={next} />

      <p className='mt-6 text-center text-sm text-gray-600'>
        অ্যাকাউন্ট নেই?{' '}
        <Link
          href='/signup'
          className='font-semibold text-primary hover:underline'
        >
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}
