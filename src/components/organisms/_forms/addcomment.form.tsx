"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/atoms/form";
import { SubmitButton } from "@/components/molecules/SubmitButton";
import { TextAreaForm } from "@/components/molecules/TextAreaForm";
import { addComment } from "@/actions/addcomment.action";
import { formAddCommentSchema } from "./addcomment.schema";
import type { User } from "@/types/prisma.type";
import type * as z from "zod";

type Props = {
  user: User | null;
  repositoryId: number;
};

export const AddCommentForm = ({ user, repositoryId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formAddCommentSchema>>({
    resolver: zodResolver(formAddCommentSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(data: z.infer<typeof formAddCommentSchema>) {
    startTransition(async () => {
      const payload = {
        // repositoryId,
        // picture: user?.image,
        // name: user?.name,
        // username: user?.username,
        // content: data.content,
        repositoryId,
        content: data.content,
        createdBy: {
          image: user?.image,
          name: user?.name,
          username: user?.username,
        },
        createdAt: new Date(),
      };

      await addComment(payload);

      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextAreaForm
          control={form.control}
          name="content"
          placeholder="Leave a comment..."
        />
        <SubmitButton isPending={isPending}>Comment</SubmitButton>
      </form>
    </Form>
  );
};
