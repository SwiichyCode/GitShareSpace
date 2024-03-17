"use server";

import { userAction } from "@/config/lib/next-safe-action";
import repositoryService from "@/services/repository.service";
import { revalidatePath } from "next/cache";
import { generateSharedScore } from "@/services/utils/generate-shared-score";
import { SHARE_ACTION, URL } from "@/config/constants";
import * as z from "zod";

const schema = z.object({
  repositoryId: z.coerce.number(),
  content: z.string(),
});

export const postRepositoryCommentAction = userAction(
  schema,
  async (data, ctx) => {
    await repositoryService.postRepositoryComment({
      repositoryId: data.repositoryId,
      content: data.content,
      createdBy: ctx.session?.user?.id,

      score: generateSharedScore(SHARE_ACTION.COMMENT),
    });

    revalidatePath(`${URL.REPOSITORIES}/${data.repositoryId}`);
  },
);
