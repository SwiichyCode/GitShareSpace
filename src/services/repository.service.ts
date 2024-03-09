import octokitService from "./github.service";

import { db } from "@/config/server/db";
import { Prisma } from "@prisma/client";
import { PrismaError } from "@/config/lib/exceptions";
import { constructRepositoryWhere } from "./utils/construct-repository-where";
import { constructRepositoryOrderBy } from "./utils/construct-repository-orderBy";
import { extractUserIdFromAvatarUrl } from "./utils/extract-user-id-from-avatar-url";
import type {
  GetRepositoriesByFilterType,
  PostRepositoryCommentType,
  PostRepositoryType,
  RepositoryEntry,
  UpdateRepositoryAlreadyStarredType,
} from "./types/repository.type";
import type { User } from "next-auth";

import { ERROR_MESSAGE } from "@/config/constants";

class RepositoryService {
  /**
   * Query to get all repository entries from the database.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getRepositories() {
    return await db.repository.findMany({
      include: {
        language: true,
        topics: true,
        createdBy: true,
      },
    });
  }

  /**
   * Query to get a repository entry from the database.
   * @param {Object} data - The repository data to be retrieved.
   * @param {number} data.repositoryId - The ID of the repository to be retrieved.
   * @throws {Error} - Throws an error if the repository doesn't exist or if there's an error accessing the database.
   */

  async getRepository({ repositoryId }: RepositoryEntry) {
    return await db.repository.findUnique({
      where: {
        id: repositoryId,
      },
      include: {
        comments: true,
        language: true,
        topics: true,
        createdBy: true,
      },
    });
  }

  /**
   * Query to get all comments for a repository from the database.
   * @param {Object} data - The repository data to be retrieved.
   * @param {number} data.repositoryId - The ID of the repository to be retrieved.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getCommentsByRepositoryId({ repositoryId }: RepositoryEntry) {
    return await db.comment.findMany({
      where: {
        repositoryId: repositoryId,
      },
      include: {
        createdBy: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  /**
   * Query to create a new repository entry in the database.
   * @param {Object} data - The repository data to be saved.
   * @param {string} data.url - The URL of the repository.
   * @param {string} data.description - The description of the repository.
   * @param {string} data.createdBy - The ID of the user who created the repository.
   * @throws {Error} - Throws an error if the repository doesn't exist or if there's an error accessing the database.
   */

  async postRepository({ url, description, createdBy }: PostRepositoryType) {
    const octokitResponse = await octokitService.getRepository(url);

    if (!octokitResponse) {
      throw new Error(ERROR_MESSAGE.REPOSITORY_NOT_EXIST);
    }

    try {
      await db.repository.create({
        data: {
          url: url,
          description: description,
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
              id: createdBy,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaError(error);
      }
      if (error instanceof Error) return { error: error.message };
    }
  }

  /**
   * Query to update the repository already starred by the user.
   * @param {string} data.userId - The ID of the user.
   * @param {string[]} data.repositoryUrl - The URL of the repository.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async updateRepositoryAlreadyStarred({
    userId,
    repositoryUrl,
  }: UpdateRepositoryAlreadyStarredType) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        repositoryAlreadyStarred: {
          set: repositoryUrl,
        },
      },
    });
  }

  /**
   * Query to get all repository entries from the database by filter.
   * @param {Object} data - The filter data to be used.
   * @param {string} data.query - The query string to filter the repositories.
   * @param {string} data.language - The language to filter the repositories.
   * @param {string} data.params - The parameters to filter the repositories.
   * @param {number} data.offset - The offset to start the query.
   * @param {number} data.limit - The limit of the query.
   * @param {number} data.cursor - The cursor to start the query.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getRepositoriesByFilter({
    queryParams = "",
    languageParams = "",
    params = "",
    offset = 0,
    limit = 20,
    cursor = 0,
  }: GetRepositoriesByFilterType) {
    const where = constructRepositoryWhere({ queryParams, languageParams });
    const orderBy = constructRepositoryOrderBy({ params });

    const repositories = await db.repository.findMany({
      where,
      include: {
        createdBy: true,
        language: true,
        topics: true,
        comments: true,
      },
      orderBy,
      take: limit,
      skip: cursor ? 0 : offset,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor =
      repositories.length === limit ? repositories[limit - 1]!.id : undefined;

    return { repositories, nextCursor };
  }

  /**
   * Query to sync all repository entries from the database with the GitHub API.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async syncRepositories() {
    const repositories = await this.getRepositories();
    if (!repositories) {
      throw new Error(ERROR_MESSAGE.REPOSITORY_NOT_EXIST);
    }
    for (const repository of repositories) {
      const octokitResponse = await octokitService.getRepositoryById(
        repository.repositoryId,
      );
      if (!octokitResponse) {
        throw new Error(ERROR_MESSAGE.REPOSITORY_NOT_EXIST);
      }
      await db.repository.update({
        where: {
          id: repository.id,
        },
        data: {
          repositoryStargazers: octokitResponse.data.stargazers_count,
          repositoryLicenseName: octokitResponse.data.license?.key,
          repositoryLicenseUrl: octokitResponse.data.license?.url ?? "",
          repositoryUpdatedAt: octokitResponse.data.updated_at,
        },
      });
    }
  }

  /**
   * Query to sync the starred repositories of the user with the database.
   * @param {Object} user - The user to be synced.
   * @throws {Error} - Throws an error if the user doesn't exist or if there's an error accessing the database.
   */

  async syncStarredRepositories(user: User) {
    if (!user) {
      throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const githubUser = await octokitService.getUser(
      extractUserIdFromAvatarUrl(user.image!),
    );

    if (!githubUser) {
      throw new Error(ERROR_MESSAGE.GITHUB_USER_NOT_FOUND);
    }

    const starredRepositories =
      //eslint-disable-next-line
      await octokitService.getStaredRepositoriesByUser(githubUser.data.login);

    if (starredRepositories) {
      await this.updateRepositoryAlreadyStarred({
        userId: user.id,
        //eslint-disable-next-line
        repositoryUrl: starredRepositories.data.map(
          //eslint-disable-next-line
          (repo: any) => repo.html_url,
        ),
      });
    }
  }

  /**
   * Query to hide a repository entry from the database.
   * @param {string} repositoryId - The ID of the repository to be hidden.
   * @throws {Error} - Throws an error if the repository doesn't exist or if there's an error accessing the database.
   */

  async hideRepository({ repositoryId }: RepositoryEntry) {
    await db.repository.update({
      where: {
        id: repositoryId,
      },
      data: {
        is_visible: false,
      },
    });
  }

  /**
   * Query to get all languages from the database.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getLanguages() {
    return await db.language.findMany();
  }

  /**
   * Query to create a new comment for a repository in the database.
   * @param {Object} data - The comment data to be saved.
   * @param {number} data.repositoryId - The ID of the repository.
   * @param {string} data.content - The content of the comment.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async postRepositoryComment({
    repositoryId,
    content,
    createdBy,
  }: PostRepositoryCommentType) {
    await db.comment.create({
      data: {
        content: content,
        createdBy: {
          connect: {
            id: createdBy,
          },
        },
        repository: {
          connect: {
            id: repositoryId,
          },
        },
      },
    });
  }
}

export const repositoryService = new RepositoryService();
export default repositoryService;
