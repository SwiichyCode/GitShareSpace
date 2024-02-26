import type { User } from "@/types/prisma.type";

export const withAdminRole = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  const WithAdminRole = ({
    role,
    ...props
  }: P & { role: User["role"] | undefined }) => {
    return role === "ADMIN" ? <Component {...(props as P)} /> : null;
  };

  WithAdminRole.displayName = `WithAdminRole(${Component.displayName ?? Component.name ?? "Component"})`;

  return WithAdminRole;
};
