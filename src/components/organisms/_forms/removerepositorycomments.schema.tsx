import * as z from "zod";

export const removeRepositoryCommentsSchema = z.object({
  repositoryId: z.coerce.number(),
});
