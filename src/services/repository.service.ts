import { db } from "@/server/db";
import octokitService from "./octokit.service";
import { ERROR_MESSAGE } from "@/constants";

type postRepositoryData = {
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

    const repositoryExist = await this.getRepository(data.url);

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

  async getRepository(url: string) {
    return await db.repository.findFirst({
      where: {
        url,
      },
    });
  }

  async getRepositories() {
    return await db.repository.findMany({
      include: {
        createdBy: true,
        language: true,
        topics: true,
      },
    });
  }
}

const repositoryService = new RepositoryService();

export default repositoryService;
