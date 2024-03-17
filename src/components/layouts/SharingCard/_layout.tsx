import { cn } from "@/lib/utils";
type Props = {
  className?: string;
  children: React.ReactNode;
};

export const SharingCardLayout = ({ className, children }: Props) => {
  return (
    <article
      className={cn(
        "flex w-full flex-col justify-between space-y-4 overflow-hidden rounded-md border border-card bg-[#0D1117] p-2 shadow",
        className,
      )}
    >
      {children}
    </article>
  );
};
