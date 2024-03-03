import { Logo } from "@/components/atoms/logo";
import { HeaderLayout } from "@/components/organisms/Header/HeaderLayout";
import { AuthNavigation } from "@/components/molecules/AuthNavigation";
import { ShareButton } from "@/components/molecules/ShareButton";
import { GithubLink } from "@/components/molecules/GithubLink";
import { InputSearch } from "@/components/molecules/InputSearch";
import { getServerAuthSession } from "@/server/auth";

export const Header = async () => {
  const session = await getServerAuthSession();

  return (
    <HeaderLayout>
      <Logo />

      <div className="flex items-center justify-end space-x-4">
        <GithubLink />
        <InputSearch />
        <div className="hidden h-6 w-[1px] bg-[#30363D] lg:block" />
        <ShareButton session={session} />
        <AuthNavigation session={session} />
      </div>
    </HeaderLayout>
  );
};
