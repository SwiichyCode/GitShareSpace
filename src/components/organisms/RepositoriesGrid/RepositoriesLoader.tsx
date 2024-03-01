import { forwardRef } from "react";

type Props = {
  isDisable: boolean;
};

const RepositoriesLoader = forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement | null>) => {
    const { isDisable } = props;

    return isDisable ? null : (
      <div ref={ref} className="mt-6 flex flex-col items-center justify-center">
        <p className="text-sm text-gray-400">Loading more repositories...</p>
      </div>
    );
  },
);

RepositoriesLoader.displayName = "RepositoriesLoader";

export { RepositoriesLoader };
