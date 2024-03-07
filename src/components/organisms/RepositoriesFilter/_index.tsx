import { DirectionListToggle } from "@/components/molecules/DirectionListToggle";
import { AlreadyStarredToggle } from "@/components/molecules/AlreadyStarredToggle";
import { SelectLanguages } from "@/components/molecules/SelectLanguages";
import type { Language } from "@prisma/client";

type Props = {
  languages: Language[];
};

export const RepositoriesFilter = ({ languages }: Props) => {
  return (
    <div className="flex space-x-4">
      <DirectionListToggle />
      {/* <AlreadyStarredToggle /> */}
      <SelectLanguages languages={languages} />
    </div>
  );
};
