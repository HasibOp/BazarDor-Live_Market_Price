'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    toast.success('সফলভাবে সাইন আউট হয়েছে');
    router.push('/');
    router.refresh();
  }

  return (
    <button onClick={handleSignOut} className='btn btn-outline btn-error'>
      সাইন আউট
    </button>
  );
}
