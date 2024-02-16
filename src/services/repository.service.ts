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
