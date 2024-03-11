"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const LoginButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await signIn("github");
    !response && setLoading(true);
  };

  return (
    <form onSubmit={handleLogin}>
      <Button
        type="submit"
        className="hover:bg-success-hover space-x-2 bg-success"
      >
        <span>{loading ? "Loading..." : "Sign in"}</span>
      </Button>
    </form>
  );
};
