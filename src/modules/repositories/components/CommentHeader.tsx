import Link from "next/link";
import { ProfileAvatar } from "@/components/layouts/ProfileAvatar";
import type { Repository } from "@/config/types/prisma.type";

type Props = {
  repository: Repository;
};

export const CommentHeader = ({ repository }: Props) => {
  return (
    <div className="flex items-center space-x-4">
      <ProfileAvatar
        pictureUrl={repository?.ownerAvatarUrl}
        alt={repository?.repositoryName}
      />
      <div className="flex flex-col">
        <Link
          href={repository?.url ?? "/"}
          className="text-xl font-semibold hover:underline"
          target="_blank"
        >
          {repository?.repositoryName}
        </Link>
        <span className="text-sm">
          Published by{" "}
          {repository?.createdBy.username ?? repository?.createdBy.name}
        </span>
      </div>
    </div>
  );
};
