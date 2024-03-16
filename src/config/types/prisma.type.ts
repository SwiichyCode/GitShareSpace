import type { Prisma } from "@prisma/client";

export type Repository = Prisma.RepositoryGetPayload<{
  include: { createdBy: true; language: true; comments: true; topics: true };
}>;

export type Resource = Prisma.ResourceGetPayload<{
  include: { createdBy: true };
}>;

export type User = Prisma.UserGetPayload<{
  include: { likes: true };
}>;

export type Comment = Prisma.CommentGetPayload<{
  include: { createdBy: true };
}>;
