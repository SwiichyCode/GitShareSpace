"use client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useColumnContext } from "@/modules/projects/context/columnContext";
import { useProjectsContext } from "../../context/projectContext";
import { addTaskAction } from "@/services/actions/add-task";
import { addTaskFormSchema } from "./add-task-schema";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/ui/input-form";
import { TextAreaForm } from "@/components/ui/text-area-form";
import { SubmitButton } from "@/components/ui/submit-button";
import type * as z from "zod";

export const AddTaskForm = () => {
  const { project } = useProjectsContext();
  const { column } = useColumnContext();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof addTaskFormSchema>>({
    resolver: zodResolver(addTaskFormSchema),
  });

  function onSubmit(data: z.infer<typeof addTaskFormSchema>) {
    startTransition(async () => {
      await addTaskAction({
        name: data.name,
        description: data.description,
        columnId: column.id,
        projectId: project.id,
      });
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputForm control={form.control} name="name" label="Task name" />
        <TextAreaForm
          control={form.control}
          name="description"
          label="Task description"
        />
        <SubmitButton isPending={isPending}>Create task</SubmitButton>
      </form>
    </Form>
  );
};
