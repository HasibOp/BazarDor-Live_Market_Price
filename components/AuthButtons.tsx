'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    toast.success('সফলভাবে সাইন আউট হয়েছে');
    router.push('/');
    router.refresh();
  }

  if (isPending) {
    return <div className='skeleton h-9 w-28 sm:h-10 sm:w-40'></div>;
  }

  if (!session) {
    return (
      <div className='flex items-center gap-2'>
        <Link
          href='/signin'
          className='btn btn-outline btn-primary btn-sm sm:btn-md'
        >
          সাইন ইন
        </Link>
        <Link href='/signup' className='btn btn-primary btn-sm sm:btn-md'>
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className='dropdown dropdown-end'>
      <div
        tabIndex={0}
        role='button'
        className='btn btn-ghost btn-sm gap-2 sm:btn-md'
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt=''
            className='h-7 w-7 rounded-full object-cover'
          />
        ) : (
          <span className='flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white'>
            {user.name?.charAt(0) || '?'}
          </span>
        )}
        <span className='hidden max-w-28 truncate sm:inline'>{user.name}</span>
      </div>
      <ul
        tabIndex={0}
        className='menu dropdown-content z-50 mt-2 w-48 rounded-box bg-base-100 p-2 shadow-lg'
      >
        <li>
          <Link href='/profile'>আমার প্রোফাইল</Link>
        </li>
        <li>
          <button onClick={handleSignOut}>সাইন আউট</button>
        </li>
      </ul>
    </div>
  );
}
