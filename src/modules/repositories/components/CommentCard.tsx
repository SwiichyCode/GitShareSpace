import Link from "next/link";
import { ProfileAvatar } from "@/components/layouts/ProfileAvatar";
import { calculateCommentCreatedRange } from "@/modules/repositories/utils/calculateCommentCreatedRange";

type Props = {
  avatar: string | null;
  username: string | null;
  name: string | null;
  createdAt: Date;
  content: string;
};

export const CommentCard = (props: Props) => {
  const { avatar, username, name, createdAt, content } = props;
  return (
    <div className="flex flex-col space-y-4 overflow-hidden rounded-md border border-card bg-default px-4 py-2 shadow">
      <div className="flex items-center gap-2">
        <ProfileAvatar pictureUrl={avatar ?? "/avatar.png"} />
        <div className="flex space-x-2">
          <Link
            href="#"
            className="hover:text-blue text-sm font-semibold hover:underline"
            target="_blank"
          >
            {username ?? name}
          </Link>
          <span className="hover:text-blue cursor-pointer text-sm text-[#848D86] hover:underline">
            {calculateCommentCreatedRange(createdAt)} ago
          </span>
        </div>
      </div>
      <div className="text-base">{content}</div>
    </div>
  );
};
