import octokitService from "@/services/github.service";
import userService from "@/services/user.service";

type Props = {
  userId: string;
  username: string;
};

export const useFetchProfilePage = async ({ userId, username }: Props) => {
  const githubProfile = await userService.getGithubProfile({
    userId,
  });

  const githubProfileSocialAccounts =
    await octokitService.getUserSocialAccounts(username);

  const repositories = await octokitService.getUserRepository(username);
  const sharedScore = await userService.getSharedScoreByUserId({ userId });

  return {
    githubProfile,
    githubProfileSocialAccounts,
    repositories,
    sharedScore,
  };
};
