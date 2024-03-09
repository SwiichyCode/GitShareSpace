import { formatDistanceToNow } from "date-fns";

export const calculateCommentCreatedRange = (createdAt: Date) => {
  return formatDistanceToNow(new Date(createdAt));
};
