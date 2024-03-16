import { forwardRef } from "react";

type Props = {
  text: string;
  isDisabled?: boolean;
  isLoading?: boolean;
};

const InfinitelistObserver = forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement | null>) => {
    const { text, isDisabled, isLoading } = props;

    return (
      <div
        ref={ref}
        className="mt-6 flex flex-col items-center justify-center"
        style={{ visibility: !isDisabled && !isLoading ? "hidden" : "initial" }}
      >
        <p className="text-sm text-gray-400">{text}</p>
      </div>
    );
  },
);

InfinitelistObserver.displayName = "InfinitelistObserver";

export { InfinitelistObserver };
