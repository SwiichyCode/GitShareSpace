"use client";
import { usePathname } from "next/navigation";
import { SharingFilterMobile } from "./SharingFilterMobile";
import { SharingFilterDesktop } from "./SharingFilterDesktop";
import type { URL } from "@/config/constants";

export type PathnameType = typeof URL.REPOSITORIES | typeof URL.RESOURCES;

export const SharingFilter = () => {
  const pathname = usePathname();

  return (
    <>
      <SharingFilterDesktop pathname={pathname as PathnameType} />
      <SharingFilterMobile pathname={pathname as PathnameType} />
    </>
  );
};
