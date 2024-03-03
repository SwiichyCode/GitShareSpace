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

  const handleChange = async (value: string) => {
    if (value === "all") {
      await setLanguage("");
      return;
    }
    await setLanguage(value);
  };

  return (
    <Select
      defaultValue={language || "all"}
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Languages" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {languages.map((language) => (
          <SelectItem key={language.id} value={language.name}>
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
