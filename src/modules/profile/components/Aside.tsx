import { AsideLayout } from "./Aside/_layout";
import { AsideProfilePicture } from "./Aside/AsideProfilePicture";
import { AsideProfileUsername } from "./Aside/AsideProfileUsername";
import { AsideProfileBio } from "./Aside/AsideProfileBio";
import { AsideProfileInformations } from "./Aside/AsideProfileInformations";
import type { OctokitSocialAccountsResponse } from "@/services/types/octokit.type";
import type { GithubProfile } from "@prisma/client";

type Props = {
  githubProfile: GithubProfile;
  githubProfileSocialAccounts: OctokitSocialAccountsResponse;
};

export const Aside = ({
  githubProfile,
  githubProfileSocialAccounts,
}: Props) => {
  return (
    <AsideLayout>
      <AsideProfilePicture profilePicture={githubProfile.avatarUrl} />
      <AsideProfileUsername
        name={githubProfile.name ?? ""}
        login={githubProfile.username}
      />
      <AsideProfileBio bio={githubProfile.bio} />
      <AsideProfileInformations
        githubProfile={githubProfile}
        githubProfileSocialAccounts={githubProfileSocialAccounts}
      />
    </AsideLayout>
  );
};
