import * as z from "zod";

export const formAddResourceSchema = z.object({
  url: z.string().url(),
  description: z.string(),
  type: z.enum(["article", "video", "book", "course"]),
});
