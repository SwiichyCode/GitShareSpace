import React from "react";

type Props = {
  bio: string | null;
};

export const AsideProfileBio = ({ bio }: Props) => {
  return <p>{bio}</p>;
};
