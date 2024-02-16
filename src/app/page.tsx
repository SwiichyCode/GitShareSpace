// import OctokitService from "@/services/octokit.service";

import { LoginButton } from "@/components/molecules/LoginButton";
import { LogoutButton } from "@/components/molecules/LogoutButton";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  // const repo = await OctokitService.getRepo("SwiichyCode", "GitShareSpace");
  const session = await getServerAuthSession();

  return (
    <div>
      <LoginButton />
      <LogoutButton />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
