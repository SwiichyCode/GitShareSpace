"use server";

import { db } from "@/server/db";
import { action, userAction } from "@/lib/next-safe-action";
import { Prisma } from "@prisma/client";
import { PrismaError } from "@/lib/exceptions";
import { ERROR_MESSAGE } from "@/constants";
import octokitService from "@/services/octokit.service";
import * as z from "zod";

/**
 * Action to get a repository entry from the database.
 * @param {Object} data - The repository data to be retrieved.
 * @param {number} data.repositoryId - The ID of the repository to be retrieved.
 * @throws {Error} - Throws an error if the repository doesn't exist or if there's an error accessing the database.
 */

const getRepositorySchema = z.object({
  repositoryId: z.coerce.number(),
});

export const getRepository = action(getRepositorySchema, async (data) => {
  try {
    return await db.repository.findUniqueOrThrow({
      where: {
        id: data.repositoryId,
      },
      include: {
        language: true,
        topics: true,
        createdBy: true,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new PrismaError(error);
    }
  }
});

/**
 * Action to get all repository entries from the database.
 * @throws {Error} - Throws an error if there's an error accessing the database.
 */

const getRepositoriesSchema = z.object({});

export const getRepositories = action(getRepositoriesSchema, async () => {
  try {
    return await db.repository.findMany({
      include: {
        language: true,
        topics: true,
        createdBy: true,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new PrismaError(error);
    }
  }
});

/**
 * Action to get all repository entries from the database by filter.
 * @param {Object} data - The filter data to be used.
 * @param {string} data.query - The query string to filter the repositories.
 * @param {string} data.language - The language to filter the repositories.
 * @param {string} data.params - The parameters to filter the repositories.
 * @param {number} data.offset - The offset to start the query.
 * @param {number} data.limit - The limit of the query.
 * @param {number} data.cursor - The cursor to start the query.
 * @throws {Error} - Throws an error if there's an error accessing the database.
 */

const getRepositoriesByFilterSchema = z.object({
  queryParams: z.string().optional(),
  languageParams: z.string().optional(),
  params: z.string().optional(),
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  cursor: z.coerce.number().optional(),
});

export const getRepositoriesByFilter = action(
  getRepositoriesByFilterSchema,
  async (data) => {
    const query = data.queryParams ?? "";
    const language = data.languageParams ?? "";
    const params = data.params ?? "";
    const offset = data.offset ?? 0;
    const limit = data.limit ?? 20;
    const cursor = data.cursor ?? "";

    const where: Prisma.RepositoryWhereInput = {
      is_visible: true,
      repositoryName: {
        contains: query,
        mode: "insensitive",
      },
    };

    let orderBy: Prisma.RepositoryOrderByWithRelationInput = {
      id: "desc",
    };

    if (params === "latest") {
      orderBy = { id: "asc" };
    } else if (params === "starred") {
      orderBy = { repositoryStargazers: "desc" };
    } else if (params === "liked") {
      orderBy = { likes: { _count: "desc" } };
    }

    if (language && language !== "all") {
      where.language = {
        name: {
          equals: language,
          mode: "insensitive",
        },
      };
    }

    const [repositories, count] = await db.$transaction([
      db.repository.findMany({
        where,
        include: {
          createdBy: true,
          language: true,
          topics: true,
          comments: true,
        },
        orderBy,
        skip: cursor === undefined ? offset : 0,
        take: limit,
        cursor: cursor ? { id: cursor } : undefined,
      }),
      db.repository.count({
        where,
      }),
    ]);

    const nextCursor =
      repositories.length === limit ? repositories[limit - 1]!.id : undefined;

    return { repositories, nextCursor };
  },
);

/**
 * User action to create a new repository entry in the database.
 * @param {Object} data - The repository data to be saved.
 * @param {string} data.url - The URL of the repository.
 * @param {string} data.description - The description of the repository.
 * @param {string} data.createdBy - The ID of the user who created the repository.
 * @throws {Error} - Throws an error if the repository doesn't exist or if there's an error accessing the database.
 */

const postRepositorySchema = z.object({
  url: z.string().url(),
  description: z.string(),
  createdBy: z.string(),
  createdByUsername: z.string(),
});

export const postRepository = userAction(postRepositorySchema, async (data) => {
  const octokitResponse = await octokitService.getRepository(data.url);

  if (!octokitResponse) {
    throw new Error(ERROR_MESSAGE.REPOSITORY_NOT_EXIST);
  }

  try {
    await db.repository.create({
      data: {
        url: data.url,
        description: data.description,
        repositoryId: octokitResponse.data.id,
        repositoryName: octokitResponse.data.name,
        repositoryDescription: octokitResponse.data.description,
        repositoryStargazers: octokitResponse.data.stargazers_count,
        repositoryCreatedAt: octokitResponse.data.created_at,
        repositoryUpdatedAt: octokitResponse.data.updated_at,
        repositoryLicenseName: octokitResponse.data.license?.key,
        repositoryLicenseUrl: octokitResponse.data.license?.url ?? "",
        language: {
          connectOrCreate: {
            where: {
              name: octokitResponse.data.language ?? "",
            },
            create: {
              name: octokitResponse.data.language
                ? octokitResponse.data.language
                : "markdown",
            },
          },
        },
        topics: {
          connectOrCreate: octokitResponse.data.topics?.map((topic) => {
            return {
              where: {
                name: topic,
              },
              create: {
                name: topic,
              },
            };
          }),
        },
        is_template: octokitResponse.data.is_template,
        createdAt: octokitResponse.data.created_at,
        updatedAt: octokitResponse.data.updated_at,
        ownerUsername: octokitResponse.data.owner.login,
        ownerId: octokitResponse.data.owner.id,
        ownerAvatarUrl: octokitResponse.data.owner.avatar_url,
        createdBy: {
          connect: {
            id: data.createdBy,
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new PrismaError(error);
    }
    throw error;
  }
});
