import Link from "next/link";
import { ProfileAvatar } from "@/components/molecules/Avatar";
import { calculateCommentCreatedRange } from "@/lib/utils";
import type { Comment } from "@/types/prisma.type";

type Props = {
  comment: Comment;
};

export const CommentCard = ({ comment }: Props) => {
  return (
    <div className="flex flex-col space-y-4 overflow-hidden rounded-md border border-card bg-default px-4 py-2 shadow">
      <div className="flex items-center gap-2">
        <ProfileAvatar pictureUrl={comment.createdBy.image ?? "/avatar.png"} />
        <div className="flex space-x-2">
          <Link
            href="#"
            className="text-sm font-semibold hover:text-[#2F81F7] hover:underline"
            target="_blank"
          >
            {comment.createdBy.username ?? comment.createdBy.name}
          </Link>
          <span className="cursor-pointer text-sm text-[#848D86] hover:text-[#2F81F7] hover:underline">
            {calculateCommentCreatedRange(comment.createdAt)} ago
          </span>
        </div>
      </div>
      <div className="text-base">{comment.content}</div>
    </div>
  );
};
