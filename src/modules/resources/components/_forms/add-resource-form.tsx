"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useShareResourceModal } from "@/modules/resources/stores/useShareResourcesModal";
import { formAddResourceSchema } from "./add-resource-schema";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InputForm } from "@/components/ui/input-form";
import { RichTextFieldForm } from "@/components/ui/rich-textfield-form";
import { SelectForm } from "@/components/ui/select-form";
import { SubmitButton } from "@/components/ui/submit-button";
import type * as z from "zod";
import { TextAreaForm } from "@/components/ui/text-area-form";

export const AddResourceForm = () => {
  const [isPending, startTransition] = useTransition();
  const { open, setOpen } = useShareResourceModal();

  const form = useForm<z.infer<typeof formAddResourceSchema>>({
    resolver: zodResolver(formAddResourceSchema),
    defaultValues: {
      url: "",
      description: "",
      type: "article",
    },
  });

  function onSubmit(data: z.infer<typeof formAddResourceSchema>) {
    startTransition(async () => {
      console.log(data);
    });

    form.reset();
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
              items={["article", "video", "podcast", "book"]}
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
