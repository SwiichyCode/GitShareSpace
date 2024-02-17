"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { useSidebar } from "@/stores/useSidebar";
import type { Session } from "next-auth";

type Props = {
  pictureUrl?: string;
  alt?: string;
};

export const ProfileAvatar = ({ pictureUrl, alt }: Props) => {
  const { setOpen } = useSidebar();

  return (
    <Avatar className="cursor-pointer" onClick={() => setOpen(true)}>
      <AvatarImage src={pictureUrl} alt={alt} />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
};
