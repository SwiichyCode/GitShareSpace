"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { User, PlusIcon, Star } from "lucide-react";
import { URL } from "@/constants";
import { Separator } from "@/components/atoms/separator";
import { syncRepositories } from "@/actions/syncrepositories.action";

export const SidebarNavigation = () => {
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   await syncRepositories();
  // };

  return (
    <nav className="space-y-2">
      <Link
        href={URL.PROFILE}
        className="flex items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtleHover"
      >
        <User className="h-5 w-5 text-subtle" />
        <span className="text-sm">Your Profile</span>
      </Link>
      <Link
        href={URL.SHARE}
        className="flex items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtleHover"
      >
        <PlusIcon className="h-5 w-5 text-subtle" />
        <span className="text-sm">Share repository</span>
      </Link>
      <Separator />
      <Link
        href={URL.STARS}
        className="flex items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtleHover"
      >
        <Star className="h-5 w-5 text-subtle" />
        <span className="text-sm">Your stars</span>
      </Link>
      <Separator />
      {/* <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtleHover"
      >
        <button className="text-sm" type="submit">
          Sync repositories
        </button>
      </form> */}
      <div
        className="flex min-h-7 cursor-pointer items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtleHover"
        onClick={() => signOut()}
      >
        <span className="text-sm">Sign out</span>
      </div>
    </nav>
  );
};
