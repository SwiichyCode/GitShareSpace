"use client";
import { type PropsWithChildren, createContext, useContext } from "react";

interface QueryParamsContext {
  queryParams: string;
  languageParams?: string;
  typeParams?: string;
  params: string;
}

type QueryParamsProviderProps = PropsWithChildren<QueryParamsContext>;

const QueryParamsContext = createContext<QueryParamsContext | null>(null);

export const QueryParamsProvider = ({
  queryParams,
  languageParams,
  typeParams,
  params,
  children,
}: QueryParamsProviderProps) => {
  return (
    <QueryParamsContext.Provider
      value={{ queryParams, languageParams, typeParams, params }}
    >
      {children}
    </QueryParamsContext.Provider>
  );
};

export const useQueryParamsContext = () => {
  const context = useContext(QueryParamsContext);

  if (!context) {
    throw new Error(
      "useQueryParamsContext must be used within a QueryParamsProvider",
    );
  }

  return context;
};
