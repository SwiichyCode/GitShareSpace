import { env } from "@/env";
import { Octokit } from "octokit";

export const octokit = new Octokit({
  auth: env.GITHUB_ACCESS_TOKEN,
});
