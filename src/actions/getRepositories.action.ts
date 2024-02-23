"use server";
import { db } from "@/server/db";

export const getRepositoriesOnScroll = async ({
  search,
  offset = 0,
  limit = 20,
  cursor,
}: {
  search?: string | undefined;
  offset?: number;
  limit?: number;
  cursor?: number;
}) => {
  const data = await db.repository.findMany({
    where: {
      is_visible: true,
      repositoryName: {
        contains: search,
      },
    },
    include: {
      createdBy: true,
      language: true,
      topics: true,
    },
    orderBy: {
      id: "desc",
    },
    skip: cursor !== undefined ? 1 : offset,
    take: limit,
    cursor: cursor ? { id: cursor } : undefined,
  });

  const totalCount = await db.repository.count({
    where: {
      is_visible: true,
      repositoryName: {
        contains: search,
      },
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    totalCount,
    totalPages,
  };
};
