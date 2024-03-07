import { getRepository } from "@/services/actions/repository.service";

export default async function SocketIOPage() {
  const repository = await getRepository({ repositoryId: 1 });
  console.log(repository);

  return <div>test</div>;
}
