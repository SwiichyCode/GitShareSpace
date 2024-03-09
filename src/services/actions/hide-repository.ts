"use server";
import { adminAction } from "@/config/lib/next-safe-action";
import repositoryService from "@/services/repository.service";
import * as z from "zod";

const schema = z.object({
  repositoryId: z.coerce.number(),
});

export const hideRepositoryAction = adminAction(schema, async (data) => {
  await repositoryService.hideRepository(data);
});
