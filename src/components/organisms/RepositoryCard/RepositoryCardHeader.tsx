import Link from "next/link";
import { ProfileAvatar } from "@/components/molecules/Avatar";
import { AdminWrapper } from "@/components/organisms/AdminWrapper";
import { RepositoryCardHide } from "./RepositoryCardHide";
import type { Repository } from "@/types/prisma.type";
import type { User } from "next-auth";

type Props = {
  user: User | null;
  repository: Repository;
};

export const RepositoryCardHeader = ({ user, repository }: Props) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <ProfileAvatar
          pictureUrl={`${repository.ownerAvatarUrl}?size=40`}
          alt={repository.ownerUsername}
        />
        <div className="flex flex-col">
          <Link
            href={repository.url}
            className="w-48 truncate text-sm font-semibold hover:text-[#2F81F7] hover:underline"
            target="_blank"
          >
            {repository.ownerUsername}/{repository.repositoryName}
          </Link>
          <span className="text-xs">
            Published by {repository.createdBy.name}
          </span>
        </div>
      </div>
      <AdminWrapper user={user}>
        <RepositoryCardHide repository={repository} />
      </AdminWrapper>
    </div>
  );
};
