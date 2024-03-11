import type { User } from "next-auth";

type UserEntry = {
  userId: string;
};

type QueryType<T> = {
  userId: string;
} & T;

type GetUserType = QueryType<object>;

type AddStarredRepositoryType = QueryType<{
  repositoryId: number;
}>;

type AddPersonalAccessTokenType = QueryType<{
  personalAccessToken: string;
}>;

type ResetPersonalAccessTokenType = QueryType<object>;

type UpdateAgreementType = {
  user: User;
  agreement: boolean;
};

export type {
  GetUserType,
  AddStarredRepositoryType,
  AddPersonalAccessTokenType,
  ResetPersonalAccessTokenType,
  UpdateAgreementType,
  UserEntry,
};
