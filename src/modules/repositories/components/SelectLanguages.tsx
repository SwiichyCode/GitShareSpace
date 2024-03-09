"use client";
import { useRepositoriesContext } from "@/modules/repositories/context/repositoriesContext";
import { useQueryParams } from "@/modules/repositories/hooks/use-query-params";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectLanguages = () => {
  const { languages } = useRepositoriesContext();
  const { params: language, setParams: setLanguage } = useQueryParams({
    key: "language",
  });

  const handleChange = async (value: string) => {
    value === "all" ? await setLanguage("") : await setLanguage(value);
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
