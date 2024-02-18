import { type VariantProps } from "class-variance-authority";
import { Button } from "@/components/atoms/button";
import type { buttonVariants } from "@/components/atoms/button";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isPending?: boolean;
  asChild?: boolean;
}

export const SubmitButton = ({
  isPending,
  children,
  ...props
}: ButtonProps) => {
  return (
    <Button type="submit" variant={"success"} {...props}>
      {isPending ? "Loading..." : children}
    </Button>
  );
};
