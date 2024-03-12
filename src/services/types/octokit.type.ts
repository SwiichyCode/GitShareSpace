import type { Octokit } from "octokit";
import type { octokit } from "@/config/lib/octokit";
import type {
  OctokitResponse,
  Endpoints,
  GetResponseTypeFromEndpointMethod,
  GetResponseDataTypeFromEndpointMethod,
} from "@octokit/types";

export type OctokitSocialAccountsResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.users.listSocialAccountsForUser
>;

export type OctokitUserTypeResponse = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.users.getByUsername
>;

export interface ExtendedEndpoints extends Endpoints {
  "GET /user/{userId}": {
    parameters: Parameters<Octokit["rest"]["users"]["getByUsername"]>;
    response: OctokitResponse<OctokitUserTypeResponse>;
  };
}
