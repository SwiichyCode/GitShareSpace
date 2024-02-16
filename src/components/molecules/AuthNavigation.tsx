import { LoginButton } from "./LoginButton";
import { getServerAuthSession } from "@/server/auth";
import { LogoutButton } from "./LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";

export const AuthNavigation = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="flex items-center space-x-2">
      {!session && <LoginButton />} {session && <LogoutButton />}
      <Avatar className="cursor-pointer">
        <AvatarImage
          src={session?.user.image ?? ""}
          alt={session?.user.name ?? ""}
        />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    </div>
  );
};
