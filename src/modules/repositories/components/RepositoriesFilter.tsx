import { DirectionListToggle } from "@/modules/repositories/components/DirectionListToggle";
import { SelectLanguages } from "@/modules/repositories/components/SelectLanguages";
import { SelectParams } from "@/modules/repositories/components/SelectParams";

export const RepositoriesFilter = () => {
  return (
    <div className="flex space-x-4">
      <DirectionListToggle />
      <SelectLanguages />
      <SelectParams />
    </div>
  );
};
