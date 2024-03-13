"use server";
import { URL } from "@/config/constants";
import userService from "@/services/user.service";
import repositoryService from "@/services/repository.service";

import { userAction } from "@/config/lib/next-safe-action";
import { OctokitService } from "@/services/github.service";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const schema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
  repositoryId: z.coerce.number(),
});

export const starRepositoryAction = userAction(
  schema,
  async ({ owner, repositoryName, repositoryId }, ctx) => {
    const userAccessToken = await userService.getPersonalAccessToken({
      userId: ctx.session.user.id,
    });

    if (!userAccessToken) {
      throw new Error("User has no personal access token");
    }

    const octokitService = new OctokitService(userAccessToken);

    const hasStarred = await repositoryService.hasStarredRepository({
      userId: ctx.session.user.id,
      repositoryId,
    });

    if (hasStarred) {
      await octokitService.unstarRepository({ owner, repo: repositoryName });
      await userService.removeStarredRepository({
        userId: ctx.session.user.id,
        repositoryId: repositoryId,
      });
      await repositoryService.decrementStargazersCount({ repositoryId });
    } else {
      await octokitService.starRepository({ owner, repo: repositoryName });
      await userService.addStarredRepository({
        userId: ctx.session.user.id,
        repositoryId: repositoryId,
      });
      await repositoryService.incrementStargazersCount({ repositoryId });
    }

    revalidatePath(URL.REPOSITORIES);
  },
);
