"use client";
import { useTransition } from "react";
import { useSidebar } from "@/components/layouts/Sidebar/useSidebar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { refreshUserAgreementSchema } from "./refresh-user-agreement-schema";
import { Form } from "@/components/ui/form";
import { SubmitButton } from "@/components/ui/submit-button";
import { InputForm } from "@/components/ui/input-form";
import { refreshUserAgreementAction } from "@/services/actions/refresh-user-agreement";
import type * as z from "zod";

export const RefreshUserAgreementForm = () => {
  const { setOpen } = useSidebar();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof refreshUserAgreementSchema>>({
    resolver: zodResolver(refreshUserAgreementSchema),
    defaultValues: {
      userId: "",
    },
  });

  function onSubmit(data: z.infer<typeof refreshUserAgreementSchema>) {
    startTransition(async () => {
      await refreshUserAgreementAction(data);
    });

    form.reset();
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputForm
          control={form.control}
          name="userId"
          label="User ID"
          placeholder="42"
        />

        <SubmitButton isPending={isPending}>Submit</SubmitButton>
      </form>
    </Form>
  );
};
