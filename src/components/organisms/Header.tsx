import { Logo } from "@/components/atoms/logo";
import { AuthNavigation } from "@/components/molecules/AuthNavigation";
import { ShareButton } from "@/components/molecules/ShareButton";
import { GithubLink } from "@/components/molecules/GithubLink";
import { InputSearch } from "@/components/molecules/InputSearch";
import { getServerAuthSession } from "@/server/auth";

export const Header = async () => {
  const session = await getServerAuthSession();

  return (
    <header className="flex items-center justify-between bg-overlay px-6 py-4">
      <Logo />

      <div className="flex flex-1 items-center justify-end space-x-4">
        <InputSearch />
        <div className="h-6 w-[1px] bg-[#30363D]" />
        <GithubLink />
        <ShareButton session={session} />
        <AuthNavigation session={session} />
      </div>
    </header>
  );
};
