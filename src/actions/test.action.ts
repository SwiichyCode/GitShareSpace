"use server";

import { db } from "@/server/db";

export const getRepositoriesOnScroll = async ({
  query,
  offset = 0,
  limit = 20,
  cursor,
}: {
  query?: string | undefined;
  offset?: number;
  limit?: number;
  cursor?: number;
}) => {
  const [data, totalCount] = await db.$transaction([
    db.repository.findMany({
      where: {
        is_visible: true,
        repositoryName: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        createdBy: true,
        language: true,
        topics: true,
        comments: true,
      },
      orderBy: {
        id: "desc",
      },
      skip: cursor !== undefined ? 1 : offset,
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
      cacheStrategy: { ttl: 60 },
    }),

    db.repository.count({
      where: {
        is_visible: true,
        repositoryName: {
          contains: query,
        },
      },
      cacheStrategy: { ttl: 60 },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    totalCount,
    totalPages,
  };
};

export const getRepositories = async () => {
  return await db.repository.findMany({
    where: {
      is_visible: true,
    },
    include: {
      createdBy: true,
      language: true,
      topics: true,
      comments: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const getLikes = async () => {
  return await db.like.findMany();
};

export const getUser = async (userId: string) => {
  return await db.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      likes: true,
    },
  });
};
