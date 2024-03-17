"use client";
import { URL } from "@/config/constants";
import { DirectionListToggle } from "@/modules/repositories/components/DirectionListToggle";
import { SelectLanguage } from "@/modules/repositories/components/SelectLanguage";
import { SelectParam } from "@/components/filtering/SelectParam";
import { usePathname } from "next/navigation";
import { SelectType } from "@/modules/resources/components/SelectType";

export type PathnameType = typeof URL.REPOSITORIES | typeof URL.RESOURCES;

export const SharingFilter = () => {
  const pathname = usePathname();

  const handleFilterContent = (pathname: PathnameType) => {
    switch (pathname) {
      case URL.REPOSITORIES:
        return (
          <>
            <DirectionListToggle />
            <SelectLanguage />
            <SelectParam pathname={pathname} />
          </>
        );

      case URL.RESOURCES:
        return (
          <>
            <SelectType />
            <SelectParam pathname={pathname} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sticky top-6 z-50 flex space-x-4 rounded-md border border-card bg-background p-4">
      {handleFilterContent(pathname as PathnameType)}
    </div>
  );
};
