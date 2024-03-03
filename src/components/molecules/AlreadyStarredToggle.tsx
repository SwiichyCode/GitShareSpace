"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/atoms/toggle-group";
import { StarIcon, HeartIcon } from "@primer/octicons-react";
import { useToggleFilter, type ToggleType } from "@/stores/useToggleFilter";
import { TOGGLE_FILTER } from "@/constants";

export const AlreadyStarredToggle = () => {
  const { setToggleFilter } = useToggleFilter();

  return (
    <ToggleGroup
      type="single"
      onValueChange={(value: ToggleType) => setToggleFilter(value)}
    >
      <ToggleGroupItem value={TOGGLE_FILTER.STARRED} className="rounded-md">
        <StarIcon className="h-4 w-4 text-default" />
      </ToggleGroupItem>
      <ToggleGroupItem value={TOGGLE_FILTER.LIKED} className="rounded-md">
        <HeartIcon className="h-4 w-4 text-default" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
