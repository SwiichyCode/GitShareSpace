import { Logo } from "@/components/atoms/logo";
import { AuthNavigation } from "@/components/molecules/AuthNavigation";
import { ShareButton } from "@/components/molecules/ShareButton";
import { GithubLink } from "@/components/molecules/GithubLink";
import { InputSearch } from "@/components/molecules/InputSearch";
import { getServerAuthSession } from "@/server/auth";
import { cn } from "@/lib/utils";

export const Header = async () => {
  const session = await getServerAuthSession();

  return (
    <header
      className={cn(
        "flex items-center justify-between border-b border-default bg-inset px-6 py-4",
      )}
    >
      <Logo />

      <div className="flex items-center justify-end space-x-4">
        <GithubLink />
        <InputSearch />
        <div className="hidden h-6 w-[1px] bg-[#30363D] lg:block" />
        <ShareButton session={session} />
        <AuthNavigation session={session} />
      </div>
    </header>
  );
};
