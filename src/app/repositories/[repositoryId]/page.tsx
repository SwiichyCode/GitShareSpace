import { CommentMessages } from "@/components/organisms/CommentMessages";
import { AddCommentForm } from "@/components/organisms/_forms/addcomment.form";
import repositoryService from "@/services/repository.service";
import React from "react";

export default async function RepositoryCommentPage({
  params,
}: {
  params: { repositoryId: number };
}) {
  const initialComments = await repositoryService.getCommentsByRepositoryId(
    Number(params.repositoryId),
  );

  return (
    <>
      <h1>Comments</h1>
      <CommentMessages
        initialComments={initialComments}
        repositoryId={params.repositoryId}
      />
      <AddCommentForm repositoryId={Number(params.repositoryId)} />
    </>
  );
}
