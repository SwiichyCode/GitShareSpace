"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSidebar } from "@/stores/useSidebar";
import { Form } from "@/components/atoms/form";
import { InputForm } from "@/components/molecules/InputForm";
import { SubmitButton } from "@/components/molecules/SubmitButton";
import { updateUserRole } from "@/actions/admin/updateuserrole.action";
import { updateUserRoleSchema } from "./updateuserrole.schema";
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
      await updateUserRole(data);

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
