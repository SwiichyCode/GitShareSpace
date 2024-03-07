// "use server";
// import { userAction } from "@/lib/next-safe-action";
// import { postRepositoryComment } from "@/services/repository.service";
// import * as z from "zod";

// const schema = z.object({
//   repositoryId: z.number(),
//   picture: z.string().optional().nullable(),
//   name: z.string().optional().nullable(),
//   username: z.string().optional().nullable(),
//   content: z.string().min(1, "Comment must be at least 1 character long"),
// });

// export const addComment = userAction(schema, async (data, ctx) => {
//   try {
//     await postRepositoryComment({
//       repositoryId: data.repositoryId,
//       content: data.content,
//     });
//   } catch (error) {
//     if (error instanceof Error) return { error: error.message };
//   }
// });
