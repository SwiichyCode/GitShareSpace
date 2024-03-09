import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

type Props = {
  triggerChildren: React.ReactNode;
  children: React.ReactNode;
};

export const DialogWrapper = ({ triggerChildren, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerChildren}</DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
