import { RenderFilterContent } from "./RenderFilterContent";
import type { PathnameType } from "@/components/layouts/SharingFilter/_index";

type Props = {
  pathname: PathnameType;
};

export const SharingFilterDesktop = ({ pathname }: Props) => {
  return (
    <div className="z-30 hidden space-x-4 rounded-md border border-card bg-background p-4 sm:sticky sm:top-6 sm:flex">
      <RenderFilterContent pathname={pathname as PathnameType} />
    </div>
  );
};
