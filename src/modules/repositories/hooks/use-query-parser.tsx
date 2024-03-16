import { parseAsString } from "nuqs/server";

type Props = {
  searchParams?: {
    query?: string;
    language?: string;
    type?: string;
    params?: string;
  };
};

export const useQueryParser = ({ searchParams }: Props) => {
  const queryParser = parseAsString.withDefault("");

  const queryParams = queryParser.parseServerSide(searchParams?.query);
  const languageParams = queryParser.parseServerSide(searchParams?.language);
  const typeParams = queryParser.parseServerSide(searchParams?.type);
  const params = queryParser.parseServerSide(searchParams?.params);

  return { queryParams, languageParams, typeParams, params };
};
