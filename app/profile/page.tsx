import Link from "next/link";
import { redirect } from "next/navigation";
import BanglaDate from "@/components/BanglaDate";
import SignOutButton from "@/components/SignOutButton";
import { getSession } from "@/lib/session";

export const metadata = { title: "আমার প্রোফাইল — বাজার দর" };

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/signin?reason=login&next=/profile");

  const { user } = session;

  return (
    <div className="mx-auto max-w-lg rounded-box bg-base-100 p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold text-gray-800">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-gray-600">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <div className="mt-6 flex flex-col items-center gap-3 text-center">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="h-24 w-24 rounded-full object-cover" />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-white">
            {user.name?.charAt(0) || "?"}
          </div>
        )}
        <div>
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <dl className="mt-6 divide-y divide-base-300 rounded-box border border-base-300 text-sm">
        <div className="flex justify-between gap-4 p-3">
          <dt className="text-gray-500">নাম</dt>
          <dd className="font-medium">{user.name}</dd>
        </div>
        <div className="flex justify-between gap-4 p-3">
          <dt className="text-gray-500">ইমেইল</dt>
          <dd className="break-all font-medium">{user.email}</dd>
        </div>
        <div className="flex justify-between gap-4 p-3">
          <dt className="text-gray-500">সেশন শুরু</dt>
          <dd className="text-right font-medium">
            <BanglaDate value={session.session.createdAt} withTime />
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/profile/update" className="btn btn-primary">
          আপডেট
        </Link>
        <SignOutButton />
      </div>
    </div>
  );
}
