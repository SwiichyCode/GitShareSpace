"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSidebar } from "@/components/layouts/Sidebar/useSidebar";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/ui/input-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { updateUserRoleAction } from "@/services/actions/update-user-role";
import { updateUserRoleSchema } from "./update-user-role-schema";
import type * as z from "zod";

export const UpdateUserRoleForm = () => {
  const { setOpen } = useSidebar();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof updateUserRoleSchema>>({
    resolver: zodResolver(updateUserRoleSchema),
    defaultValues: {
      userId: "",
    },
  });

  function onSubmit(data: z.infer<typeof updateUserRoleSchema>) {
    startTransition(async () => {
      await updateUserRoleAction(data);

      form.reset();
      setOpen(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="text-xl font-bold">Update user role</h2>
        <InputForm
          control={form.control}
          name="userId"
          label="User ID"
          placeholder="clsqk2mm60000cu1s9gyccgrz"
        />
        <SubmitButton isPending={isPending}>Update</SubmitButton>
      </form>
    </Form>
  );
};
