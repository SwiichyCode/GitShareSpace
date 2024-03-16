import type { Prisma } from "@prisma/client";

type constructRepositoryWhereType = {
  //   queryParams: string;
  typeParams: string;
};

export const constructResourceWhere = ({
  //   queryParams,
  typeParams,
}: constructRepositoryWhereType) => {
  const where: Prisma.ResourceWhereInput = {
    // is_visible: true,
    // type: {
    //   contains: queryParams,
    //   mode: "insensitive",
    // },
  };

  //   if (queryParams === "all") {
  //     delete where.repositoryName;
  //   }

  if (!typeParams) {
    return where;
  }

  where.type = typeParams;

  return where;
};
