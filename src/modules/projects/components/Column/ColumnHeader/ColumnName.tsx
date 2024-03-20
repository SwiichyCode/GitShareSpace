import React from "react";

type Props = {
  name: string;
};

export const ColumnName = ({ name }: Props) => {
  return <h1 className="text-base font-bold">{name}</h1>;
};
