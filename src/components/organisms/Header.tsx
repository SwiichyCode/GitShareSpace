import { Logo } from "@/components/atoms/logo";
import { AuthNavigation } from "@/components/molecules/AuthNavigation";

export const Header = () => {
  return (
    <header className="flex items-center justify-between bg-overlay px-6 py-4">
      <Logo />
      <AuthNavigation />
    </header>
  );
};
