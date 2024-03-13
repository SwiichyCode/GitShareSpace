"use client";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import { Form } from "@/components/ui/form";
import { dataSharingAgreementSchema } from "./data-sharing-agreement-schema";
import { DataSharingContent } from "@/modules/repositories/components/DataSharingContent";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SubmitButton } from "@/components/ui/submit-button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { updateAgreementAction } from "@/services/actions/upgrade-agreement";
import { useRepositoriesContext } from "@/modules/repositories/context/repositoriesContext";
import { Button } from "@/components/ui/button";

import type * as z from "zod";
import { usePersonalAccessTokenModal } from "../../stores/usePersonalAccessTokenModal";

export const DataSharingAgreementForm = () => {
  const { user } = useRepositoriesContext();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  const [checked, setChecked] = useState(false);
  const { setOpen: setOpenPersonalAccessTokenModal } =
    usePersonalAccessTokenModal();

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
      await updateAgreementAction(data);

      setOpen(false);
      setOpenPersonalAccessTokenModal(true);
    });
  }

  if (!user) return null;

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
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border border-card p-4 shadow">
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
            <div className="space-x-4">
              <SubmitButton isPending={isPending} disabled={!checked}>
                Confirmation
              </SubmitButton>
              {!checked && (
                <Button variant={"destructive"} onClick={() => signOut()}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
