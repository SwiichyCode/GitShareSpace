"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSidebar } from "@/stores/useSidebar";
import { Form } from "@/components/atoms/form";
import { removeRepositoryCommentsSchema } from "./removerepositorycomments.schema";
import { InputForm } from "@/components/molecules/InputForm";
import { SubmitButton } from "@/components/molecules/SubmitButton";
import { removeRepositoryComments } from "@/actions/admin/removerepositorycomments.action";
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
      await removeRepositoryComments(data);

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
