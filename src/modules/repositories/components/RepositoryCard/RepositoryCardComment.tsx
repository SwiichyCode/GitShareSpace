import Link from "next/link";
import { CommentDiscussionIcon } from "@primer/octicons-react";
import type { Repository } from "@/config/types/prisma.type";

type Props = {
  repository: Repository;
};

export const RepositoryCardComment = ({ repository }: Props) => {
  return (
    <Link
      href={`repositories/${repository.id}`}
      className="hover:text-blue flex items-center space-x-1"
    >
      <CommentDiscussionIcon className="h-4 w-4" />
      <span>{repository.comments.length}</span>
    </Link>
  );
};
