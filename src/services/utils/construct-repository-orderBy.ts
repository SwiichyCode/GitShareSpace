import type { Prisma } from "@prisma/client";

type OrderByConfig = Record<string, Prisma.RepositoryOrderByWithRelationInput>;

type constructRepositoryOrderByType = {
  params: string;
};

const orderByConfigs: OrderByConfig = {
  latest: { id: "asc" },
  starred: { repositoryStargazers: "desc" },
  liked: { likes: { _count: "desc" } },
};

export const constructRepositoryOrderBy = ({
  params,
}: constructRepositoryOrderByType): Prisma.RepositoryOrderByWithRelationInput => {
  const defaultOrderBy: Prisma.RepositoryOrderByWithRelationInput = {
    id: "desc",
  };

  return orderByConfigs[params] ?? defaultOrderBy;
};
