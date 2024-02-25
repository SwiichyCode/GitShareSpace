"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusherClient";
import type { Comment } from "@/types/prisma.type";

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
  }, []);

  return (
    <div>
      {initialComments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
        </div>
      ))}

      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};
