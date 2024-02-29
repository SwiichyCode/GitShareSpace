import Link from "next/link";
import { ProfileAvatar } from "@/components/molecules/Avatar";
import { CommentMessages } from "@/components/organisms/CommentMessages";
import { AddCommentForm } from "@/components/organisms/_forms/addcomment.form";
import repositoryService from "@/services/repository.service";
import { getServerAuthSession } from "@/server/auth";
import { getUser } from "@/actions/getUser";

export default async function RepositoryCommentPage({
  params,
}: {
  params: { repositoryId: number };
}) {
  const repositoryId = Number(params.repositoryId);
  const repository = await repositoryService.getRepository(repositoryId);
  const initialComments =
    await repositoryService.getCommentsByRepositoryId(repositoryId);
  const session = await getServerAuthSession();
  const user = session && (await getUser(session.user.id));

  if (!repository) {
    return <div>Repository not found</div>;
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center space-x-4">
        <ProfileAvatar
          pictureUrl={repository.ownerAvatarUrl}
          alt={repository.repositoryName}
        />
        <div className="flex flex-col">
          <Link
            href={repository.url}
            className="text-xl font-semibold hover:underline"
            target="_blank"
          >
            {repository?.repositoryName}
          </Link>
          <span className="text-sm">
            Published by{" "}
            {repository.createdBy.username ?? repository.createdBy.name}
          </span>
        </div>
      </div>

      <CommentMessages
        initialComments={initialComments}
        repositoryId={params.repositoryId}
      />
      {session && <AddCommentForm user={user} repositoryId={repositoryId} />}
    </div>
  );
}
