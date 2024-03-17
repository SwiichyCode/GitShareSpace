"use client";
import { useQueryParams } from "@/modules/repositories/hooks/use-query-params";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PathnameType } from "@/components/layouts/SharingFilter/_index";

type Props = {
  pathname: PathnameType;
};

export const SelectParam = ({ pathname }: Props) => {
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
        <SelectItem value="all">{params ? "All" : "Select params"}</SelectItem>
        <SelectItem value="latest">First added</SelectItem>
        {pathname === "/repositories" && (
          <SelectItem value="starred">Most starred</SelectItem>
        )}
        <SelectItem value="liked">Most Liked</SelectItem>
      </SelectContent>
    </Select>
  );
};
