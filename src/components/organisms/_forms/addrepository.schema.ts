import * as z from "zod";

export const formRepositorySchema = z.object({
  url: z.string().url(),
  description: z.string(),
});
