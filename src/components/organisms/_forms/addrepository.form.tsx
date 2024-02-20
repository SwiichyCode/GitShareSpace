"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/atoms/form";
import { formRepositorySchema } from "./addrepository.schema";
import { useToast } from "@/components/atoms/use-toast";
import { useShareRepositoryModal } from "@/stores/useShareRepositoryModal";
import { Dialog, DialogContent } from "@/components/atoms/dialog";
import { InputForm } from "@/components/molecules/InputForm";
import { TextAreaForm } from "@/components/molecules/TextAreaForm";
import { SubmitButton } from "@/components/molecules/SubmitButton";
import { addRepository } from "@/actions/addrepository.action";
import type { z } from "zod";

export const AddRepositoryForm = () => {
  const [isPending, startTransition] = useTransition();
  const { open, setOpen } = useShareRepositoryModal();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formRepositorySchema>>({
    resolver: zodResolver(formRepositorySchema),
    defaultValues: {
      url: "",
      description: "",
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

        setOpen(false);
      }

      if (response.data?.error) {
        toast({
          title: "Error",
          description: response.data.error,
        });
      }

      form.reset();
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <InputForm
              control={form.control}
              name="url"
              label="Repository URL"
              placeholder="https://github.com/username/repository"
              description="You cannot add a private repository."
            />
            <TextAreaForm
              control={form.control}
              name="description"
              label="Description"
              placeholder="eg. A simple e-commerce template built with Next.js and TailwindCSS."
            />
            <SubmitButton isPending={isPending}>Submit</SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
