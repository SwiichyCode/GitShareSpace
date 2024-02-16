"use client";

import { Button } from "@/components/atoms/button";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
  return <Button onClick={async () => await signIn()}>LoginButton</Button>;
};
