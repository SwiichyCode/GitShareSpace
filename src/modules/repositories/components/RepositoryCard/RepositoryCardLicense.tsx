import Link from "next/link";
import { LawIcon } from "@primer/octicons-react";
import type { Repository } from "@/config/types/prisma.type";

type Props = {
  repository: Repository;
};

export const RepositoryCardLicense = ({ repository }: Props) => {
  return (
    repository.repositoryLicenseName !== "No license" && (
      <div className="flex max-w-24 items-center space-x-1">
        <LawIcon className="h-4 w-4" />
        <Link href={repository.repositoryLicenseUrl} className="truncate">
          {repository.repositoryLicenseName}
        </Link>
      </div>
    )
  );
};
