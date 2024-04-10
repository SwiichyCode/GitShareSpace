"use server";
import { revalidatePath } from "next/cache";
import { userAction } from "@/config/lib/next-safe-action";
import projectService from "@/services/project.service";
import { URL } from "@/config/constants";
import * as z from "zod";

const schema = z.object({
  columnId: z.string(),
  projectId: z.string(),
});

export const removeColumnAction = userAction(
  schema,
  async ({ columnId, projectId }) => {
    try {
      await projectService.deleteColumn({ columnId });
    } catch (error) {}

    revalidatePath(`${URL.PROJECTS}/${projectId}`);
  },
);
