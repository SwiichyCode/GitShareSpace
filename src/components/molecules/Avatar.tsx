"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { useSidebar } from "@/stores/useSidebar";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const ProfileAvatar = ({ session }: Props) => {
  const { setOpen } = useSidebar();

  return (
    session && (
      <Avatar className="cursor-pointer" onClick={() => setOpen(true)}>
        <AvatarImage
          src={session?.user.image ?? ""}
          alt={session?.user.name ?? ""}
        />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    )
  );
};
