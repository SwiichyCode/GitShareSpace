"use server";
import { revalidatePath } from "next/cache";
import { userAction } from "@/config/lib/next-safe-action";
import likeService from "@/services/like.service";
import * as z from "zod";

const schema = z.object({
  repositoryId: z.number(),
});

export const likeOrUnlikeRepository = userAction(schema, async (data, ctx) => {
  try {
    const hasLiked = await likeService.hasLikedRepository({
      userId: ctx.session.user.id,
      repositoryId: data.repositoryId,
    });

    if (hasLiked) {
      await likeService.unlikeRepository({
        userId: ctx.session.user.id,
        repositoryId: data.repositoryId,
      });
    } else {
      await likeService.likeRepository({
        userId: ctx.session.user.id,
        repositoryId: data.repositoryId,
      });
    }
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath("/");
});
