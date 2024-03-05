import { forwardRef } from "react";

type Props = {
  isDisabled?: boolean;
};

const RepositoriesLoader = forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement | null>) => {
    const { isDisabled } = props;

    return (
      <div
        ref={ref}
        className="mt-6 flex flex-col items-center justify-center"
        style={{ visibility: !isDisabled ? "hidden" : "initial" }}
      >
        <p className="text-sm text-gray-400">Loading more repositories...</p>
      </div>
    );
  },
);

RepositoriesLoader.displayName = "RepositoriesLoader";

export { RepositoriesLoader };
