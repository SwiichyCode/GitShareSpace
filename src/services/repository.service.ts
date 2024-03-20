import octokitService from "./github.service";

import { db } from "@/config/server/db";
import { Prisma } from "@prisma/client";
import { PrismaError } from "@/config/lib/exceptions";
import { constructRepositoryWhere } from "./utils/construct-repository-where";
import { constructRepositoryOrderBy } from "./utils/construct-repository-orderBy";
import type {
  GetRepositoriesByFilterType,
  HasStarredRepositoryType,
  PostRepositoryCommentType,
  PostRepositoryType,
  RepositoryEntry,
  UpdateRepositoryAlreadyStarredType,
} from "./types/repository.type";
import type { User } from "next-auth";
import type { components } from "@octokit/openapi-types";
import { ERROR_MESSAGE } from "@/config/constants";
import userService from "./user.service";
import { client } from "@/config/lib/appolo-client";
import { GET_MULTIPLE_REPOSITORIES } from "./graphql/repository.graphql";

interface RepositoryData {
  name: string;
  stargazers: { totalCount: number };
  licenseInfo?: { name: string; url: string };
  updatedAt: string;
}

type Data = Record<string, RepositoryData>;

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

  async getRepositoryGraphql() {
    return await db.repository.findMany({
      select: {
        ownerUsername: true,
        repositoryName: true,
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
    return await db.repository.findUniqueOrThrow({
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
   * @param {PostRepositoryType} - The repository url, description, user id, and score.
   * @throws {Error} - Throws an error if the repository doesn't exist or if there's an error accessing the database.
   */

  async postRepository({
    url,
    description,
    createdBy,
    userId,
    score,
  }: PostRepositoryType) {
    const octokitResponse = await octokitService.getRepository(url);

    if (!octokitResponse) {
      throw new Error(ERROR_MESSAGE.REPOSITORY_NOT_EXIST);
    }

    try {
      await db.$transaction([
        db.repository.create({
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
        }),

        // Increment the user's shared score
        db.user.update({
          where: {
            id: userId,
          },
          data: {
            sharedScore: {
              increment: score,
            },
          },
        }),
      ]);
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
   * @param {number[]} data.repositoryUrl - The ID of the repository.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async updateRepositoryAlreadyStarred({
    userId,
    repositoryId,
  }: UpdateRepositoryAlreadyStarredType) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        repositoryAlreadyStarred: {
          set: repositoryId,
        },
      },
    });
  }

  /**
   * Query to increment the stargazers count of a repository.
   * @param {Object} data - The repository data to be incremented.
   * @param {number} data.repositoryId - The ID of the repository to be incremented.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async incrementStargazersCount({ repositoryId }: RepositoryEntry) {
    await db.repository.update({
      where: {
        repositoryId,
      },
      data: {
        repositoryStargazers: {
          increment: 1,
        },
      },
    });
  }

  /**
   * Query to decrement the stargazers count of a repository.
   * @param {Object} data - The repository data to be decremented.
   * @param {number} data.repositoryId - The ID of the repository to be decremented.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async decrementStargazersCount({ repositoryId }: RepositoryEntry) {
    await db.repository.update({
      where: {
        repositoryId,
      },
      data: {
        repositoryStargazers: {
          decrement: 1,
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
      const octokitResponse = await octokitService.getRepository(
        repository.url,
      );

      if (!octokitResponse) {
        throw new Error(ERROR_MESSAGE.GITHUB_REPOSITORY_NOT_EXIST);
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

  async updatedSyncRepositories() {
    const repositories = await this.getRepositories();

    if (!repositories) {
      throw new Error(ERROR_MESSAGE.REPOSITORY_NOT_EXIST);
    }

    const { data } = await client.query({
      query: GET_MULTIPLE_REPOSITORIES(repositories),
    });

    const updates = Object.entries(data as Data).map(([_, value]) => {
      const repositoryData = value;
      const repository = repositories.find(
        (repo) => repo.repositoryName === repositoryData.name,
      );

      if (!repository) {
        throw new Error(ERROR_MESSAGE.GITHUB_REPOSITORY_NOT_EXIST);
      }

      return db.repository.update({
        where: {
          id: repository.id,
        },
        data: {
          repositoryStargazers: repositoryData.stargazers.totalCount,
          repositoryLicenseName: repositoryData.licenseInfo?.name,
          repositoryLicenseUrl: repositoryData.licenseInfo?.url ?? "",
          repositoryUpdatedAt: new Date(repositoryData.updatedAt),
        },
      });
    });

    await db.$transaction(updates);
  }

  /**
   * Query to sync the starred repositories of the user with the database.
   * @param {Object} user - The user to be synced.
   * @param {User} user - The user to be synced.
   * @throws {Error} - Throws an error if the user doesn't exist or if there's an error accessing the database.
   */

  async syncStarredRepositories(user: User) {
    if (!user) {
      throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const providerAccountID = await userService.getProviderAccountId({
      userId: user.id,
    });

    if (!providerAccountID) {
      throw new Error(ERROR_MESSAGE.PROVIDER_ACCOUNT_ID_NOT_FOUND);
    }

    const githubUser = await octokitService.getUserById(providerAccountID);

    if (!githubUser) {
      throw new Error(ERROR_MESSAGE.GITHUB_USER_NOT_FOUND);
    }

    const starredRepositories =
      await octokitService.getStaredRepositoriesByUser(githubUser.data.login);

    if (starredRepositories) {
      await this.updateRepositoryAlreadyStarred({
        userId: user.id,

        repositoryId: starredRepositories.data.map((elem) =>
          elem.hasOwnProperty("repo")
            ? (elem as components["schemas"]["starred-repository"]).repo.id
            : (elem as components["schemas"]["repository"]).id,
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
   * Query to create a new comment for a repository and increment the user's shared score.
   * @param {Object} data - The comment data to be saved.
   * @param {PostRepositoryCommentType} - The repository id, content, user id, and score.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async postRepositoryComment({
    repositoryId,
    content,
    createdBy,
    score,
  }: PostRepositoryCommentType) {
    await db.$transaction([
      db.comment.create({
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
      }),

      db.user.update({
        where: {
          id: createdBy,
        },
        data: {
          sharedScore: {
            increment: score,
          },
        },
      }),
    ]);
  }

  /**
   * Query to check if the user has starred a repository.
   * @param {Object} data - The data to be checked.
   * @param {HasStarredRepositoryType} - The user id and repository id.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async hasStarredRepository({
    userId,
    repositoryId,
  }: HasStarredRepositoryType) {
    return await db.user.findFirst({
      where: {
        id: userId,
        repositoryAlreadyStarred: {
          has: repositoryId,
        },
      },
    });
  }
}

export const repositoryService = new RepositoryService();
export default repositoryService;
