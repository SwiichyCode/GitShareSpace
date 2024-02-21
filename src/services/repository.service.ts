import { db } from "@/server/db";
import octokitService from "./octokit.service";
import { ERROR_MESSAGE } from "@/constants";
import type { Account } from "next-auth";

export type postRepositoryData = {
  url: string;
  description?: string;
  createdBy: string;
};

class RepositoryService {
  async postRepository(data: postRepositoryData) {
    const octokitResponse = await octokitService.getRepository(data.url);

    if (!octokitResponse) {
      throw new Error(ERROR_MESSAGE.REPOSITORY_NOT_EXIST);
    }

    const repositoryExist = await this.getRepository(octokitResponse.data.id);

    if (repositoryExist) {
      throw new Error(ERROR_MESSAGE.REPOSITORY_ALREADY_EXIST);
    }

    return await db.repository.create({
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
              name: octokitResponse.data.language ?? "",
            },
          },
        },
        topics: {
          connectOrCreate: octokitResponse.data.topics?.map((topic: string) => {
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
  }

  async getRepository(repositoryId: number) {
    return await db.repository.findFirst({
      where: {
        repositoryId,
      },
      include: {
        topics: true,
      },
    });
  }

  async getRepositories() {
    return await db.repository.findMany({
      where: {
        is_visible: true,
      },
      include: {
        createdBy: true,
        language: true,
        topics: true,
      },
      orderBy: {
        id: "desc",
      },
    });
  }

  async hideRepository(id: number) {
    return await db.repository.update({
      where: {
        id,
      },
      data: {
        is_visible: false,
      },
    });
  }

  async updateRepositoryAlreadyStarred(
    userId: string,
    repositoryUrl: string[],
  ) {
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

  async syncStarredRepositories(userId: string, account: Account | null) {
    const githubUser = await octokitService.getUser(account?.providerAccountId);

    if (!githubUser) {
      throw new Error(ERROR_MESSAGE.GITHUB_USER_NOT_FOUND);
    }

    const starredRepositories =
      //eslint-disable-next-line
      await octokitService.getStaredRepositoriesByUser(githubUser.data.login);

    if (starredRepositories) {
      await this.updateRepositoryAlreadyStarred(
        userId,
        //eslint-disable-next-line
        starredRepositories.data.map((repo: any) => repo.html_url),
      );
    }
  }

  async syncRepositories() {
    const repositories = await this.getRepositories();

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
}

const repositoryService = new RepositoryService();

export default repositoryService;
