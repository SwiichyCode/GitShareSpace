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

export const SelectLanguage = () => {
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
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          {language ? "All" : "Select language"}
        </SelectItem>
        {languages.map((language) => (
          <SelectItem key={language.id} value={language.name}>
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
