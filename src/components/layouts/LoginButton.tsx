"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const LoginButton = () => {
  return (
    <Button
      onClick={async () => await signIn("github")}
      className="hover:bg-success-hover bg-success space-x-2"
    >
      <span>Sign in</span>
    </Button>
  );
};
