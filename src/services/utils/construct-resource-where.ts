import type { Prisma } from "@prisma/client";

type constructRepositoryWhereType = {
  typeParams: string;
};

export const constructResourceWhere = ({
  typeParams,
}: constructRepositoryWhereType) => {
  const where: Prisma.ResourceWhereInput = {};

  if (!typeParams) {
    return where;
  }

  where.type = typeParams;

  return where;
};
