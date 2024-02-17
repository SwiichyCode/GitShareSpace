import { getServerAuthSession } from "@/server/auth";
import { LoginButton } from "@/components/molecules/LoginButton";
import { LogoutButton } from "@/components/molecules/LogoutButton";
import { ProfileAvatar } from "@/components/molecules/Avatar";

export const AuthNavigation = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="flex items-center space-x-2">
      {!session && <LoginButton />} {session && <LogoutButton />}
      <ProfileAvatar session={session} />
    </div>
  );
};
