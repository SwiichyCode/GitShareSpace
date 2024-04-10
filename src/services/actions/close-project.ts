"use server";
import { revalidatePath } from "next/cache";
import { userAction } from "@/config/lib/next-safe-action";
import projectService from "../project.service";
import { URL } from "@/config/constants";
import * as z from "zod";

const schema = z.object({
  projectId: z.string(),
});

export const closeProjectAction = userAction(schema, async (data, ctx) => {
  try {
    await projectService.closeProject({
      projectId: data.projectId,
    });
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }

  revalidatePath(URL.PROJECTS);
});
