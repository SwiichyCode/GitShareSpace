import { db } from "@/config/server/db";
import type { LikeEntry, LikeRepositoryType } from "@/services/types/like.type";

class LikeService {
  /**
   * Query to get all like entries from the database.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getLikes() {
    return await db.like.findMany();
  }

  /**
   * Query to like a repository and increment the shared score of the user who shared the repository.
   * @param {LikeRepositoryType} - The user id, repository id, repository shared by, and score.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async likeRepository({
    userId,
    repositoryId,
    repositorySharedBy,
    score,
  }: LikeRepositoryType) {
    await db.$transaction([
      db.like.create({
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
      }),

      db.user.update({
        where: {
          id: repositorySharedBy,
        },
        data: {
          sharedScore: {
            increment: score,
          },
        },
      }),
    ]);
  }

  /**
   * Query to unlike a repository and decrement the shared score of the user who shared the repository.
   * @param {LikeRepositoryType} - The user id, repository id, repository shared by, and score.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async unlikeRepository({
    userId,
    repositoryId,
    repositorySharedBy,
    score,
  }: LikeRepositoryType) {
    await db.$transaction([
      db.like.deleteMany({
        where: {
          userId: userId,
          repositoryId: repositoryId,
        },
      }),

      db.user.update({
        where: {
          id: repositorySharedBy,
        },
        data: {
          sharedScore: {
            decrement: score,
          },
        },
      }),
    ]);
  }

  /**
   * Query to check if the user has liked the repository.
   * @param {LikeEntry} - The user id and repository id.
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
