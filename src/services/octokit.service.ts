import type { Octokit } from "octokit";
import { octokit } from "@/lib/octokit";

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

  async getStaredRepositoriesByUser(username: string) {
    try {
      return await this.octokit.request("GET /users/{username}/starred", {
        username,
      });
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }
}

const octokitService = new OctokitService(octokit);

export default octokitService;
