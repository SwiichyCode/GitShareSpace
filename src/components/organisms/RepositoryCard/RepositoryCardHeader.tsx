import Link from "next/link";
import { ProfileAvatar } from "@/components/molecules/Avatar";
import { AdminWrapper } from "@/components/organisms/AdminWrapper";
import { RepositoryCardHide } from "./RepositoryCardHide";
import type { Repository } from "@/types/prisma.type";
import type { User } from "@/types/prisma.type";
import { displayNameOrUsername } from "@/lib/utils";

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
            Published by {displayNameOrUsername({ repository })}
          </span>
        </div>
      </div>
      <AdminWrapper role={user?.role}>
        <RepositoryCardHide repository={repository} />
      </AdminWrapper>
    </div>
  );
};
