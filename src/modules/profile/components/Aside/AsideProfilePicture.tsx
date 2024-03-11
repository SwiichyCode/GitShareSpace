import Image from "next/image";

type Props = {
  profilePicture: string | null;
};

export const AsideProfilePicture = ({ profilePicture }: Props) => {
  return (
    <Image
      src={profilePicture!}
      width={296}
      height={296}
      alt="profile picture"
      className="rounded-full border border-input"
    />
  );
};
