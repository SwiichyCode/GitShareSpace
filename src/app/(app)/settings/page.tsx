import { getServerAuthSession } from "@/config/server/auth";
import { AddPersonalAccessTokenForm } from "@/modules/settings/components/_forms/add-personnal-access-token-form";
import userService from "@/services/user.service";

export default async function SettingsPage() {
  const session = await getServerAuthSession();
  const user = await userService.getUser({ userId: session!.user.id });

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <>
      <AddPersonalAccessTokenForm
        personalAccessToken={user.personalAccessToken}
      />
    </>
  );
}
