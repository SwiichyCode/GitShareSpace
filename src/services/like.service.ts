import { db } from "@/config/server/db";
import type { LikeEntry } from "@/services/types/like.type";

class LikeService {
  /**
   * Query to get all like entries from the database.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getLikes() {
    return await db.like.findMany();
  }

  /**
   * Query to like a repository.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async likeRepository({ userId, repositoryId }: LikeEntry) {
    await db.like.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        repository: {
          connect: {
            id: repositoryId,
          },
        },
      },
    });
  }

  /**
   * Query to unlike a repository.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async unlikeRepository({ userId, repositoryId }: LikeEntry) {
    await db.like.deleteMany({
      where: {
        userId: userId,
        repositoryId: repositoryId,
      },
    });
  }

  /**
   * Query to check if the user has liked the repository.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async hasLikedRepository({ userId, repositoryId }: LikeEntry) {
    return await db.like.findFirst({
      where: {
        userId: userId,
        repositoryId: repositoryId,
      },
    });
  }
}

const likeService = new LikeService();

export default likeService;
