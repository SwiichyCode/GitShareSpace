"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/atoms/form";
import { dataSharingAgreementSchema } from "./dataSharingAgreement.schema";
import { DataSharingContent } from "@/components/organisms/DataSharingContent";
import { Dialog, DialogContent } from "@/components/atoms/dialog";
import { SubmitButton } from "@/components/molecules/SubmitButton";
import { Checkbox } from "@/components/atoms/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/atoms/form";
import { updateAgreement } from "@/actions/updateagreement.action";
import type { User } from "@prisma/client";
import type { z } from "zod";

type Props = {
  user: User;
};

export const DataSharingAgreementForm = ({ user }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setOpen(user?.firstConnection);
  }, [user?.firstConnection]);

  const form = useForm<z.infer<typeof dataSharingAgreementSchema>>({
    resolver: zodResolver(dataSharingAgreementSchema),
    defaultValues: {
      agreement: false,
    },
  });

  function onSubmit(data: z.infer<typeof dataSharingAgreementSchema>) {
    startTransition(async () => {
      await updateAgreement(data);

      setOpen(false);
    });
  }

  return (
    <Dialog open={open}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DataSharingContent />
            <FormField
              control={form.control}
              name="agreement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-default p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={() => {
                        field.onChange(!field.value);
                        setChecked(!checked);
                      }}
                    />
                  </FormControl>
                  <FormLabel>
                    I agree to share my GitHub account data with the platform.
                  </FormLabel>
                </FormItem>
              )}
            />
            <div className=" space-x-4">
              <SubmitButton isPending={isPending} disabled={!checked}>
                Confirmation
              </SubmitButton>
              {!checked && (
                <SubmitButton variant={"destructive"}>Refuse</SubmitButton>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
