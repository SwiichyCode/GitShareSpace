import { getServerAuthSession } from "@/server/auth";
import { AddRepositoryForm } from "@/components/organisms/_forms/addrepository.form";
import { DataSharingAgreementForm } from "@/components/organisms/_forms/dataSharingAgreement.form";
import { RepositoryGrid } from "../organisms/RepositoryGrid";
import userService from "@/services/user.service";

export const Home = async () => {
  const session = await getServerAuthSession();
  const user = session && (await userService.getUser(session.user.id));

  return (
    <div className="p-8">
      <RepositoryGrid />

      <DataSharingAgreementForm user={user} />
      <AddRepositoryForm />
    </div>
  );
};
