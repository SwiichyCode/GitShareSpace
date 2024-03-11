import repositoryService from "./repository.service";
import octokitService from "./github.service";

import { db } from "@/config/server/db";
import { extractUserIdFromAvatarUrl } from "@/services/utils/extract-user-id-from-avatar-url";
import type {
  AddPersonalAccessTokenType,
  AddStarredRepositoryType,
  GetUserType,
  ResetPersonalAccessTokenType,
  UpdateAgreementType,
} from "./types/user.type";

class UserService {
  /**
   * Query to get a user entry from the database.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getUser({ userId }: GetUserType) {
    return await db.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        likes: true,
      },
    });
  }

  /**
   * Query to add a starred repository to the user.
   * @param {string} userId - The user id.
   * @param {string} repositoryId - The repository id.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async addStarredRepository({
    userId,
    repositoryId,
  }: AddStarredRepositoryType) {
    await db.user.update({
      where: {
        id: userId,
      },

      data: {
        repositoryAlreadyStarred: {
          push: repositoryId,
        },
      },
    });
  }

  /**
   * Query to remove a starred repository from the user.
   * @param {string} userId - The user id.
   * @param {string} repositoryId - The repository id.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async removeStarredRepository({
    userId,
    repositoryId,
  }: AddStarredRepositoryType) {
    const repositoryAlreadyStarred = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        repositoryAlreadyStarred: true,
      },
    });

    if (!repositoryAlreadyStarred) {
      throw new Error("User not found");
    }

    const newRepositoryAlreadyStarred =
      repositoryAlreadyStarred.repositoryAlreadyStarred.filter(
        (id) => id !== repositoryId,
      );

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        repositoryAlreadyStarred: {
          set: newRepositoryAlreadyStarred,
        },
      },
    });
  }

  /**
   * Query to add a personal access token to the user.
   * @param {string} userId - The user id.
   * @param {string} personalAccessToken - The personal access token.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async addPersonalAccessToken({
    userId,
    personalAccessToken,
  }: AddPersonalAccessTokenType) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        personalAccessToken,
      },
    });
  }

  /**
   * Query to get the personal access token of the user.
   * @param {string} userId - The user id.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getPersonalAccessToken({ userId }: GetUserType) {
    const response = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        personalAccessToken: true,
      },
    });

    return response?.personalAccessToken;
  }

  /**
   * Query to reset the personal access token of the user.
   * @param {string} userId - The user id.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async resetPersonalAccessToken({ userId }: ResetPersonalAccessTokenType) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        personalAccessToken: null,
      },
    });
  }

  /**
   * Query to update the user data sharing agreement.
   * @param {User} user - The user object.
   * @param {boolean} agreement - The agreement status.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async updateAgreement({ user, agreement }: UpdateAgreementType) {
    const githubUser = await octokitService.getUser(
      extractUserIdFromAvatarUrl(user.image ?? ""),
    );

    if (!githubUser) {
      throw new Error("User not found");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const username = githubUser.data.login;

    await repositoryService.syncStarredRepositories(user);

    return await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        username,
        dataSharingAgreement: agreement,
        firstConnection: false,
      },
    });
  }
}

const userService = new UserService();

export default userService;
