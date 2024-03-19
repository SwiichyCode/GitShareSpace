import { getServerAuthSession } from "@/config/server/auth";
import { createSafeActionClient } from "next-safe-action";
import { DEFAULT_SERVER_ERROR } from "next-safe-action";
import userService from "@/services/user.service";
import type { Session } from "next-auth";

export const action = createSafeActionClient();

export class ActionError extends Error {}

export const adminAction = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR;
  },

  async middleware() {
    const session = await getServerAuthSession();
    if (session?.user.role !== "ADMIN")
      throw new ActionError("You are not a admin");

    return {
      userId: session.user.id,
    };
  },
});

export const userAction = createSafeActionClient<{
  session: Session;
}>({
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR;
  },

  async middleware() {
    const session = await getServerAuthSession();
    if (!session) throw new ActionError("Not logged in");

    return {
      session,
    };
  },
});

export const githubAction = createSafeActionClient<{
  session: Session;
  userAccessToken: string;
}>({
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR;
  },

  async middleware() {
    const session = await getServerAuthSession();
    if (!session) throw new ActionError("Not logged in");

    const userAccessToken = await userService.getPersonalAccessToken({
      userId: session.user.id,
    });

    if (!userAccessToken)
      throw new ActionError("User has no personal access token");

    return {
      session,
      userAccessToken,
    };
  },
});
