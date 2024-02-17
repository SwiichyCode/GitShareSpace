import { z } from "zod";

export const languageTypeSchema = z.enum([
  "html",
  "javascript",
  "typescript",
  "python",
  "java",
  "c",
  "c++",
  "c#",
]);

export type LanguageType = z.infer<typeof languageTypeSchema>;
