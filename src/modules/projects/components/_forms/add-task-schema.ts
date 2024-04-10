import * as z from "zod";

export const addTaskFormSchema = z.object({
  name: z.string(),
  description: z.string(),
});
