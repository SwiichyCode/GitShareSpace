import { Logo } from "@/components/atoms/logo";
import { AuthNavigation } from "@/components/molecules/AuthNavigation";

export const Header = () => {
  return (
    <header className="bg-overlay flex items-center justify-between px-6 py-4">
      <Logo />
      <AuthNavigation />
    </header>
  );
};
