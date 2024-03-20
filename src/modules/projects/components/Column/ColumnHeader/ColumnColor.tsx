import { generateColumnBorderColor } from "@/modules/projects/utils/generate-column-border-color";
import { generateColumnBackgroundColor } from "@/modules/projects/utils/generate-column-background-color";
import type { COLUMN_COLOR } from "@/config/constants";

type Props = {
  color: string;
};

export const ColumnColor = ({ color }: Props) => {
  return (
    <div
      className="h-4 w-4 rounded-full border-2 bg-opacity-45"
      style={{
        borderColor: generateColumnBorderColor(
          color as keyof typeof COLUMN_COLOR,
        ),
        backgroundColor: generateColumnBackgroundColor(
          color as keyof typeof COLUMN_COLOR,
        ),
      }}
    />
  );
};
