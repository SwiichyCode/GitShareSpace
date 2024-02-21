import type { Session } from "next-auth";

type Props = {
  session: Session | null;
  children: React.ReactNode;
};

export const AdminWrapper = ({ session, children }: Props) => {
  return <>{session?.user.role === "ADMIN" ? children : null}</>;
};
