import type { Prisma } from "@prisma/client";

export const buildWhereCondition = (
  query?: string,
  language?: string,
): Prisma.RepositoryWhereInput => {
  const whereCondition: Prisma.RepositoryWhereInput = {
    is_visible: true,
    repositoryName: {
      contains: query,
      mode: "insensitive",
    },
  };

  if (language && language !== "all") {
    whereCondition.language = {
      name: {
        equals: language,
        mode: "insensitive",
      },
    };
  }

  return whereCondition;
};
