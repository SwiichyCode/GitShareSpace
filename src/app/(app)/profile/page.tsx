import { getServerAuthSession } from "@/config/server/auth";
import { Aside } from "@/modules/profile/components/Aside";
import { useFetchProfilePage } from "@/modules/profile/hooks/use-fetch-profile-page";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  const { githubProfile, githubProfileSocialAccounts, sharedScore } =
    await useFetchProfilePage({
      userId: session?.user.id ?? "",
      username: session?.user.username ?? "",
    });

  if (!githubProfile) {
    return <div>User not found</div>;
  }

  return (
    <>
      <Aside
        githubProfile={githubProfile}
        githubProfileSocialAccounts={githubProfileSocialAccounts}
      />
      {sharedScore?.sharedScore}
    </>
  );
}
