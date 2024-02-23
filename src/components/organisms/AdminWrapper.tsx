import type { User } from "next-auth";

type Props = {
  user: User | null;
  children: React.ReactNode;
};

export const AdminWrapper = ({ user, children }: Props) => {
  return <>{user?.role === "ADMIN" ? children : null}</>;
};
