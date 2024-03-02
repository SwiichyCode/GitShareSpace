import { DirectionListTabs } from "@/components/molecules/DirectionListTabs";
import { SelectLanguages } from "@/components/molecules/SelectLanguages";
import type { Language } from "@prisma/client";

type Props = {
  languages: Language[];
};

export const RepositoriesFilter = ({ languages }: Props) => {
  return (
    <div className="flex space-x-4">
      <DirectionListTabs />
      <SelectLanguages languages={languages} />
    </div>
  );
};
