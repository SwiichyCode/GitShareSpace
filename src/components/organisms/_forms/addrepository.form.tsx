"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/atoms/form";
import { formRepositorySchema } from "./addrepository.schema";
import { useToast } from "@/components/atoms/use-toast";
import { InputForm } from "@/components/molecules/InputForm";
import { SubmitButton } from "@/components/molecules/SubmitButton";
import { addRepository } from "@/actions/addrepository.action";
import type { z } from "zod";

export const AddRepositoryForm = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formRepositorySchema>>({
    resolver: zodResolver(formRepositorySchema),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit(data: z.infer<typeof formRepositorySchema>) {
    startTransition(async () => {
      const response = await addRepository(data);

      if (!response.data?.error) {
        toast({
          title: "Repository added",
          description: "The repository has been added successfully",
        });
      }

      if (response.data?.error) {
        toast({
          title: "Error",
          description: response.data.error,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputForm control={form.control} name="url" label="Repository URL" />
        <SubmitButton isPending={isPending}>Add Repository</SubmitButton>
      </form>
    </Form>
  );
};
