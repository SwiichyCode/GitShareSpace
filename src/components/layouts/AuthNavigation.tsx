"use client";
import { useSidebar } from "@/components/layouts/Sidebar/useSidebar";
import { LoginButton } from "@/components/layouts/LoginButton";
import { ProfileAvatar } from "@/components/layouts/ProfileAvatar";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const AuthNavigation = ({ session }: Props) => {
  const { toggle } = useSidebar();

  return (
    <div className="flex items-center space-x-2">
      {!session && <LoginButton />}
      {session && (
        <button onClick={toggle}>
          <ProfileAvatar
            pictureUrl={session?.user.image ?? ""}
            alt={session?.user.name ?? ""}
          />
        </button>
      )}
    </div>
  );
};
