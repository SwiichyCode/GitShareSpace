import Link from "next/link";
import { useFetchCommentsPage } from "@/hooks/useFetchCommentsPage";
import { ProfileAvatar } from "@/components/molecules/Avatar";
import { CommentList } from "@/components/organisms/Comment/CommentList";
import { AddCommentForm } from "@/components/organisms/_forms/addcomment.form";

export default async function RepositoryCommentPage({
  params,
}: {
  params: { repositoryId: number };
}) {
  const { repository, comments, session } = await useFetchCommentsPage(
    Number(params.repositoryId),
  );

  if (!repository) {
    return <div>Repository not found</div>;
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center space-x-4">
        <ProfileAvatar
          pictureUrl={repository.data?.ownerAvatarUrl}
          alt={repository.data?.repositoryName}
        />
        <div className="flex flex-col">
          <Link
            href={repository.data?.url ?? "/"}
            className="text-xl font-semibold hover:underline"
            target="_blank"
          >
            {repository.data?.repositoryName}
          </Link>
          <span className="text-sm">
            Published by{" "}
            {repository.data?.createdBy.username ??
              repository.data?.createdBy.name}
          </span>
        </div>
      </div>

      <CommentList comments={comments.data} />
      {session && <AddCommentForm repositoryId={Number(params.repositoryId)} />}
    </div>
  );
}
