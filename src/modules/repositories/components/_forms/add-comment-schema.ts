import * as z from "zod";

export const formAddCommentSchema = z.object({
  content: z.string().min(1, "Comment must be at least 1 character long"),
});
