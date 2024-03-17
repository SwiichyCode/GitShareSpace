"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useShareResourceModal } from "@/modules/resources/stores/useShareResourcesModal";
import { useQueryParamsContext } from "@/modules/repositories/context/queryParamsContext";
import { useFetchResourceRepositories } from "@/modules/resources/hooks/use-fetch-infinite-resource";
import { formAddResourceSchema } from "./add-resource-schema";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InputForm } from "@/components/ui/input-form";
import { SelectForm } from "@/components/ui/select-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { TextAreaForm } from "@/components/ui/text-area-form";
import { postResourceAction } from "@/services/actions/post-resource";
import { RESOURCE_TYPE } from "@/config/constants";
import type * as z from "zod";

export const AddResourceForm = () => {
  const { queryParams, typeParams, params } = useQueryParamsContext();
  const [isPending, startTransition] = useTransition();
  const { open, setOpen } = useShareResourceModal();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formAddResourceSchema>>({
    resolver: zodResolver(formAddResourceSchema),
    defaultValues: {
      type: "article",
    },
  });

  const { refetch } = useFetchResourceRepositories({
    queryParams,
    typeParams,
    params,
  });

  function onSubmit(data: z.infer<typeof formAddResourceSchema>) {
    startTransition(async () => {
      const response = await postResourceAction(data);

      if (!response.data?.error) {
        toast({
          title: "Resource shared",
          description: "The resource has been shared successfully",
        });

        form.reset();
        setOpen(false);
        await refetch();
      }

      if (response.data?.error) {
        form.reset({
          url: "",
        });

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputForm
              control={form.control}
              name="url"
              label="Resource URL *"
              placeholder="https://medium.com/gitsharespace"
            />
            <TextAreaForm
              control={form.control}
              name="description"
              label="Description"
              placeholder="Provide a detailed description of the resource."
            />

            <SelectForm
              control={form.control}
              items={RESOURCE_TYPE}
              name="type"
              label="Type of resource *"
              placeholder="Select a type"
            />

            <SubmitButton isPending={isPending}>Share</SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
