import repositoryService from "./repository.service";
import octokitService from "./github.service";

import { db } from "@/config/server/db";
import { extractUserIdFromAvatarUrl } from "@/services/utils/extract-user-id-from-avatar-url";
import type { GetUserType, UpdateAgreementType } from "./types/user.type";

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
