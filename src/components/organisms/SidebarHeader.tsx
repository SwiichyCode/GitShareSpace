import type { Session } from "next-auth";
import { ProfileAvatar } from "../molecules/Avatar";

type Props = {
  session: Session | null;
};

export const SidebarHeader = async ({ session }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <ProfileAvatar session={session} />
      <div className="flex flex-col">
        <span className="text-base font-bold">{session?.user.name}</span>
        <span className="text-sm">{session?.user.email}</span>
      </div>
    </div>
  );
};
