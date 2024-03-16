"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFetchInfiniteRepositories } from "@/modules/repositories/hooks/use-fetch-infinite-repositories";
import { useQueryParamsContext } from "@/modules/repositories/context/queryParamsContext";
import { useShareRepositoryModal } from "@/modules/repositories/stores/useShareRepositoryModal";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { formRepositorySchema } from "./add-repository-schema";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InputForm } from "@/components/ui/input-form";
import { RichTextFieldForm } from "@/components/ui/rich-textfield-form";
import { SubmitButton } from "@/components/ui/submit-button";

import { postRepositoryAction } from "@/services/actions/post-repository";
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
      const response = await postRepositoryAction(data);

      if (!response.data?.error) {
        toast({
          title: "Repository added",
          description: "The repository has been added successfully",
        });

        setOpen(false);
        form.reset();
        await refetch();
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
