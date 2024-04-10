import { parseAsString, useQueryStates } from "nuqs";

export const useProjectParams = () => {
  const [params, setParams] = useQueryStates({
    columnId: parseAsString.withDefault(""),
    projectId: parseAsString.withDefault(""),
  });

  return { params, setParams };
};
