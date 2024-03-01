import { forwardRef, type PropsWithChildren } from "react";

type Props = {
  children: React.ReactNode;
};

export const RepositoryCardLayout = forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement | null>) => {
    return (
      <div
        ref={ref}
        className="flex w-full max-w-[450px] flex-col justify-between space-y-4 overflow-hidden rounded-md border border-card bg-default p-2 shadow md:max-w-none"
      >
        {props.children}
      </div>
    );
  },
);
