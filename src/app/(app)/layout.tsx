import React, { type PropsWithChildren } from "react";
import { Header } from "@/components/organisms/Header/_index";
import { Sidebar } from "@/components/organisms/Sidebar/_index";
import { Toaster } from "@/components/atoms/toaster";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
      <Toaster />
    </>
  );
}
