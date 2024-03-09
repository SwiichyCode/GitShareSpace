import { octokit } from "@/config/lib/octokit";
import { OCTOKIT_ENDPOINT, ERROR_MESSAGE } from "@/config/constants";
import type { Octokit } from "octokit";
import type { OctokitRepositoryResponse } from "@/config/lib/octokit";

class OctokitService {
  private octokit: Octokit;

  constructor(octokit: Octokit) {
    this.octokit = octokit;
  }

  async getUser(userId: string | undefined) {
    try {
      return await this.octokit.request(OCTOKIT_ENDPOINT.GET_USER, {
        userId,
      });
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }

  async getRepository(url: string) {
    try {
      const [owner, repo] = url.split("/").slice(-2);

      if (!owner || !repo) {
        throw new Error(ERROR_MESSAGE.GITHUB_INVALID_URL);
      }

      const response = await this.octokit.request(
        OCTOKIT_ENDPOINT.GET_REPOSITORY,
        {
          owner,
          repo,
        },
      );

      return response as OctokitRepositoryResponse;
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }

  async getRepositoryById(id: number) {
    try {
      const response = await this.octokit.request(
        OCTOKIT_ENDPOINT.GET_REPOSITORY_BY_ID,
        {
          id,
        },
      );

      return response as OctokitRepositoryResponse;
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }

  async getStaredRepositoriesByUser(username: string) {
    try {
      return await this.octokit.request(
        OCTOKIT_ENDPOINT.GET_STARRED_REPOSITORIES,
        {
          username,
          per_page: 100,
        },
      );
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }
}

const octokitService = new OctokitService(octokit);

export default octokitService;
