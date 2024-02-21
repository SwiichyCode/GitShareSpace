"use client";
import { X } from "lucide-react";
import { hideRepository } from "@/actions/hiderepository.action";
import type { Repository } from "@/types/prisma.type";

type Props = {
  repository: Repository;
};

export const RepositoryCardHide = ({ repository }: Props) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await hideRepository({ id: repository.id });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className="hover:text-red-500">
        <X className="h-4 w-4 " />
      </button>
    </form>
  );
};
