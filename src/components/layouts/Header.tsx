import { getServerAuthSession } from "@/config/server/auth";
import { Logo } from "@/components/layouts/Logo";
import { GithubLink } from "@/components/ui/github-link";
import { RepositoryInputSearch } from "@/modules/repositories/components/RepositoryInputSearch";
import { RepositoryShareBtn } from "@/modules/repositories/components/RepositoryShareBtn";
import { AuthNavigation } from "@/components/layouts/AuthNavigation";

import { URL } from "@/config/constants";
import type { PropsWithChildren } from "react";

export const HeaderLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="m-auto flex w-full max-w-[1920px] items-center justify-between border-b border-card bg-inset px-6 py-4">
      {children}
    </div>
  );
};

export const Header = async () => {
  const session = await getServerAuthSession();

  return (
    <HeaderLayout>
      <Logo />

      <div className="flex items-center justify-end space-x-4">
        <GithubLink url={URL.GITHUB} />
        <RepositoryInputSearch />
        <div className="hidden h-6 w-[1px] bg-[#30363D] lg:block" />
        <RepositoryShareBtn session={session} />
        <AuthNavigation session={session} />
      </div>
    </HeaderLayout>
  );
};
