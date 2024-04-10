"use server";
import { revalidatePath } from "next/cache";
import { userAction } from "@/config/lib/next-safe-action";
import projectService from "../project.service";
import { URL } from "@/config/constants";
import * as z from "zod";

const schema = z.object({
  name: z.string(),
  description: z.string(),
  columnId: z.string(),
  projectId: z.string(),
});

export const addTaskAction = userAction(
  schema,
  async ({ name, description, projectId, columnId }, ctx) => {
    try {
      await projectService.createTask({
        name,
        description,
        columnId,
        createdById: ctx.session.user.id,
      });
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
    }

    revalidatePath(`${URL.PROJECTS}/${projectId}`);
  },
);
