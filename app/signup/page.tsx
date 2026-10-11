import { redirect } from 'next/navigation';
import SignUpForm from '@/components/SignUpForm';
import { getSession } from '@/lib/session';

export const metadata = { title: 'সাইন আপ — বাজার দর' };

export default async function SignUpPage() {
  const session = await getSession();
  if (session) redirect('/');

  return <SignUpForm />;
}
