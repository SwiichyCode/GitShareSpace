import { db } from "@/server/db";

class UserService {
  async updateRepositoryAlreadyStarred(
    userId: string,
    repositoryUrl: string[],
  ) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        repositoryAlreadyStarred: {
          set: repositoryUrl,
        },
      },
    });
  }
}

const userService = new UserService();

export default userService;
