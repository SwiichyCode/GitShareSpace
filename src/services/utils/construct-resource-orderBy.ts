import type { Prisma } from "@prisma/client";

type OrderByConfig = Record<string, Prisma.ResourceOrderByWithRelationInput>;

type constructResourceOrderByType = {
  params: string;
};

const orderByConfigs: OrderByConfig = {
  latest: { id: "asc" },
};

export const constructResourceOrderBy = ({
  params,
}: constructResourceOrderByType): Prisma.ResourceOrderByWithRelationInput => {
  const defaultOrderBy: Prisma.ResourceOrderByWithRelationInput = {
    id: "desc",
  };

  return orderByConfigs[params] ?? defaultOrderBy;
};
