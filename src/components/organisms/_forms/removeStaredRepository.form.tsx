"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSidebar } from "@/stores/useSidebar";
import { Form } from "@/components/atoms/form";
import { removeStaredRepositorySchema } from "./removeStaredRepository.schema";
import { InputForm } from "@/components/molecules/InputForm";
import { SubmitButton } from "@/components/molecules/SubmitButton";
import { removeStaredRepositories } from "@/actions/removeStaredRepositories.action";
import type * as z from "zod";

export const RemoveStaredRepositoryForm = () => {
  const { setOpen } = useSidebar();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof removeStaredRepositorySchema>>({
    resolver: zodResolver(removeStaredRepositorySchema),
    defaultValues: {
      userId: "",
    },
  });

  function onSubmit(data: z.infer<typeof removeStaredRepositorySchema>) {
    startTransition(async () => {
      await removeStaredRepositories(data);

      form.reset();
      setOpen(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="text-xl font-bold">Remove starred repositories</h2>
        <InputForm
          control={form.control}
          name="userId"
          label="User ID"
          placeholder="clsqk2mm60000cu1s9gyccgrz"
        />
        <SubmitButton isPending={isPending}>Remove</SubmitButton>
      </form>
    </Form>
  );
};
