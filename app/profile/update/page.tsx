import { redirect } from "next/navigation";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { getSession } from "@/lib/session";

export const metadata = { title: "তথ্য আপডেট — বাজার দর" };

export default async function UpdateProfilePage() {
  const session = await getSession();
  if (!session) redirect("/signin?reason=login&next=/profile/update");

  return <UpdateProfileForm currentName={session.user.name} />;
}
