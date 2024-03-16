"use server";

import { userAction } from "@/config/lib/next-safe-action";
import * as z from "zod";
import resourceService from "../resource.service";
import { revalidatePath } from "next/cache";
import { URL } from "@/config/constants";

const schema = z.object({
  url: z.string(),
  description: z.string().optional(),
  type: z.enum(["article", "video", "book", "course"]),
});

export const postResourceAction = userAction(schema, async (data, ctx) => {
  try {
    await resourceService.postResource({
      url: data.url,
      description: data.description,
      type: data.type,
      userId: ctx.session.user.id,
    });
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath(URL.RESOURCES);
});
