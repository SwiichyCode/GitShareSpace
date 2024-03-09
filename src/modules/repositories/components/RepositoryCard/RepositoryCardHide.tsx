"use client";
import { X } from "lucide-react";
import { hideRepositoryAction } from "@/services/actions/hide-repository";
import { withAdminRole } from "@/components/withAdminRole";
import type { Repository } from "@/config/types/prisma.type";

type Props = {
  repository: Repository;
};

const RepositoryCardHide = ({ repository }: Props) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await hideRepositoryAction({ repositoryId: repository.id });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className="hover:text-red-500">
        <X className="h-4 w-4 " />
      </button>
    </form>
  );
};

export const RepositoryCardHideWithRole = withAdminRole(RepositoryCardHide);
