import type { Prisma } from "@prisma/client";

export type Repository = Prisma.RepositoryGetPayload<{
  include: { createdBy: true; language: true };
}>;

export type User = Prisma.UserGetPayload<{
  include: { likes: true };
}>;
