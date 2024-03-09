"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { SubmitButton } from "@/components/ui/submit-button";
import { TextAreaForm } from "@/components/ui/text-area-form";
import { postRepositoryCommentAction } from "@/services/actions/post-repository-comment";
import { formAddCommentSchema } from "./add-comment-schema";
import type * as z from "zod";

type Props = {
  repositoryId: number;
};

export const AddCommentForm = ({ repositoryId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formAddCommentSchema>>({
    resolver: zodResolver(formAddCommentSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(data: z.infer<typeof formAddCommentSchema>) {
    startTransition(async () => {
      await postRepositoryCommentAction({
        repositoryId,
        content: data.content,
      });

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
