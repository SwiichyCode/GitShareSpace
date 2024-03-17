type Source =
  | "SHARE_CONTENT"
  | "LIKE_CONTENT"
  | "COMMENT_CONTENT"
  | "LIKE_POINTS";

export const generateSharedScore = (source: Source) => {
  switch (source) {
    case "SHARE_CONTENT":
      return 10;
    case "LIKE_CONTENT":
      return 5;
    case "COMMENT_CONTENT":
      return 15;
    case "LIKE_POINTS":
      return 1;
    default:
      return 0;
  }
};
