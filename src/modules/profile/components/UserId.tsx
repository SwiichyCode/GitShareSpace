import { withAdminRole } from "@/components/withAdminRole";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

const UserId = ({ session }: Props) => {
  return <div>{session?.user.id}</div>;
};

export const UserIdWithRole = withAdminRole(UserId);
