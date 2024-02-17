import { getServerAuthSession } from "@/server/auth";
import { AddRepositoryForm } from "../organisms/_forms/addrepository.form";
import { RepositoryGrid } from "../organisms/RepositoryGrid";
import octokitService from "@/services/octokit.service";
import { extractUserIdFromAvatarUrl } from "@/lib/utils";

export const Home = async () => {
  const session = await getServerAuthSession();
  // const user = await octokitService.getUser(
  //   extractUserIdFromAvatarUrl(session?.user.image!),
  // );
  // const stared =
  //   await octokitService.getStaredRepositoriesByUser("SwiichyCode");
  // console.log(stared);

  return (
    <div className=" p-8">
      <RepositoryGrid />
      <AddRepositoryForm />
    </div>
  );
};
