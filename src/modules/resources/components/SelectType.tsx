import { useQueryParams } from "@/modules/repositories/hooks/use-query-params";
import { RESOURCE_TYPE } from "@/config/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectType = () => {
  const { params: type, setParams: setType } = useQueryParams({
    key: "type",
  });

  const handleChange = async (value: string) => {
    value === "all" ? await setType("") : await setType(value);
  };

  return (
    <Select defaultValue="all" onValueChange={(value) => handleChange(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{type ? "All" : "Select type"}</SelectItem>

        {RESOURCE_TYPE.map((type, index) => (
          <SelectItem key={index} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
