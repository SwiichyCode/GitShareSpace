type Props = {
  type: string;
};

export const ResourceCardType = ({ type }: Props) => {
  return <span className=" font-semibold uppercase">{type}</span>;
};
