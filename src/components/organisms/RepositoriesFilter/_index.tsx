import { DirectionListToggle } from "@/components/molecules/DirectionListToggle";
import { SelectLanguages } from "@/components/molecules/SelectLanguages";
import { SelectParams } from "@/components/molecules/SelectParams";

export const RepositoriesFilter = () => {
  return (
    <div className="flex space-x-4">
      <DirectionListToggle />
      <SelectLanguages />
      <SelectParams />
    </div>
  );
};
