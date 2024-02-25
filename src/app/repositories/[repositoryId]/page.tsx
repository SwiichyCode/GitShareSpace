import { AddCommentForm } from "@/components/organisms/_forms/addcomment.form";
import repositoryService from "@/services/repository.service";
import React from "react";

export default async function RepositoryCommentPage({
  params,
}: {
  params: { repositoryId: number };
}) {
  const comments = await repositoryService.getCommentsByRepositoryId(
    Number(params.repositoryId),
  );

  return (
    <>
      <h1>Comments</h1>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
        </div>
      ))}
      <AddCommentForm repositoryId={Number(params.repositoryId)} />
    </>
  );
}
