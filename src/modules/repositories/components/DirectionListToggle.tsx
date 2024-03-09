"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Rows2, Grid2X2 } from "lucide-react";
import {
  useListDirection,
  type DirectionType,
} from "@/modules/repositories/stores/useListDirection";
import { DIRECTION_LIST } from "@/config/constants";

export const DirectionListToggle = () => {
  const { direction, setDirection } = useListDirection();

  return (
    <ToggleGroup
      type="single"
      defaultValue={direction}
      onValueChange={(value: DirectionType) => setDirection(value)}
      defaultChecked
    >
      <ToggleGroupItem value={DIRECTION_LIST.GRID} className="rounded-md">
        <Grid2X2 className="text-default h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value={DIRECTION_LIST.COLUMN} className="rounded-md">
        <Rows2 className="text-default h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
