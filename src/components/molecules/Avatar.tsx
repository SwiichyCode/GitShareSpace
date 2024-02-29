import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/atoms/avatar";

type Props = {
  pictureUrl?: string | null;
  alt?: string;
};

export const ProfileAvatar = ({ pictureUrl, alt }: Props) => {
  return (
    <Avatar>
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
