"use client";
import { useTransition } from "react";
import { parseAsString, useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import type { Language } from "@prisma/client";

type Props = {
  languages: Language[];
};

export const SelectLanguages = ({ languages }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [language, setLanguage] = useQueryState(
    "language",
    parseAsString.withDefault("").withOptions({ startTransition }),
  );

  return (
    <Select
      defaultValue={language}
      onValueChange={async (value) => await setLanguage(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Languages" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.id} value={language.name}>
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
