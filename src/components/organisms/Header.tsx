import { Logo } from "@/components/atoms/logo";
import { AuthNavigation } from "@/components/molecules/AuthNavigation";
import { ShareButton } from "@/components/molecules/ShareButton";
import { GithubLink } from "@/components/molecules/GithubLink";
import { getServerAuthSession } from "@/server/auth";

export const Header = async () => {
  const session = await getServerAuthSession();

  return (
    <header className="flex items-center justify-between bg-overlay px-6 py-4">
      <Logo />

      <div className="flex items-center space-x-4">
        <GithubLink />
        <ShareButton session={session} />
        <AuthNavigation session={session} />
      </div>
    </header>
  );
};
