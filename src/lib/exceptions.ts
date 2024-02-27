import type { Prisma } from "@prisma/client";

const ERROR_MESSAGES: Record<string, string> = {
  P2002: "Repository already exists",
  // ... other error messages
};

export class PrismaError extends Error {
  constructor(error: Prisma.PrismaClientKnownRequestError) {
    super();

    this.name = "PrismaError";
    this.message = ERROR_MESSAGES[error.code] ?? "An unknown error occurred";
  }
}
