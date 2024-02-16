import type { Octokit } from "octokit";
import { octokit } from "@/lib/octokit";

class OctokitService {
  private octokit: Octokit;

  constructor(octokit: Octokit) {
    this.octokit = octokit;
  }

  async getRepo(owner: string, repo: string) {
    return await this.octokit.request("GET /repos/{owner}/{repo}", {
      owner,
      repo,
    });
  }

  async getUserRepos(username: string) {
    return await this.octokit.request("GET /users/{username}/repos", {
      username,
    });
  }
}

const octokitService = new OctokitService(octokit);

export default octokitService;
