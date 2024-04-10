import { parseAsString } from "nuqs/server";

export type SearchParamsType = {
  searchParams?: {
    projectId: string;
    columnId: string;
  };
};

export const useQueryParserProjectPage = ({
  searchParams,
}: SearchParamsType) => {
  const queryParser = parseAsString.withDefault("");
  const projectId = queryParser.parseServerSide(searchParams?.projectId);
  const columnId = queryParser.parseServerSide(searchParams?.columnId);

  return { projectId, columnId };
};
