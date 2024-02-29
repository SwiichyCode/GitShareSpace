import type { Session } from "next-auth";
import { ProfileAvatar } from "@/components/molecules/Avatar";
import { Button } from "@/components/atoms/button";
import { useSidebar } from "@/stores/useSidebar";

type Props = {
  session: Session | null;
};

export const SidebarHeader = async ({ session }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {session && (
        <ProfileAvatar
          pictureUrl={session.user.image ?? ""}
          alt={session.user.name ?? ""}
        />
      )}
      <div className="flex flex-col">
        <span className="w-36 truncate text-base font-bold">
          {session?.user.username ?? session?.user.name}
        </span>
        <span className="w-36 truncate text-sm">{session?.user.email}</span>
      </div>
    </div>
  );
};
