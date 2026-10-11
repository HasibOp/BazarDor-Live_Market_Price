import { redirect } from "next/navigation";
import SignInForm from "@/components/SignInForm";
import { getSession, safeNextPath } from "@/lib/session";

export const metadata = { title: "সাইন ইন — বাজার দর" };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; next?: string; registered?: string }>;
}) {
  const { reason, next, registered } = await searchParams;

  const session = await getSession();
  if (session) redirect("/");

  return (
    <SignInForm
      reason={reason}
      next={safeNextPath(next)}
      registered={registered === "1"}
    />
  );
}
