import { getServerAuthSession } from "@/server/auth";
import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient();

export class ActionError extends Error {}

export const userAction = createSafeActionClient<{
  userId: string | undefined;
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

    const userId = session.user.id;

    return {
      userId,
    };
  },
});
