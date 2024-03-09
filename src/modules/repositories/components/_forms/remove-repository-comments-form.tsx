"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSidebar } from "@/components/layouts/Sidebar/useSidebar";
import { Form } from "@/components/ui/form";
import { removeRepositoryCommentsSchema } from "./remove-repository-comments-schema";
import { InputForm } from "@/components/ui/input-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { removeRepositoryCommentsAction } from "@/services/actions/remove-repository-comments";
import type * as z from "zod";

export const RemoveRepositoryCommentsForm = () => {
  const { setOpen } = useSidebar();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof removeRepositoryCommentsSchema>>({
    resolver: zodResolver(removeRepositoryCommentsSchema),
    defaultValues: {
      repositoryId: 0,
    },
  });

  function onSubmit(data: z.infer<typeof removeRepositoryCommentsSchema>) {
    startTransition(async () => {
      await removeRepositoryCommentsAction(data);

      form.reset();
      setOpen(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="text-xl font-bold">Remove repository comments</h2>
        <InputForm
          control={form.control}
          name="repositoryId"
          label="Repository ID"
          placeholder="42"
          type="number"
        />
        <SubmitButton isPending={isPending}>Remove</SubmitButton>
      </form>
    </Form>
  );
};
