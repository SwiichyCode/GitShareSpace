import { useFetchCommentsPage } from "@/modules/repositories/hooks/use-fetch-comment-page";
import { CommentHeader } from "@/modules/repositories/components/CommentHeader";
import { CommentList } from "@/modules/repositories/components/CommentList";
import { AddCommentForm } from "@/modules/repositories/components/_forms/add-comment-form";

export default async function RepositoryCommentPage({
  params,
}: {
  params: { repositoryId: number };
}) {
  const { repository, comments, session } = await useFetchCommentsPage({
    repositoryId: Number(params.repositoryId),
  });

  return (
    <div className="space-y-12">
      <CommentHeader repository={repository} />
      <CommentList comments={comments} />
      {session && <AddCommentForm repositoryId={Number(params.repositoryId)} />}
    </div>
  );
}
