import { CommentCard } from "@/components/organisms/Comment/CommentCard";
import type { Comment } from "@/types/prisma.type";

type Props = {
  comments: Comment[] | undefined;
};

export const CommentList = ({ comments }: Props) => {
  return (
    <div className=" flex flex-col gap-8">
      {comments?.map((comment) => (
        <CommentCard
          key={comment.id}
          avatar={comment.createdBy.image}
          username={comment.createdBy.username}
          name={comment.createdBy.name}
          createdAt={comment.createdAt}
          content={comment.content}
        />
      ))}
    </div>
  );
};
