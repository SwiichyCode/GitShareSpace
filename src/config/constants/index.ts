export const URL = {
  HOME: "/",
  REPOSITORIES: "/repositories",
  PROFILE: "/profile",
  STARS: "/stars",
  LINKEDIN: "https://www.linkedin.com/in/swapnil-singh-1a1b3b1b3/",
  GITHUB: "https://www.linkedin.com/in/dylan-jansana-65b912269/",
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
  GET_USER: "GET /user/{userId}",
  GET_REPOSITORY: "GET /repos/{owner}/{repo}",
  GET_REPOSITORY_BY_ID: "GET /repositories/{id}",
  GET_STARRED_REPOSITORIES: "GET /users/{username}/starred",
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
