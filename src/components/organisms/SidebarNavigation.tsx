"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { User, PlusIcon, Star } from "lucide-react";
import { URL } from "@/constants";
import { Separator } from "@/components/atoms/separator";

export const SidebarNavigation = () => {
  return (
    <nav className="space-y-2">
      <Link
        href={URL.PROFILE}
        className="hover:bg-subtleHover flex items-center space-x-2 rounded-md px-2 py-1 transition"
      >
        <User className="text-subtle h-5 w-5" />
        <span className="text-sm">Your Profile</span>
      </Link>
      <Link
        href={URL.SHARE}
        className="hover:bg-subtleHover flex items-center space-x-2 rounded-md px-2 py-1 transition"
      >
        <PlusIcon className="text-subtle h-5 w-5" />
        <span className="text-sm">Share repository</span>
      </Link>
      <Separator />
      <Link
        href={URL.STARS}
        className="hover:bg-subtleHover flex items-center space-x-2 rounded-md px-2 py-1 transition"
      >
        <Star className="text-subtle h-5 w-5" />
        <span className="text-sm">Your stars</span>
      </Link>
      <Separator />
      <div
        className="hover:bg-subtleHover flex min-h-7 cursor-pointer items-center space-x-2 rounded-md px-2 py-1 transition"
        onClick={() => signOut()}
      >
        <span className="text-sm">Sign out</span>
      </div>
    </nav>
  );
};
