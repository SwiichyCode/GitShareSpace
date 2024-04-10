import { createOctokitWithUserToken, octokit } from "@/config/lib/octokit";
import { OCTOKIT_ENDPOINT, ERROR_MESSAGE } from "@/config/constants";
import type { Octokit } from "octokit";
import type { StarRepositoryType } from "@/services/types/github.type";
import type { ExtendedEndpoints } from "@/services/types/octokit.type";
import type { Endpoints } from "@octokit/types";

export class OctokitService {
  private octokit: Octokit;

  constructor(userAccessToken?: string) {
    this.octokit = userAccessToken
      ? createOctokitWithUserToken(userAccessToken)
      : octokit;
  }

  /**
   * Query to get the user by username.
   * @param {number} username - The id of the user.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getUserByUsername(username: string) {
    const response: Endpoints[typeof OCTOKIT_ENDPOINT.GET_USER_BY_USERNAME]["response"] =
      await this.octokit.request(OCTOKIT_ENDPOINT.GET_USER_BY_USERNAME, {
        username,
      });

    return response;
  }

  /**
   * Query to get the user by its id.
   * @param {string} userId - The id of the user.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getUserById(userId: string | undefined) {
    const response: ExtendedEndpoints[typeof OCTOKIT_ENDPOINT.GET_USER_BY_ID]["response"] =
      await this.octokit.request(OCTOKIT_ENDPOINT.GET_USER_BY_ID, {
        userId,
      });

    return response;
  }

  /**
   * Query to get the user by its authentication.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getUserByAuth() {
    const response: Endpoints[typeof OCTOKIT_ENDPOINT.GET_USER_BY_AUTH]["response"] =
      await this.octokit.request(OCTOKIT_ENDPOINT.GET_USER_BY_AUTH);

    return response;
  }

  /**
   * Query to get the repositories of a user.
   * @param {string} username - The username of the user.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getUserRepository(username: string) {
    try {
      return await this.octokit.request("GET /users/{username}/repos", {
        username,
      });
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }

  async getUserRepositories() {
    return await this.octokit.request("GET /user/repos", {
      sort: "updated",
      page: 1,
      per_page: 10,
    });
  }

  /**
   * Query to get the social accounts of a user.
   * @param {string} username - The username of the user.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getUserSocialAccounts(username: string) {
    const response: Endpoints[typeof OCTOKIT_ENDPOINT.GET_USER_SOCIAL_ACCOUNTS]["response"] =
      await this.octokit.request(OCTOKIT_ENDPOINT.GET_USER_SOCIAL_ACCOUNTS, {
        username,
      });

    return response;
  }

  /**
   * Query to get a repository by its url.
   * @param {string} url - The url of the repository.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getRepository(url: string) {
    const [owner, repo] = url.split("/").slice(-2);

    if (!owner || !repo) {
      throw new Error(ERROR_MESSAGE.GITHUB_INVALID_URL);
    }

    const response: Endpoints[typeof OCTOKIT_ENDPOINT.GET_REPOSITORY]["response"] =
      await this.octokit.request(OCTOKIT_ENDPOINT.GET_REPOSITORY, {
        owner,
        repo,
      });

    return response;
  }

  /**
   * Query to get the repositories starred by a user.
   * @param {string} username - The username of the user.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getStaredRepositoriesByUser(username: string) {
    const response: Endpoints[typeof OCTOKIT_ENDPOINT.GET_STARRED_REPOSITORIES]["response"] =
      await this.octokit.request(OCTOKIT_ENDPOINT.GET_STARRED_REPOSITORIES, {
        username,
        per_page: 100,
      });

    return response;
  }

  /**
   * Query to star a repository.
   * @param {string} owner - The owner of the repository.
   * @param {string} repo - The name of the repository.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async starRepository({ owner, repo }: StarRepositoryType) {
    try {
      return await this.octokit.request(OCTOKIT_ENDPOINT.PUT_STAR_REPOSITORY, {
        owner,
        repo,
      });
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }

  /**
   * Query to unstar a repository.
   * @param {string} owner - The owner of the repository.
   * @param {string} repo - The name of the repository.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async unstarRepository({ owner, repo }: StarRepositoryType) {
    try {
      return await this.octokit.request(
        OCTOKIT_ENDPOINT.DELETE_STAR_REPOSITORY,
        {
          owner,
          repo,
        },
      );
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }
}

const octokitService = new OctokitService();

export default octokitService;
