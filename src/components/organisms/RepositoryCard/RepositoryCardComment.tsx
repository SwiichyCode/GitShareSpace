import Link from "next/link";
import { CommentDiscussionIcon } from "@primer/octicons-react";
import type { Repository } from "@/types/prisma.type";

type Props = {
  repository: Repository;
};

export const RepositoryCardComment = ({ repository }: Props) => {
  return (
    <Link
      href={`repositories/${repository.id}`}
      className="flex items-center space-x-1 hover:text-[#2F81F7]"
    >
      <CommentDiscussionIcon className="h-4 w-4" />
      <span>0</span>
    </Link>
  );
};
