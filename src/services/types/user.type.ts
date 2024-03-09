import type { User } from "next-auth";

type UserEntry = {
  userId: string;
};

type QueryType<T> = object & T;

export type GetUserType = QueryType<UserEntry>;
export type UpdateAgreementType = QueryType<{
  user: User;
  agreement: boolean;
}>;

export type { UserEntry };
