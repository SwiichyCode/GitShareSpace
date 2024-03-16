import Link from "next/link";
import { useRepositoriesContext } from "@/modules/repositories/context/repositoriesContext";
import { ProfileAvatar } from "@/components/layouts/ProfileAvatar";
import { RepositoryCardHideWithRole } from "./RepositoryCardHide";
import { URL } from "@/config/constants";
import type { Repository } from "@/config/types/prisma.type";

type Props = {
  repository: Repository;
  isComment?: boolean;
};

export const RepositoryCardHeader = ({ repository }: Props) => {
  const { user } = useRepositoriesContext();
  return (
    <>
      <div className="flex items-center gap-2">
        <ProfileAvatar
          pictureUrl={`${repository.ownerAvatarUrl}?size=40`}
          alt={repository.ownerUsername}
        />

        <div className="flex flex-col">
          <Link
            href={repository.url}
            className="w-48 truncate text-sm font-semibold hover:text-blue hover:underline"
            target="_blank"
          >
            {repository.ownerUsername}/{repository.repositoryName}
          </Link>
          <span className="text-xs">
            Published by{" "}
            <Link
              href={`${URL.PROFILE}/${repository.createdBy.id}?username=${repository.createdBy.username}`}
              className="text-blue underline"
            >
              {repository.createdBy.username ?? repository.createdBy.name}
            </Link>
          </span>
        </div>
      </div>

      <RepositoryCardHideWithRole role={user?.role} repository={repository} />
    </>
  );
};
