import { getServerAuthSession } from "@/server/auth";
import { LoginButton } from "@/components/molecules/LoginButton";
import { ProfileAvatar } from "@/components/molecules/Avatar";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const AuthNavigation = async ({ session }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      {!session && <LoginButton />}
      {session && (
        <ProfileAvatar
          pictureUrl={session?.user.image ?? ""}
          alt={session?.user.name ?? ""}
        />
      )}
    </div>
  );
};
