"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/atoms/form";
import { formRepositorySchema } from "./addrepository.schema";
import { useToast } from "@/components/atoms/use-toast";
import { useQueryParamsContext } from "@/context/queryParamsContext";
import { useShareRepositoryModal } from "@/stores/useShareRepositoryModal";
import { Dialog, DialogContent } from "@/components/atoms/dialog";
import { InputForm } from "@/components/molecules/InputForm";
import { RichTextFieldForm } from "@/components/molecules/RichTextFieldForm";
import { SubmitButton } from "@/components/molecules/SubmitButton";
import { addRepository } from "@/actions/addrepository.action";
import { useFetchInfiniteRepositories } from "@/hooks/useFetchInfiniteRepositories";
import type * as z from "zod";

export const AddRepositoryForm = () => {
  const { queryParams, languageParams, params } = useQueryParamsContext();
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

  const { refetch } = useFetchInfiniteRepositories({
    queryParams,
    languageParams,
    params,
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
      await refetch();
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

            <RichTextFieldForm
              control={form.control}
              name="description"
              label="Description"
              description="Provide a detailed description of the project."
            />
            <SubmitButton isPending={isPending}>Share</SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
