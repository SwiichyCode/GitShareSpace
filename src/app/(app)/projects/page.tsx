import { AccessTokenAlert } from "@/modules/projects/components/AccessTokenAlert";
import { getUserRepositoriesAction } from "@/services/actions/get-user-repositories";

export default async function ProjectsPage() {
  const { data, serverError } = await getUserRepositoriesAction();

  return (
    <>
      {serverError && <AccessTokenAlert />}
      <div>
        {data?.map((repo) => (
          <div key={repo.id}>
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
