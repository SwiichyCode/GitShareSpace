"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/atoms/button";

export const LoginButton = () => {
  return (
    <Button
      onClick={async () => await signIn("github")}
      className="hover:bg-success-hover space-x-2 bg-success"
    >
      <span>Sign in</span>
    </Button>
  );
};
