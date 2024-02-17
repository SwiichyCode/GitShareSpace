import { db } from "@/server/db";
import octokitService from "./octokit.service";

type postRepositoryData = {
  url: string;
  createdBy: string;
};

class RepositoryService {
  async postRepository(data: postRepositoryData) {
    const octokitResponse = await octokitService.getRepository(data.url);

    if (!octokitResponse) {
      throw new Error("Repository does not exist");
    }

    const repositoryResponse = await this.getRepository(data.url);

    if (repositoryResponse) {
      throw new Error("Repository already exists");
    }

    return await db.repository.create({
      data: {
        url: data.url,
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
}

const repositoryService = new RepositoryService();

export default repositoryService;
