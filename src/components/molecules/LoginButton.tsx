"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/atoms/button";
import { Github } from "lucide-react";

export const LoginButton = () => {
  return (
    <Button
      onClick={async () => await signIn()}
      className="bg-success hover:bg-successHover space-x-2"
    >
      <Github width={18} />
      <span>Sign in</span>
    </Button>
  );
};
