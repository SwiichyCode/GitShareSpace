"use server";
import { revalidatePath } from "next/cache";
import { userAction } from "@/config/lib/next-safe-action";
import likeService from "@/services/like.service";
import { SHARE_ACTION, URL } from "@/config/constants";
import { generateSharedScore } from "@/services/utils/generate-shared-score";
import * as z from "zod";

const schema = z.object({
  repositoryId: z.number(),
  repositorySharedBy: z.string(),
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
        repositorySharedBy: data.repositorySharedBy,
        score: generateSharedScore(SHARE_ACTION.POINT),
      });
    } else {
      await likeService.likeRepository({
        userId: ctx.session.user.id,
        repositoryId: data.repositoryId,
        repositorySharedBy: data.repositorySharedBy,
        score: generateSharedScore(SHARE_ACTION.POINT),
      });
    }
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath(URL.REPOSITORIES);
});
