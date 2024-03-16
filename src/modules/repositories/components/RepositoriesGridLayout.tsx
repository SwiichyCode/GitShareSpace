import { cn } from "@/lib/utils";
import { useListDirection } from "@/modules/repositories/stores/useListDirection";
import type { PropsWithChildren } from "react";

export const RepositoriesGridLayout = ({ children }: PropsWithChildren) => {
  const { direction } = useListDirection();

  const gridDirectionClass =
    "grid grid-cols-1 place-items-center gap-4 md:w-full md:grid-cols-2 md:place-items-stretch xl:grid-cols-3 2xl:grid-cols-4";
  const columnDirectionClass = "flex flex-col max-w-xl gap-8";

  return (
    <section
      className={cn(
        direction === "grid" ? gridDirectionClass : columnDirectionClass,
      )}
    >
      {children}
    </section>
  );
};
