import { db } from "@/server/db";
import octokitService from "./octokit.service";
import { syncStarredRepositories } from "./repository.service";
import { extractUserIdFromAvatarUrl } from "@/lib/utils";
import type { User } from "next-auth";

class UserService {
  async getUser(userId: string) {
    return await db.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        likes: true,
      },
    });
  }

  async updateAgreement(user: User, agreement: boolean) {
    const githubUser = await octokitService.getUser(
      extractUserIdFromAvatarUrl(user.image ?? ""),
    );

    if (!githubUser) {
      throw new Error("User not found");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const username = githubUser.data.login;

    await syncStarredRepositories(user);

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
