import * as z from "zod";

export const formRepositorySchema = z.object({
  url: z.string().url(),
});

export const actionRepositorySchema = z.object({
  url: z.string().url(),
  createdBy: z.number(),
});
