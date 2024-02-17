import { Button } from "@/components/atoms/button";

type Props = {
  isPending: boolean;
  children: React.ReactNode;
};

export const SubmitButton = ({ isPending, children }: Props) => {
  return (
    <Button type="submit" variant={"success"}>
      {isPending ? "Loading..." : children}
    </Button>
  );
};