"use server";
import { revalidatePath } from "next/cache";
import { userAction } from "@/lib/next-safe-action";
import likeService from "@/services/like.service";
import * as z from "zod";

const likeRepositorySchema = z.object({
  repositoryId: z.number(),
});

export const likeOrUnlikeRepository = userAction(
  likeRepositorySchema,
  async (data, ctx) => {
    try {
      const hasLiked = await likeService.hasLikedRepository(
        ctx.userId!,
        data.repositoryId,
      );

      if (hasLiked) {
        await likeService.unlikeRepository(ctx.userId!, data.repositoryId);
      } else {
        await likeService.likeRepository(ctx.userId!, data.repositoryId);
      }
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath("/");
  },
);
