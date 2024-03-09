import { env } from "@/config/env";
import { Octokit } from "octokit";
import type { GetResponseTypeFromEndpointMethod } from "@octokit/types";

export const octokit = new Octokit({
  auth: env.GITHUB_ACCESS_TOKEN,
});

export type OctokitRepositoryResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.get
>;
