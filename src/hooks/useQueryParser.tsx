import { ParamsType } from "@/types";
import { parseAsString } from "nuqs/server";

type Props = {
  searchParams?: {
    query?: string;
    language?: string;
    params?: ParamsType;
  };
};

export const useQueryParser = ({ searchParams }: Props) => {
  const queryParser = parseAsString.withDefault("");

  const queryParams = queryParser.parseServerSide(searchParams?.query);
  const languageParams = queryParser.parseServerSide(searchParams?.language);
  const params = queryParser.parseServerSide(searchParams?.params);

  return { queryParams, languageParams, params };
};
