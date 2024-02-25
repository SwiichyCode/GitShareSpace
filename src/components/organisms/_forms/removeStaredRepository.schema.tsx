import * as z from "zod";

export const removeStaredRepositorySchema = z.object({
  userId: z.string(),
});
