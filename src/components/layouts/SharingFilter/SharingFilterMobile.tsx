"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { RenderFilterContent } from "./RenderFilterContent";
import { FilterIcon } from "@primer/octicons-react";
import type { PathnameType } from "@/components/layouts/SharingFilter/_index";
import { useWindowSize } from "usehooks-ts";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

type Props = {
  pathname: PathnameType;
};

export const SharingFilterMobile = ({ pathname }: Props) => {
  const [open, setOpen] = useState(false);
  const { width = 0 } = useWindowSize({
    debounceDelay: 150,
  });

  useIsomorphicLayoutEffect(() => {
    if (width > 640) {
      setOpen(false);
    }
  }, [width]);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>
        <div className="fixed bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-card bg-background sm:hidden">
          <FilterIcon size={24} />
        </div>
      </DialogTrigger>
      <DialogContent className="w-3/4 rounded-md">
        <div className=" flex flex-col items-center gap-4">
          <RenderFilterContent pathname={pathname as PathnameType} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
