'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import SocialButtons from './SocialButtons';

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Returns an error message, or "" if everything is fine
  function validate() {
    if (!name.trim()) return 'আপনার নাম লিখুন';
    if (!email.trim()) return 'ইমেইল দিন';
    if (password.length < 8) return 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে';
    if (password !== confirm) return 'দুইটি পাসওয়ার্ড একই নয়';
    return '';
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const problem = validate();
    if (problem) {
      setError(problem);
      toast.error(problem);
      return;
    }

    setError('');
    setLoading(true);
    const { error: signUpError } = await authClient.signUp.email({
      name: name.trim(),
      email,
      password,
    });
    setLoading(false);

    if (signUpError) {
      const message =
        signUpError.code === 'USER_ALREADY_EXISTS' ||
        signUpError.code === 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL'
          ? 'এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে'
          : 'অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।';
      setError(message);
      toast.error(message);
      return;
    }

    await authClient.signOut();
    router.push('/signin?registered=1');
    router.refresh();
  }

  return (
    <div className='mx-auto max-w-md rounded-box bg-base-100 p-6 shadow-sm sm:p-8'>
      <h1 className='text-2xl font-bold text-gray-800'>অ্যাকাউন্ট তৈরি করুন</h1>
      <p className='mt-1 text-sm text-gray-600'>
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
        <label className='block'>
          <span className='mb-1 block text-sm font-medium'>নাম</span>
          <input
            type='text'
            className='input w-full'
            placeholder='যেমন: রহিম উদ্দিন'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

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

        <label className='block'>
          <span className='mb-1 block text-sm font-medium'>
            পাসওয়ার্ড নিশ্চিত করুন
          </span>
          <input
            type='password'
            className='input w-full'
            placeholder='আবার লিখুন'
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
            'সাইন আপ'
          )}
        </button>
      </form>

      <div className='divider my-6 text-sm text-gray-500'>অথবা</div>

      <SocialButtons next='/' />

      <p className='mt-6 text-center text-sm text-gray-600'>
        অ্যাকাউন্ট আছে?{' '}
        <Link
          href='/signin'
          className='font-semibold text-primary hover:underline'
        >
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}
