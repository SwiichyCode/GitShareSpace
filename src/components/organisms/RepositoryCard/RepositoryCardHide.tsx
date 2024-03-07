"use client";
import { X } from "lucide-react";
import { hideRepository } from "@/services/repository.service";
import { withAdminRole } from "@/components/_HOCs/withAdminRole";
import type { Repository } from "@/types/prisma.type";

type Props = {
  repository: Repository;
};

const RepositoryCardHide = ({ repository }: Props) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await hideRepository({ repositoryId: repository.id });
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
