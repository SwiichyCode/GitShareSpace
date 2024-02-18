"use client";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { useSidebar } from "@/stores/useSidebar";

type Props = {
  pictureUrl?: string;
  alt?: string;
};

export const ProfileAvatar = ({ pictureUrl, alt }: Props) => {
  const { setOpen } = useSidebar();

  return (
    <Avatar className="cursor-pointer" onClick={() => setOpen(true)}>
      <Image
        src={pictureUrl ?? ""}
        width={40}
        height={40}
        alt={alt ?? ""}
        className="relative flex aspect-square h-10 w-10 shrink-0 overflow-hidden rounded-full"
      />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
};
