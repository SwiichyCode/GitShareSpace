import type { User } from "@/types/prisma.type";

type Props = {
  role: User["role"] | undefined;
  children: React.ReactNode;
};

export const AdminWrapper = ({ role, children }: Props) => {
  return <>{role === "ADMIN" ? children : null}</>;
};
