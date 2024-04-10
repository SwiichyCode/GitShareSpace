"use server";
import { revalidatePath } from "next/cache";
import { userAction } from "@/config/lib/next-safe-action";
import projectService from "../project.service";
import { URL } from "@/config/constants";
import * as z from "zod";

const schema = z.object({
  name: z.string(),
  description: z.string(),
});

export const addProjectAction = userAction(schema, async (data, ctx) => {
  try {
    await projectService.createProject({
      userId: ctx.session.user.id,
      name: data.name,
      description: data.description,
    });
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }

  revalidatePath(URL.PROJECTS);
});
