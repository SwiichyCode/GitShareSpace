"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusherClient";
import type { Comment } from "@/types/prisma.type";
import { CardComment } from "./CardMessage";

type Props = {
  initialComments: Comment[];
  repositoryId: number;
};

export const CommentMessages = ({ initialComments, repositoryId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    pusherClient.subscribe(`repo-${repositoryId}`);

    pusherClient.bind("new-comment", (data: Comment) => {
      setComments((prev) => [...prev, data]);
    });

    return () => {
      pusherClient.unsubscribe(`repo-${repositoryId}`);
    };
  }, [repositoryId]);

  return (
    <div className=" flex flex-col gap-8">
      {initialComments.map((comment) => (
        <CardComment key={comment.id} comment={comment} />
      ))}

      {comments.map((comment) => (
        <CardComment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
