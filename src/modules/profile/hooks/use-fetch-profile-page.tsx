import octokitService from "@/services/github.service";
import userService from "@/services/user.service";
import type { OctokitSocialAccountsResponse } from "@/config/lib/octokit";

type Props = {
  userId: string;
  username: string;
};

export const useFetchProfilePage = async ({ userId, username }: Props) => {
  const githubProfile = await userService.getUser({
    userId,
  });
  const githubProfileSocialAccounts =
    (await octokitService.getUserSocialAccounts(
      username,
    )) as OctokitSocialAccountsResponse;

  const repositories = await octokitService.getUserRepository(username);

  return { githubProfile, githubProfileSocialAccounts, repositories };
};
