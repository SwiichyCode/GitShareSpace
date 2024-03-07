"use client";
import { useQueryParams } from "@/hooks/useQueryParams";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";

export const SelectParams = () => {
  const { params, setParams: setParams } = useQueryParams({
    key: "params",
  });

  const handleChange = async (value: string) => {
    value === "all" ? await setParams("") : await setParams(value);
  };

  return (
    <Select
      defaultValue={params || "all"}
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Languages" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="latest">First added</SelectItem>
        <SelectItem value="starred">Most starred</SelectItem>
        <SelectItem value="liked">Most Liked</SelectItem>
      </SelectContent>
    </Select>
  );
};
