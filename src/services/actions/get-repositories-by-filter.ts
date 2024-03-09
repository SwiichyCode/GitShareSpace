"use server";
import { action } from "@/config/lib/next-safe-action";
import repositoryService from "@/services/repository.service";
import * as z from "zod";

const schema = z.object({
  queryParams: z.string().optional(),
  languageParams: z.string().optional(),
  params: z.string().optional(),
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  cursor: z.coerce.number().optional(),
});

export const getRepositoriesByFilterAction = action(schema, async (data) => {
  return await repositoryService.getRepositoriesByFilter(data);
});
