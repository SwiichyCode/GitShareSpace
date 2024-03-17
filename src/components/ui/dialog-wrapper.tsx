import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

type Props = {
  state?: boolean;
  triggerChildren: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export const DialogWrapper = ({
  state,
  triggerChildren,
  className,
  children,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerChildren}</DialogTrigger>
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
};
