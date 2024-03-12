import { env } from "@/config/env";
import { Octokit } from "octokit";

export const octokit = new Octokit({
  auth: env.GITHUB_ACCESS_TOKEN,
});

export const createOctokitWithUserToken = (userAccessToken: string) => {
  return new Octokit({
    auth: userAccessToken,
  });
};
