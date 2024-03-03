"use server";
import { userAction } from "@/lib/next-safe-action";
import repositoryService from "@/services/repository.service";
import { pusherServer } from "@/lib/pusherServer";
import * as z from "zod";

const schema = z.object({
  repositoryId: z.number(),
  picture: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  content: z.string().min(1, "Comment must be at least 1 character long"),
});

export const addComment = userAction(schema, async (data, ctx) => {
  try {
    await pusherServer.trigger(`repo-${data.repositoryId}`, "new-comment", {
      content: data.content,
      picture: data.picture,
      name: data.name,
      username: data.username,
      userId: ctx.session.user.id,
    });

    await repositoryService.addCommentToRepository(
      data.repositoryId,
      data.content,
      ctx.session.user.id,
    );
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }
});
