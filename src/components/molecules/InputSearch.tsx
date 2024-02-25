"use client";
import { useTransition, useRef, useState } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { Spinner } from "@/components/atoms/spinner";
import { SearchIcon } from "@primer/octicons-react";
import { cn } from "@/lib/utils";

type Props = {
  placeholder?: string;
};

export const InputSearch = ({ placeholder }: Props) => {
  const [isLoading, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault("").withOptions({ startTransition }),
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebouncedCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;

      await setQuery(query);
    },
    300,
  );

  return (
    <div
      className={cn(
        "hover:bg-buttonHover flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-default bg-default bg-transparent px-3 py-2 text-sm ring-offset-[#21262D] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
        "lg:min-w-96 lg:cursor-default",
        isEditing && "ring-1 ring-slate-950",
      )}
    >
      <div className="flex w-full items-center space-x-2">
        <SearchIcon className="h-5 w-5 text-[#848D97]" />
        <input
          className={cn(
            "hidden h-8 w-full bg-transparent focus:border-0 focus:outline-none focus:ring-0",
            "lg:flex",
          )}
          placeholder={placeholder ? placeholder : "Type to search..."}
          onChange={handleSearch}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          defaultValue={query ?? ""}
          ref={inputRef}
        />
      </div>
      <div className="hidden h-5 w-10 items-center border-l border-[#30363D] lg:flex">
        {isLoading && <Spinner />}
      </div>
    </div>
  );
};
