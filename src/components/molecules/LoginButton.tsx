"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/atoms/button";

export const LoginButton = () => {
  return (
    <Button
      onClick={async () => await signIn("github")}
      className="space-x-2 bg-success hover:bg-successHover"
    >
      <span>Sign in</span>
    </Button>
  );
};
