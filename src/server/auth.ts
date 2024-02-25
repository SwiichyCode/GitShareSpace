import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { env } from "@/env";
import { db } from "@/server/db";
import repositoryService from "@/services/repository.service";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      role: "USER" | "ADMIN" | "DEVELOPER";
      firstConnection: boolean;
      dataSharingAgreement: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
    role: "USER" | "ADMIN" | "DEVELOPER";
    firstConnection: boolean;
    dataSharingAgreement: boolean;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          username: user.username,
          role: user.role,
          firstConnection: user.firstConnection,
          dataSharingAgreement: user.dataSharingAgreement,
        },
      };
    },

    redirect({ baseUrl }) {
      return Promise.resolve(`${baseUrl}/repositories`);
    },

    async signIn({ user }) {
      if (user.id && !user.firstConnection && user.dataSharingAgreement) {
        await repositoryService.syncStarredRepositories(user);
      }

      return true;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};
/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
