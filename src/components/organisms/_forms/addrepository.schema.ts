import * as z from "zod";

export const formRepositorySchema = z.object({
  url: z.string().url(),
  description: z.string(),
});

export const actionRepositorySchema = z.object({
  url: z.string().url(),
  description: z.string(),
  createdBy: z.number(),
});
