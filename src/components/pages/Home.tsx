import octokitService from "@/services/octokit.service";
import { AddRepositoryForm } from "../organisms/_forms/addrepository.form";

export const Home = async () => {
  // const user = await octokitService.getRepository(
  //   "https://github.com/SwiichyCode/nextjs_ecommerce_template",
  // );

  // console.log(user);
  return (
    <div>
      <AddRepositoryForm />
    </div>
  );
};
