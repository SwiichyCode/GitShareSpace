export const URL = {
  HOME: "/",
  REPOSITORIES: "/repositories",
  RESOURCES: "/resources",
  PROJECTS: "/projects",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  LINKEDIN: "https://www.linkedin.com/in/swapnil-singh-1a1b3b1b3/",
  GITHUB: "https://github.com/SwiichyCode/GitShareSpace",
  TWITTER: "https://twitter.com/SwiichyCode_",
} as const;

export const AUTH_PROVIDER = {
  GITHUB: "github",
};

export const ERROR_MESSAGE = {
  USER_NOT_FOUND: "User not found",
  REPOSITORY_NOT_EXIST: "Repository does not exist",
  REPOSITORY_ALREADY_EXIST: "Repository already exists",
  REPOSITORY_CREATE_FAILED: "Repository create failed",
  GITHUB_INVALID_URL: "Invalid Github URL",
  GITHUB_REPOSITORY_NOT_EXIST: "Github repository does not exist",
  GITHUB_USER_NOT_FOUND: "Github user not found",
  GITHUB_STARRED_REPOSITORIES_NOT_FOUND: "Starred repositories not found",
  PROVIDER_ACCOUNT_ID_NOT_FOUND: "Provider account ID not found",
};

export const OCTOKIT_ENDPOINT = {
  GET_USER_BY_AUTH: "GET /user",
  GET_USER_BY_USERNAME: "GET /users/{username}",
  GET_USER_BY_ID: "GET /user/{userId}",
  GET_REPOSITORY: "GET /repos/{owner}/{repo}",
  GET_REPOSITORY_BY_ID: "GET /repositories/{id}",
  GET_STARRED_REPOSITORIES: "GET /users/{username}/starred",
  GET_USER_REPOSITORIES: "GET /users/{userId}/repos",
  PUT_STAR_REPOSITORY: "PUT /user/starred/{owner}/{repo}",
  DELETE_STAR_REPOSITORY: "DELETE /user/starred/{owner}/{repo}",
  GET_USER_SOCIAL_ACCOUNTS: "GET /users/{username}/social_accounts",
} as const;

export const DIRECTION_LIST = {
  COLUMN: "column",
  GRID: "grid",
};

export const TOGGLE_FILTER = {
  STARRED: "starred",
  LIKED: "liked",
  ALL: "all",
};

export const RESOURCE_TYPE = ["article", "video", "book", "podcast"];

export const SHARE_ACTION = {
  SHARE: "SHARE_CONTENT",
  LIKE: "LIKE_CONTENT",
  COMMENT: "COMMENT_CONTENT",
  POINT: "LIKE_POINTS",
} as const;

export const DEFAULT_COLUMN_NAME = {
  TO_DO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
} as const;

export const DEFAULT_COLUMN_DESCRIPTION = {
  TO_DO: "This item hasn't been started",
  IN_PROGRESS: "This is actively being worked on",
  DONE: "This has been completed",
} as const;

export const COLUMN_COLOR = {
  GRAY: "GRAY",
  BLUE: "BLUE",
  GREEN: "GREEN",
  YELLOW: "YELLOW",
  ORANGE: "ORANGE",
  RED: "RED",
  PINK: "PINK",
  PURPLE: "PURPLE",
} as const;
