"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusherClient";
import { CommentCard } from "@/components/organisms/Comment/CommentCard";
import type { Comment } from "@/types/prisma.type";

type Props = {
  initialComments: Comment[];
  repositoryId: number;
};

type CommentEvent = {
  picture: string | null | undefined;
  name: string | null | undefined;
  username: string | null | undefined;
  content: string;
};

export const CommentList = ({ initialComments, repositoryId }: Props) => {
  const [comments, setComments] = useState<CommentEvent[]>([]);

  useEffect(() => {
    pusherClient.subscribe(`repo-${repositoryId}`);

    pusherClient.bind("new-comment", (data: CommentEvent) => {
      setComments((prev) => [...prev, data]);
    });

    return () => {
      pusherClient.unsubscribe(`repo-${repositoryId}`);
    };
  }, [repositoryId]);

  return (
    <div className=" flex flex-col gap-8">
      {initialComments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}

      {comments.map((comment) => (
        <>
          <p>{comment.username}</p>
          <p>{comment.content}</p>
        </>
      ))}
    </div>
  );
};
