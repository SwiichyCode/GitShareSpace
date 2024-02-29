"use client";
import { useSidebar } from "@/stores/useSidebar";
import { LoginButton } from "@/components/molecules/LoginButton";
import { ProfileAvatar } from "@/components/molecules/Avatar";
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
