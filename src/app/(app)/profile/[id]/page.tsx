import { useFetchProfilePage } from "@/modules/profile/hooks/use-fetch-profile-page";
import { Aside } from "@/modules/profile/components/Aside";

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { username: string };
}) {
  const { githubProfile, githubProfileSocialAccounts } =
    await useFetchProfilePage({
      userId: params.id,
      username: searchParams.username,
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
    </>
  );
}
