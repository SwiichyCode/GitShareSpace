import React, { type ButtonHTMLAttributes } from "react";

interface SidebarNavigationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const SidebarNavigationButton = ({
  children,
  ...props
}: SidebarNavigationButtonProps) => {
  return (
    <button
      className="flex w-full cursor-pointer items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtle-hover"
      {...props}
    >
      {children}
    </button>
  );
};
