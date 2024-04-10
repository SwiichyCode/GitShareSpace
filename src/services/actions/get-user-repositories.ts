"use server";
import { githubAction } from "@/config/lib/next-safe-action";
import { OctokitService } from "@/services/github.service";
import * as z from "zod";

export const getUserRepositoriesAction = githubAction(
  z.void(),
  async (_, ctx) => {
    const userAccessToken = ctx.userAccessToken;
    const octokitService = new OctokitService(userAccessToken);
    const response = await octokitService.getUserRepositories();

    return response.data;
  },
);
