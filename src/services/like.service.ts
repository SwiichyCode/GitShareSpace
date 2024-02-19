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
}

const likeService = new LikeService();

export default likeService;
