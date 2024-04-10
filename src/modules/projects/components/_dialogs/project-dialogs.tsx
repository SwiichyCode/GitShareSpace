"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverKebabBtn } from "@/components/ui/popover-kebab-btn";
import { CloseProjectForm } from "../_forms/close-project-form";

type Props = {
  projectId: string;
};

export const ProjectDialogs = ({ projectId }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <PopoverKebabBtn />
      </PopoverTrigger>
      <PopoverContent align="start" className="">
        <CloseProjectForm projectId={projectId} setOpen={setOpen} />
      </PopoverContent>
    </Popover>
  );
};
