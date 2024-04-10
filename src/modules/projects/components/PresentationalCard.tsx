import { Button } from "@/components/ui/button";
import React from "react";

export const PresentationalCard = () => {
  return (
    <div className="relative space-y-4 rounded-md border border-card bg-gradient-to-r from-[#24192B] p-3">
      <h1 className=" text-2xl font-semibold">
        Welcome to the gitsharespace kanban
      </h1>
      <p className="w-3/5 text-sm">
        This is a kanban board that allows you to create, edit, and delete
        tasks. It also allows you to move tasks between columns. It is built
        with React, Tailwind CSS, and Zustand.
      </p>
      <Button className="bg-[#21262D] hover:bg-[#292E36]">Learn more</Button>
    </div>
  );
};
