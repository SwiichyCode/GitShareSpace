"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  return <Button onClick={async () => await signOut()}>LogoutButton</Button>;
};
