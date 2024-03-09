import { Header } from "@/components/layouts/Header";
import { Sidebar } from "@/components/layouts/Sidebar/_index";
import { Toaster } from "@/components/ui/toaster";
import type { PropsWithChildren } from "react";

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
