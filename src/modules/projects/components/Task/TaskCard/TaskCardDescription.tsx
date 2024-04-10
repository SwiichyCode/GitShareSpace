type Props = {
  description: string;
};

export const TaskCardDescription = ({ description }: Props) => {
  return <p className="text-sm">{description}</p>;
};
