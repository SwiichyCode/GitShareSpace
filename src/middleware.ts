import { withAuth } from "next-auth/middleware";
import { env } from "@/config/env";
import { getToken } from "next-auth/jwt";

export default withAuth({
  callbacks: {
    authorized: async ({ req }) => {
      const session = await getToken({
        req,
        secret: env.NEXTAUTH_SECRET,
        cookieName:
          env.NODE_ENV === "production"
            ? "__Secure-next-auth.session-token"
            : "next-auth.session-token",
      });

      if (!session) return false;

      return true;
    },
  },
  secret: env.NEXTAUTH_SECRET,
});

export const config = { matcher: ["/profile", "/settings", "/projects"] };
