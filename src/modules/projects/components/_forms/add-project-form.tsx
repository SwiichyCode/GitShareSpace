"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { addProjectAction } from "@/services/actions/add-project";
import { addProjectSchema } from "./add-project-schema";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/ui/input-form";
import { TextAreaForm } from "@/components/ui/text-area-form";
import { SubmitButton } from "@/components/ui/submit-button";
import type * as z from "zod";

export const AddProjectForm = ({}) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof addProjectSchema>>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof addProjectSchema>) {
    startTransition(async () => {
      const response = await addProjectAction(data);

      if (!response.data?.error) {
        form.reset({
          name: "",
          description: "",
        });

        toast({
          title: "Project created",
          description: "Your project has been created.",
        });
      }

      if (response.data?.error) {
        toast({
          title: "Error",
          description: response.serverError,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputForm
          label="Project name"
          name="name"
          placeholder="Gitsharespace"
          control={form.control}
        />

        <TextAreaForm
          label="Description"
          name="description"
          control={form.control}
        />
        <SubmitButton isPending={isPending}>Create project</SubmitButton>
      </form>
    </Form>
  );
};
