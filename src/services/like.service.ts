import { db } from "@/server/db";

class LikeService {
  async getLikes() {
    return await db.like.findMany();
  }

  async likeRepository(userId: string, repositoryId: number) {
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

  async unlikeRepository(userId: string, repositoryId: number) {
    await db.like.deleteMany({
      where: {
        userId: userId,
        repositoryId: repositoryId,
      },
    });
  }

  async hasLikedRepository(userId: string, repositoryId: number) {
    const like = await db.like.findFirst({
      where: {
        userId: userId,
        repositoryId: repositoryId,
      },
    });

    return like;
  }
}

const likeService = new LikeService();

export default likeService;
