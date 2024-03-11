export const URL = {
  HOME: "/",
  REPOSITORIES: "/repositories",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  LINKEDIN: "https://www.linkedin.com/in/swapnil-singh-1a1b3b1b3/",
  GITHUB: "https://github.com/SwiichyCode/GitShareSpace",
  TWITTER: "https://twitter.com/SwiichyCode_",
};

export const ERROR_MESSAGE = {
  USER_NOT_FOUND: "User not found",
  REPOSITORY_NOT_EXIST: "Repository does not exist",
  REPOSITORY_ALREADY_EXIST: "Repository already exists",
  REPOSITORY_CREATE_FAILED: "Repository create failed",
  GITHUB_INVALID_URL: "Invalid Github URL",
  GITHUB_USER_NOT_FOUND: "Github user not found",
  GITHUB_STARRED_REPOSITORIES_NOT_FOUND: "Starred repositories not found",
};

export const OCTOKIT_ENDPOINT = {
  GET_USER: "GET /users/{username}",
  GET_USER_BY_ID: "GET /user/{userId}",
  GET_REPOSITORY: "GET /repos/{owner}/{repo}",
  GET_REPOSITORY_BY_ID: "GET /repositories/{id}",
  GET_STARRED_REPOSITORIES: "GET /users/{username}/starred",
  GET_USER_REPOSITORIES: "GET /users/{userId}/repos",
  PUT_STAR_REPOSITORY: "PUT /user/starred/{owner}/{repo}",
  DELETE_STAR_REPOSITORY: "DELETE /user/starred/{owner}/{repo}",
  GET_USER_SOCIAL_ACCOUNTS: "GET /users/{username}/social_accounts",
};

export const DIRECTION_LIST = {
  COLUMN: "column",
  GRID: "grid",
};

export const TOGGLE_FILTER = {
  STARRED: "starred",
  LIKED: "liked",
  ALL: "all",
};
