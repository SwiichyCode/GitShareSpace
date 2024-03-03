import { useTransition } from "react";
import { parseAsString, useQueryState } from "nuqs";

type Props = {
  key: string;
};

export const useQueryParams = ({ key }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [params, setParams] = useQueryState(
    key,
    parseAsString.withDefault("").withOptions({ startTransition }),
  );

  return { isPending, params, setParams };
};
