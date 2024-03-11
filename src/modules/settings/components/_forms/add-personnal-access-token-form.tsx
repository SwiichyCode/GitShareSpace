"use client";
import Link from "next/link";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addPersonalAccessTokenSchema } from "./add-personnal-access-token-schema";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/ui/input-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import { addPersonalAccessTokenAction } from "@/services/actions/add-personal-access-token";
import { resetPersonalAccessTokenAction } from "@/services/actions/reset-personal-access-token";
import type * as z from "zod";

type Props = {
  personalAccessToken: string | null;
};

export const AddPersonalAccessTokenForm = ({ personalAccessToken }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof addPersonalAccessTokenSchema>>({
    defaultValues: personalAccessToken ? { personalAccessToken } : undefined,
    resolver: zodResolver(addPersonalAccessTokenSchema),
  });

  function onSubmit(data: z.infer<typeof addPersonalAccessTokenSchema>) {
    startTransition(async () => {
      await addPersonalAccessTokenAction({
        personalAccessToken: data.personalAccessToken,
      });
    });
  }

  function resetPersonalAccessToken() {
    startTransition(async () => {
      await resetPersonalAccessTokenAction({});
    });

    form.reset({ personalAccessToken: "" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputForm
          label="Personal Access Token"
          name="personalAccessToken"
          control={form.control}
          type="password"
          readOnly={!!personalAccessToken}
          description={
            <p className="space-y-4">
              {!personalAccessToken
                ? "This token will be used to authenticate with the API. It will be stored securely and will not be visible to anyone."
                : "Your personal access token has been saved. You can reset it at any time."}

              <br />
              {!personalAccessToken && (
                <Link
                  className="block text-blue underline"
                  href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
                  target="_blank"
                >
                  Learn how to create a personal access token
                </Link>
              )}
            </p>
          }
        />
        {!personalAccessToken ? (
          <SubmitButton isPending={isPending}>Submit</SubmitButton>
        ) : (
          <Button
            type="button"
            variant={"destructive"}
            onClick={resetPersonalAccessToken}
          >
            Reset your personal access token
          </Button>
        )}
      </form>
    </Form>
  );
};
