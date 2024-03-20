type Props = {
  description: string;
};

export const ColumnDescription = ({ description }: Props) => {
  return <p className=" text-sm text-[#848d97]">{description}</p>;
};
