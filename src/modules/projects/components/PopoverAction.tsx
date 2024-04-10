"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverKebabBtn } from "@/components/ui/popover-kebab-btn";

type PopoverActionProps = {
  children: React.ReactNode;
};

type PopoverTitleProps = {
  title: string;
};

export const PopoverTitle = ({ title }: PopoverTitleProps) => {
  return <h3 className="mb-2 text-sm text-[#848d97]">{title}</h3>;
};

export const PopoverAction = ({ children }: PopoverActionProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <PopoverKebabBtn />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="max-w-48 rounded-md border border-card bg-overlay text-default"
      >
        {children}
      </PopoverContent>
    </Popover>
  );
};
