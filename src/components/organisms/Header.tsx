import { Logo } from "@/components/atoms/logo";
import { AuthNavigation } from "@/components/molecules/AuthNavigation";

import { ShareButton } from "../molecules/ShareButton";

export const Header = () => {
  return (
    <header className="flex items-center justify-between bg-overlay px-6 py-4">
      <Logo />

      <div className="flex items-center space-x-4">
        <ShareButton />
        <AuthNavigation />
      </div>
    </header>
  );
};
