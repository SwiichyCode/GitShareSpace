"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formExampleSchema } from "./formSchemaExample";
import { Form } from "@/components/ui/form";

import { SubmitButton } from "@/components/ui/submit-button";
import type * as z from "zod";

export const ExampleForm = ({}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formExampleSchema>>({
    resolver: zodResolver(formExampleSchema),
  });

  function onSubmit(data: z.infer<typeof formExampleSchema>) {
    startTransition(async () => {
      console.log(data);
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SubmitButton isPending={isPending}>Submit</SubmitButton>
      </form>
    </Form>
  );
};
