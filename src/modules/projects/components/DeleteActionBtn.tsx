import { TrashIcon } from "@primer/octicons-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const DeleteActionBtn = ({ text, ...props }: Props) => {
  return (
    <button
      className="flex w-full items-center gap-2 rounded-sm p-2 text-destructive hover:bg-destructive/10"
      {...props}
    >
      <TrashIcon size={16} />
      <span className="text-sm">{text}</span>
    </button>
  );
};
