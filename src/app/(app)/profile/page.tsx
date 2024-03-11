import { getServerAuthSession } from "@/config/server/auth";
import { UserIdWithRole } from "@/modules/profile/components/UserId";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  return <UserIdWithRole role={session?.user.role} session={session} />;
}
