type Props = {
  name: string;
  login: string;
};

export const AsideProfileUsername = ({ name, login }: Props) => {
  return (
    <div className="py-3">
      <h1 className="text-2xl font-bold">{name}</h1>
      <span className="text-xl font-light text-[#848D97]">{login}</span>
    </div>
  );
};
