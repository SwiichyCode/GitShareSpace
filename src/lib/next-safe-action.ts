import { getServerAuthSession } from "@/server/auth";
import { createSafeActionClient } from "next-safe-action";
import type { Session } from "next-auth";

export const adminAction = createSafeActionClient({
  //@ts-expect-error - Return type is not correct
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }

    return {
      serverError: "Something went wrong",
    };
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

export const action = createSafeActionClient();

export class ActionError extends Error {}

export const userAction = createSafeActionClient<{
  session: Session;
}>({
  //@ts-expect-error - Return type is not correct
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }

    return {
      serverError: "Something went wrong",
    };
  },

  async middleware() {
    const session = await getServerAuthSession();
    if (!session) throw new ActionError("Not logged in");

    return {
      session,
    };
  },
});
