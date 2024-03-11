import { env } from "@/config/env";
import { Octokit } from "octokit";
import type { GetResponseTypeFromEndpointMethod } from "@octokit/types";

export const octokit = new Octokit({
  auth: env.GITHUB_ACCESS_TOKEN,
});

export const createOctokitWithUserToken = (userAccessToken: string) => {
  return new Octokit({
    auth: userAccessToken,
  });
};

export type OctokitRepositoryResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.get
>;

export type OctokitUserResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.users.getByUsername
>;

export type OctokitSocialAccountsResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.users.listSocialAccountsForUser
>;
