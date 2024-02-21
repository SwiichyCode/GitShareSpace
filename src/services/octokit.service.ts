import { octokit } from "@/lib/octokit";
import type { Octokit } from "octokit";
import type { OctokitRepositoryResponse } from "@/lib/octokit";

class OctokitService {
  private octokit: Octokit;

  constructor(octokit: Octokit) {
    this.octokit = octokit;
  }

  async getUser(userId: string | undefined) {
    try {
      return await this.octokit.request("GET /user/{userId}", {
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
        throw new Error("Invalid repository URL");
      }

      return await this.octokit.request("GET /repos/{owner}/{repo}", {
        owner,
        repo,
      });
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }

  async getRepositoryById(id: number) {
    try {
      const response = await this.octokit.request("GET /repositories/{id}", {
        id,
      });

      return response as OctokitRepositoryResponse;
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }

  async getStaredRepositoriesByUser(username: string) {
    try {
      return await this.octokit.request("GET /users/{username}/starred", {
        username,
        per_page: 100,
      });
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }
}

const octokitService = new OctokitService(octokit);

export default octokitService;
