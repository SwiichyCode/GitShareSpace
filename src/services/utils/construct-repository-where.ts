import type { Prisma } from "@prisma/client";

type constructRepositoryWhereType = {
  queryParams: string;
  languageParams: string;
};

export const constructRepositoryWhere = ({
  queryParams,
  languageParams,
}: constructRepositoryWhereType) => {
  const where: Prisma.RepositoryWhereInput = {
    is_visible: true,
    repositoryName: {
      contains: queryParams,
      mode: "insensitive",
    },
  };

  if (queryParams === "all") {
    delete where.repositoryName;
  }

  if (!languageParams) {
    return where;
  }

  where.language = {
    name: {
      equals: languageParams,
      mode: "insensitive",
    },
  };

  return where;
};
