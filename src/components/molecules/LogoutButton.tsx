"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/atoms/button";

export const LogoutButton = () => {
  return <Button onClick={async () => await signOut()}>LogoutButton</Button>;
};
