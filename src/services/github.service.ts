import { createOctokitWithUserToken, octokit } from "@/config/lib/octokit";
import { OCTOKIT_ENDPOINT, ERROR_MESSAGE } from "@/config/constants";
import type { Octokit } from "octokit";
import type { StarRepositoryType } from "@/services/types/github.type";
import type {
  OctokitRepositoryResponse,
  OctokitSocialAccountsResponse,
  OctokitUserResponse,
} from "@/config/lib/octokit";

export class OctokitService {
  private octokit: Octokit;

  constructor(userAccessToken?: string) {
    this.octokit = userAccessToken
      ? createOctokitWithUserToken(userAccessToken)
      : octokit;
  }

  /**
   * Query to get the user.
   * @param {number} userId - The id of the user.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getUser(username: string) {
    try {
      const response = await this.octokit.request(OCTOKIT_ENDPOINT.GET_USER, {
        username,
      });

      return response as OctokitUserResponse;
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }

  async getUserById(userId: string | undefined) {
    try {
      const response = await this.octokit.request(
        OCTOKIT_ENDPOINT.GET_USER_BY_ID,
        {
          userId,
        },
      );

      return response as OctokitUserResponse;
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
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

  /**
   * Query to get the social accounts of a user.
   * @param {string} username - The username of the user.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getUserSocialAccounts(username: string) {
    try {
      const response = await this.octokit.request(
        OCTOKIT_ENDPOINT.GET_USER_SOCIAL_ACCOUNTS,
        {
          username,
        },
      );

      return response as OctokitSocialAccountsResponse;
    } catch (error) {
      if (error instanceof Error) return console.log(error.message);
    }
  }

  /**
   * Query to get a repository by its url.
   * @param {string} url - The url of the repository.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

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

  /**
   * Query to get a repository by its id.
   * @param {number} id - The id of the repository.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

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

  /**
   * Query to get the repositories starred by a user.
   * @param {string} username - The username of the user.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

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
